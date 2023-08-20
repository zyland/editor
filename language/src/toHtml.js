import { parser } from "./main.grammar"

const indent = text => text.split("\n").map(line => "    " + line).join("\n")

class Tag {
    constructor(name, class_) {
        this.name = name
        this.class_ = class_
        this.children = []
        this.parent = null
    }
    addChild(child) {
        this.children.push(child)
        if (typeof child != "string") child.parent = this
        return this
    }
    addAsChildOf(parent) {
        parent.addChild(this)
        this.parent = parent
        return this
    }
    render() {
        let result = `<${this.name}`
        if (this.class_) {
            result += ` class="${this.class_.join(" ")}"`
        }
        result += ">\n"
        for (let child of this.children) {
            if (typeof child == "string") {
                result += indent(child) + "\n"
            } else {
                result += indent(child.render()) + "\n"
            }
        }
        result += `</${this.name}>`
        return result
    }
}

class Style {
    constructor() {
        this.selectors = {}
    }
    add(selector, rules) {
        this.selectors[selector] = rules
    }
    render() {
        let result = ""
        for (let [selector, rules] of Object.entries(this.selectors)) {
            result += `.${selector} {\n`
            for (let [key, value] of Object.entries(rules)) {
                result += `    ${key}: ${value};\n`
            }
            result += "}\n"
        }
        return "<style>\n" + result.trim().split("\n").map(line => indent(line)).join("\n") + "\n</style>"
    }
}

export function toHtml(text) {
    const tree = parser.parse(text)

    const doc = new Tag("div", [])
    let current = doc

    const getText = node => text.slice(node.from, node.to)
    
    tree.iterate({
        enter(node) {
            if (["VPipe", "HPipe"].includes(node.name)) return false
            if (node.name == "Item") {
                current = new Tag("div", ["flark-item"]).addAsChildOf(current)
            }
            if (node.name == "VBox") {
                current.name = "div"
                current.class_.push("vbox")
            }
            if (node.name == "HBox") {
                current.name = "div"
                current.class_.push("hbox")
            }
            if (node.name == "PlainText") {
                current.name = "span"
                current.addChild(getText(node))
                return false
            }
            if (node.name == "StyleExpr") {
                current.class_.push(getText(node))
            }
            return true
        },
        leave(node) {
            if ([
                "Item",
            ].includes(node.name)) {
                current = current.parent
            }
            return true
        }
    })
    return doc.render() + "\n" + `<script src="https://unpkg.com/adorable-css"></script>`
}