class Enum {
    #value

    constructor(value) {
        this.#value = value
    }

    get value() {
        return this.#value
    }

    static get keys() {
        return Object.keys(this)
    }

    static get fields() {
        return this.keys.map(eStr => this[eStr])
    }

    static fromValue(value) {
        return this.fields.find(e => e.value===value)
    }
}

module.exports = Enum;