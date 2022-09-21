/**
 * @param {Element} div
 * @param {{mode:String}} modeObj 
 * @returns {CodeMirror.Editor}
 */
module.exports = (div, format, readOnly=false) => {
    let values = fromFormat(format)
    let ret = new CodeMirror(div, {
        mode: values.mode,
        value: values.value ?? "",
        lineNumbers: !readOnly,
        indentUnit: 4,
        smartIndent: false,
        indentWithTabs: false,
        autoCloseBrackets: true,
        matchBrackets: true,
        autoCloseTags: true,
        matchingTags: true,
        extraKeys: {
            Tab: function(cm) {
                var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                cm.replaceSelection(spaces);
            }
        },
        readOnly: readOnly ? "nocursor" : false
    })
    return ret
}

function fromFormat(format) {
    const formatValues = {
        eno: {
            mode: "yaml"
        },
        hjson: {
            mode: "yaml",
            value: "{\n    \n}"
        },
        hocon: {
            mode: "null"
        },
        ini: {
            mode: "properties"
        },
        json: {
            mode: {name: "javascript", json: true},
            value: '{\n    \n}'
        },
        json5: {
            mode: {name: "javascript", json: true},
            value: '{\n    \n}'
        },
        properties: {
            mode: "properties"
        },
        toml: {
            mode: "toml"
        },
        xml: {
            mode: "xml",
            value: '<person>\n    \n</person>'
        },
        yaml: {
            mode: "yaml"
        }
    }
    return formatValues[format]
}
/*
extraKeys: {
    "[": (cm) => {
        let doc = cm.getDoc()
        let cursor = doc.getCursor()
        doc.replaceRange("\"", cursor)

    }
}
*/