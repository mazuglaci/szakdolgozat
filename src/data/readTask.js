const fs = require("fs")
const { parseByFormat } = require("../helper/serializeByFormat")

module.exports = (file) => ({
    "eno/1_problem.eno": () => {
        const text =  fs.readFileSync("data/tasks/eno/1_problem.eno", "utf-8")
        return {text: text, obj: parseByFormat(text, "eno")}
    },
    "eno/2_problem.eno": () => {
        const text =  fs.readFileSync("data/tasks/eno/2_problem.eno", "utf-8")
        return {text: text, obj: parseByFormat(text, "eno")}
    },
    "eno/3_problem.eno": () => {
        const text =  fs.readFileSync("data/tasks/eno/3_problem.eno", "utf-8")
        return {text: text, obj: parseByFormat(text, "eno")}
    },
    "eno/4_problem.eno": () => {
        const text =  fs.readFileSync("data/tasks/eno/4_problem.eno", "utf-8")
        return {text: text, obj: parseByFormat(text, "eno")}
    },
    "eno/5_problem.eno": () => {
        const text =  fs.readFileSync("data/tasks/eno/5_problem.eno", "utf-8")
        return {text: text, obj: parseByFormat(text, "eno")}
    },
    "eno/6_problem.eno": () => {
        const text =  fs.readFileSync("data/tasks/eno/6_problem.eno", "utf-8")
        return {text: text, obj: parseByFormat(text, "eno")}
    },
    "hjson/1_problem.hjson": () => {
        const text =  fs.readFileSync("data/tasks/hjson/1_problem.hjson", "utf-8")
        return {text: text, obj: parseByFormat(text, "hjson")}
    },
    "hjson/2_problem.hjson": () => {
        const text =  fs.readFileSync("data/tasks/hjson/2_problem.hjson", "utf-8")
        return {text: text, obj: parseByFormat(text, "hjson")}
    },
    "ini/1_problem.ini": () => {
        const text =  fs.readFileSync("data/tasks/ini/1_problem.ini", "utf-8")
        return {text: text, obj: parseByFormat(text, "ini")}
    },
    "ini/2_problem.ini": () => {
        const text =  fs.readFileSync("data/tasks/ini/2_problem.ini", "utf-8")
        return {text: text, obj: parseByFormat(text, "ini")}
    },
    "ini/3_problem.ini": () => {
        const text =  fs.readFileSync("data/tasks/ini/3_problem.ini", "utf-8")
        return {text: text, obj: parseByFormat(text, "ini")}
    },
    "ini/4_problem.ini": () => {
        const text =  fs.readFileSync("data/tasks/ini/4_problem.ini", "utf-8")
        return {text: text, obj: parseByFormat(text, "ini")}
    },
    "ini/5_problem.ini": () => {
        const text =  fs.readFileSync("data/tasks/ini/5_problem.ini", "utf-8")
        return {text: text, obj: parseByFormat(text, "ini")}
    },
    "json/1_problem.json": () => {
        const text =  fs.readFileSync("data/tasks/json/1_problem.json", "utf-8")
        return {text: text, obj: parseByFormat(text, "json")}
    },
    "json/2_problem.json": () => {
        const text =  fs.readFileSync("data/tasks/json/2_problem.json", "utf-8")
        return {text: text, obj: parseByFormat(text, "json")}
    },
    "json/3_problem.json": () => {
        const text =  fs.readFileSync("data/tasks/json/3_problem.json", "utf-8")
        return {text: text, obj: parseByFormat(text, "json")}
    },
    "json/4_problem.json": () => {
        const text =  fs.readFileSync("data/tasks/json/4_problem.json", "utf-8")
        return {text: text, obj: parseByFormat(text, "json")}
    },
    "json/5_problem.json": () => {
        const text =  fs.readFileSync("data/tasks/json/5_problem.json", "utf-8")
        return {text: text, obj: parseByFormat(text, "json")}
    },
    "json/6_problem.json": () => {
        const text =  fs.readFileSync("data/tasks/json/6_problem.json", "utf-8")
        return {text: text, obj: parseByFormat(text, "json")}
    },
    "json5/1_problem.json5": () => {
        const text =  fs.readFileSync("data/tasks/json5/1_problem.json5", "utf-8")
        return {text: text, obj: parseByFormat(text, "json5")}
    },
    "json5/2_problem.json5": () => {
        const text =  fs.readFileSync("data/tasks/json5/2_problem.json5", "utf-8")
        return {text: text, obj: parseByFormat(text, "json5")}
    },
    "properties/1_problem.properties": () => {
        const text =  fs.readFileSync("data/tasks/properties/1_problem.properties", "utf-8")
        return {text: text, obj: parseByFormat(text, "properties")}
    },
    "properties/2_problem.properties": () => {
        const text =  fs.readFileSync("data/tasks/properties/2_problem.properties", "utf-8")
        return {text: text, obj: parseByFormat(text, "properties")}
    },
    "properties/3_problem.properties": () => {
        const text =  fs.readFileSync("data/tasks/properties/3_problem.properties", "utf-8")
        return {text: text, obj: parseByFormat(text, "properties")}
    },
    "properties/4_problem.properties": () => {
        const text =  fs.readFileSync("data/tasks/properties/4_problem.properties", "utf-8")
        return {text: text, obj: parseByFormat(text, "properties")}
    },
    "properties/5_problem.properties": () => {
        const text =  fs.readFileSync("data/tasks/properties/5_problem.properties", "utf-8")
        return {text: text, obj: parseByFormat(text, "properties")}
    },
    "properties/6_problem.properties": () => {
        const text =  fs.readFileSync("data/tasks/properties/6_problem.properties", "utf-8")
        return {text: text, obj: parseByFormat(text, "properties")}
    },
    "toml/1_problem.toml": () => {
        const text =  fs.readFileSync("data/tasks/toml/1_problem.toml", "utf-8")
        return {text: text, obj: parseByFormat(text, "toml")}
    },
    "toml/2_problem.toml": () => {
        const text =  fs.readFileSync("data/tasks/toml/2_problem.toml", "utf-8")
        return {text: text, obj: parseByFormat(text, "toml")}
    },
    "toml/3_problem.toml": () => {
        const text =  fs.readFileSync("data/tasks/toml/3_problem.toml", "utf-8")
        return {text: text, obj: parseByFormat(text, "toml")}
    },
    "toml/4_problem.toml": () => {
        const text =  fs.readFileSync("data/tasks/toml/4_problem.toml", "utf-8")
        return {text: text, obj: parseByFormat(text, "toml")}
    },
    "toml/5_problem.toml": () => {
        const text =  fs.readFileSync("data/tasks/toml/5_problem.toml", "utf-8")
        return {text: text, obj: parseByFormat(text, "toml")}
    },
    "toml/6_problem.toml": () => {
        const text =  fs.readFileSync("data/tasks/toml/6_problem.toml", "utf-8")
        return {text: text, obj: parseByFormat(text, "toml")}
    },
    "xml/1_problem.xml": () => {
        const text =  fs.readFileSync("data/tasks/xml/1_problem.xml", "utf-8")
        return {text: text, obj: parseByFormat(text, "xml")}
    },
    "xml/2_problem.xml": () => {
        const text =  fs.readFileSync("data/tasks/xml/2_problem.xml", "utf-8")
        return {text: text, obj: parseByFormat(text, "xml")}
    },
    "xml/3_problem.xml": () => {
        const text =  fs.readFileSync("data/tasks/xml/3_problem.xml", "utf-8")
        return {text: text, obj: parseByFormat(text, "xml")}
    },
    "xml/4_problem.xml": () => {
        const text =  fs.readFileSync("data/tasks/xml/4_problem.xml", "utf-8")
        return {text: text, obj: parseByFormat(text, "xml")}
    },
    "xml/5_problem.xml": () => {
        const text =  fs.readFileSync("data/tasks/xml/5_problem.xml", "utf-8")
        return {text: text, obj: parseByFormat(text, "xml")}
    },
    "xml/6_problem.xml": () => {
        const text =  fs.readFileSync("data/tasks/xml/6_problem.xml", "utf-8")
        return {text: text, obj: parseByFormat(text, "xml")}
    },
    "xml/7_problem.xml": () => {
        const text =  fs.readFileSync("data/tasks/xml/7_problem.xml", "utf-8")
        return {text: text, obj: parseByFormat(text, "xml")}
    },
    "yaml/1_problem.yaml": () => {
        const text =  fs.readFileSync("data/tasks/yaml/1_problem.yaml", "utf-8")
        return {text: text, obj: parseByFormat(text, "yaml")}
    },
    "yaml/2_problem.yaml": () => {
        const text =  fs.readFileSync("data/tasks/yaml/2_problem.yaml", "utf-8")
        return {text: text, obj: parseByFormat(text, "yaml")}
    },
    "yaml/3_problem.yaml": () => {
        const text =  fs.readFileSync("data/tasks/yaml/3_problem.yaml", "utf-8")
        return {text: text, obj: parseByFormat(text, "yaml")}
    },
    "yaml/4_problem.yaml": () => {
        const text =  fs.readFileSync("data/tasks/yaml/4_problem.yaml", "utf-8")
        return {text: text, obj: parseByFormat(text, "yaml")}
    },
    "yaml/5_problem.yaml": () => {
        const text =  fs.readFileSync("data/tasks/yaml/5_problem.yaml", "utf-8")
        return {text: text, obj: parseByFormat(text, "yaml")}
    },
    "yaml/6_problem.yaml": () => {
        const text =  fs.readFileSync("data/tasks/yaml/6_problem.yaml", "utf-8")
        return {text: text, obj: parseByFormat(text, "yaml")}
    }
}[file])()