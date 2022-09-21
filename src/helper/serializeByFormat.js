const ENO = require("enolib")
const ENOtype = require("enotype")
const HJSON = require("hjson")
const INI = require("ini")
const HOCON = require("hocon-parser") //require("@pushcorn/hocon-parser")
const JSON5 = require("json5")
const PROPERTIES = require("dot-properties")
const TOML = require("@iarna/toml")
const { XMLParser } = require("fast-xml-parser")
const YAML = require("js-yaml")
const deepReplace = require("deep-replace-in-object")

exports.parseByFormat = (text, format) => {
    const parsers = {
        eno: () => {
            ENO.register(ENOtype)
            let enoParsed = ENO.parse(text)
            const isFieldSetMissing = (section) => {
                return /\[object MissingFieldset key=.*\]/.test(section.toString())
            }
            const isSectionMissing = (section) => {
                return /\[object MissingSection key=.*\]/.test(section.toString())
            }
            const parsePerson = (enoObj) => {
                const name = enoObj.field("name").optionalStringValue()
                const age = enoObj.field("age").optionalIntegerValue()
                const sex = enoObj.field("sex").optionalStringValue()
                const height = enoObj.field("height").optionalFloatValue()
                const skin = enoObj.field("skin").optionalStringValue()
                const hair = enoObj.field("hair").optionalStringValue()
                const eye = enoObj.field("eye").optionalStringValue()
                const glasses = enoObj.field("glasses").optionalBooleanValue()
                let cloth = enoObj.field("clothes").optionalStringValue()
                let clothing_color = enoObj.field("clothing_color").optionalStringValue()
                let ret = {}
                if (name) ret["name"] = name
                if (age) ret["age"] = age
                if (sex) ret["sex"] = sex
                if (height) ret["height"] = height
                if (skin) ret["skin"] = skin
                if (hair) ret["hair"] = hair
                if (eye) ret["eye"] = eye
                if (glasses) ret["glasses"] = glasses
                if (cloth) {
                    ret["clothes"] = cloth
                } else if(clothing_color) {
                    ret["clothing_color"] = clothing_color
                    ret["clothing_figures"] = enoObj.list("clothing_figures").optionalStringValues()
                } else {
                    try {
                        cloth = enoObj.fieldset("clothing")
                        if (!isFieldSetMissing(cloth)) {
                            ret["clothing"] = {
                                color: cloth.entry("color").optionalStringValue(),
                                figures: cloth.entry("figures").optionalCommaSeparatedValue()
                            }
                        }
                    } catch(e) {
                        cloth = enoObj.section("clothing")
                        if (!isSectionMissing(cloth)) {
                            ret["clothing"] = {
                                color: cloth.field("color").optionalStringValue(),
                                figures: cloth.list("figures").optionalStringValues(),
                            }
                        }
                    }
                }
                return ret
            }
            let retObj = parsePerson(enoParsed)
            let house = enoParsed.fieldset("house")
            if(!isFieldSetMissing(house)) {
                retObj["house"] = {
                    color: house.entry("color").optionalStringValue(),
                    roof: house.entry("roof").optionalStringValue(),
                    windows: house.entry("windows").optionalIntegerValue(),
                    multilevel: house.entry("multilevel").optionalBooleanValue(),
                }
            } else {
                house = enoParsed.section("house")
                if (!isSectionMissing(house)) {
                    retObj["house"] = {
                        color: house.field("color").optionalStringValue(),
                        roof: house.field("roof").optionalStringValue(),
                        windows: house.field("windows").optionalIntegerValue(),
                        multilevel: house.field("multilevel").optionalBooleanValue(),
                    }
                }
            }
            let friends = enoParsed.section("friends")
            if (!isSectionMissing(friends)) {
                retObj["friends"] = []
                let ind = 0
                let friend = friends.section(ind)
                while(!isSectionMissing(friend)) {
                    retObj["friends"].push(parsePerson(friend))
                    ind++
                    friend = friends.section(ind)
                }
            }
            return retObj
        },
        hjson: () => HJSON.parse(text),
        hocon: () => HOCON(text),
        ini: () => {
            let obj = INI.decode(text)
            if ("age" in obj) obj.age = obj.age === "" ? null : Number(obj.age)
            if ("height" in obj) obj.height = Number(obj.height)
            if ("glasses" in obj) obj.glasses = Boolean(obj.glasses)
            if ("clothing_figures" in obj) obj.clothing_figures = obj.clothing_figures === "" ? [] : obj.clothing_figures.split(",")
            if ("clothing" in obj) obj.clothing.figures = obj.clothing.figures === "" ? [] : obj.clothing.figures.split(",")
            if ("house" in obj) {
                obj.house.windows = Number(obj.house.windows)
                obj.house.multilevel = Boolean(obj.house.multilevel)
            }
            return obj;
        },
        json: () => JSON.parse(text),
        json5: () => JSON5.parse(text),
        properties: () => {
            let obj = PROPERTIES.parse(text, true)
            let correctValues = (personObj) => {
                if ("age" in personObj) personObj.age = personObj.age === "" ? null : Number(personObj.age)
                if ("height" in personObj) personObj.height = Number(personObj.height)
                if ("glasses" in personObj) personObj.glasses = Boolean(personObj.glasses)
                if ("clothing_figures" in personObj) {
                    if (personObj.clothing_figures instanceof Object) {
                        let newFigures = []
                        if ("0" in personObj.clothing_figures) newFigures.push(personObj.clothing_figures["0"])
                        if ("1" in personObj.clothing_figures) newFigures.push(personObj.clothing_figures["1"])
                        if ("2" in personObj.clothing_figures) newFigures.push(personObj.clothing_figures["2"])
                        personObj.clothing_figures = newFigures
                    } else {
                        personObj.clothing_figures = personObj.clothing_figures === "" ? [] : personObj.clothing_figures.split(",")
                    }
                }
                if ("clothing" in personObj) {
                    if (personObj.clothing.figures instanceof Object) {
                        let newFigures = []
                        if ("0" in personObj.clothing.figures) newFigures.push(personObj.clothing.figures["0"])
                        if ("1" in personObj.clothing.figures) newFigures.push(personObj.clothing.figures["1"])
                        if ("2" in personObj.clothing.figures) newFigures.push(personObj.clothing.figures["2"])
                        personObj.clothing.figures = newFigures
                    } else {
                        personObj.clothing.figures = personObj.clothing.figures === "" ? [] : personObj.clothing.figures.split(",")
                    }
                }
            }
            correctValues(obj)
            if ("house" in obj) {
                obj.house.windows = Number(obj.house.windows)
                obj.house.multilevel = Boolean(obj.house.multilevel)
            }
            if ("friends" in obj) {
                let newFriends = []
                if ("0" in obj.friends) newFriends.push(obj.friends["0"])
                if ("1" in obj.friends) newFriends.push(obj.friends["1"])
                if ("2" in obj.friends) newFriends.push(obj.friends["2"])
                obj.friends = newFriends
                obj.friends.forEach(correctValues)
            }
            return obj;
        },
        toml: () => TOML.parse(text),
        xml: () => {
            const alwaysArray = ["person.clothing.figures.figure", "person.friends.person", "person.friends.clothing.figures.figure"]
            const xmlParseOptions = {
                ignoreAttributes: false,
                parseAttributeValue: true,
                attributeNamePrefix: "",
                textNodeName: "value",
                allowBooleanAttributes: true,
                isArray: (name, jpath, isLeafNode, isAttribute) => {
                    if (alwaysArray.includes(jpath)) return true;
                }
            }
            const XML = new XMLParser(xmlParseOptions)
            const parsed = XML.parse(text).person
            if (parsed === "") {
                return {}
            }
            const replaceArrays = (obj) => {
                if("clothing_figures" in obj) {
                    obj.clothing_figures = obj.clothing_figures.figure
                    if(obj.clothing_figures == undefined) {
                        obj.clothing_figures = []
                    } else if(!Array.isArray(obj.clothing_figures)) {
                        obj.clothing_figures = [obj.clothing_figures]
                    }
                }
                if("clothing" in obj) {
                    obj.clothing.figures = obj.clothing.figures.figure
                    if(obj.clothing.figures == undefined) {
                        obj.clothing.figures = []
                    } else if(!Array.isArray(obj.clothing.figures)) {
                        obj.clothing.figures = [obj.clothing.figures]
                    }
                }
            }
            replaceArrays(parsed)
            if("friends" in parsed) {
                parsed.friends = parsed.friends.person
                if(parsed.friends == undefined) {
                    parsed.friends = []
                } else if(!Array.isArray(parsed.friends)) {
                    parsed.friends = [parsed.friends]
                }
                parsed.friends.forEach(replaceArrays)
            }
            const ret = deepReplace("", null, parsed)
            return ret
        },
        yaml: () => YAML.load(text)
    }
    return parsers[format]()
}

exports.stringifyByFormat = (obj, format) => {
    throw new Error("not implemented")
    //TODO: implement
}