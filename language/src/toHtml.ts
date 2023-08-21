import { parser } from "./main.grammar"

export function toHtml(text) {
    const tree = parser.parse(text)

    const getText = node => text.slice(node.from, node.to)
    
    tree.iterate({
        enter(node) {
            if (["VPipe", "HPipe"].includes(node.name)) return false
            if (node.name == "Item") {
            }
        },
        leave(node) {
            if ([
                "Item",
            ].includes(node.name)) {
            }
            return true
        }
    })
    return text
}