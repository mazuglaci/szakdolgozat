const fs = require("fs");
const Yaml = require("js-yaml")

module.exports = Yaml.load(fs.readFileSync("data/itemList.yaml", "utf-8"))