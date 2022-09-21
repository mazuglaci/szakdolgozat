const { detailedDiff } = require("deep-object-diff")
const { flatten } = require("flat")

exports.objectEqual = (aObj, bObj) => require("deep-equal")(aObj, bObj, { strict: true })

exports.randomArrayElem = (arr) => arr[Math.floor(Math.random()*arr.length)]

exports.randomEnum = (enumClass) => this.randomArrayElem(enumClass.fields)//enumClass[this.randomArrayElem(enumClass.keys)]

exports.enumValueOrRandom = (enumClass, value) => {
    if(value == undefined || enumClass[value.toUpperCase()] == undefined) {
        return this.randomEnum(enumClass)
    } else {
        return enumClass[value.toUpperCase()]
    }
}

exports.randomBetween = (min,max) => Math.floor(Math.random() * (max-min+1) + min)

exports.randomBool = () => Math.random() < 0.5

exports.flatObjectDiff = (objOG, objNew) => {
    let ret = []
    const flatDif = flatten(detailedDiff(objOG, objNew))
    for(let key in flatDif) {
        if(!["added", "deleted", "updated"].includes(key)) {
            ret.push(key.replace("added.", "").replace("deleted.", "").replace("updated.", ""))
        }
    }
    return ret
}