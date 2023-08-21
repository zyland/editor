import { parser } from "./main.grammar"
import { Tree, SyntaxNodeRef } from "@lezer/common"

import { Expr, expand, $ } from "@zyland/core"

export function toHtml(text: string) {
    const tree = parser.parse(text)

    const getText = node => text.slice(node.from, node.to)
    
    const visit =
        (node: SyntaxNodeRef): Expr => {
            if (node.name == "LogicBlock") {
                const [head, ...lines] = node.node.getChildren("LogicLine")
                return lines
                    .reduce((acc: Expr, x): Expr => {
                        const opName = x.node.firstChild.type.name.toLowerCase() as "or"
                        return {[opName]: [acc, visit(x.node.lastChild)]}
                    },
                    visit(head.lastChild)
                    )
            }
            if (node.name == "String") {
                const text = getText(node.node)
                return {literal: text.substring(1, text.length-1)}
            }
            if (node.name == "Bin") {
                const opName = node.node.firstChild.nextSibling.type.name.toLowerCase() as "or"
                return {[opName]: [
                    visit(node.node.firstChild),
                    visit(node.node.lastChild),
                ] as [Expr, Expr]}
            }
        }
    console.log(
        visit(tree.topNode.firstChild),
        $(expand(visit(tree.topNode.firstChild)))
        .take(10)
    )
    return $(expand(visit(tree.topNode.firstChild)))
        .map(x => JSON.stringify(x))
        .take(10)
}