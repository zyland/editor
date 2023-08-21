import { parser } from "./main.grammar"
import { Tree, SyntaxNodeRef } from "@lezer/common"

import { Expr, expand, $ } from "@zyland/core"

export function toHtml(text: string) {
    const tree = parser.parse(text)

    const getText = node => text.slice(node.from, node.to)
    
    const visit =
        (node: SyntaxNodeRef): Expr => {
            if (node.name == "LogicBlock") {
                const [head, ...lines] =
                    node.node.getChildren("LogicLine")
                        .reverse()
                return lines
                    .reduce((acc: Expr, x): Expr => {
                        const opName = x.node.firstChild.type.name.toLowerCase() as "or"
                        return {[opName]: [visit(x.node.lastChild), acc]}
                    },
                    visit(head.lastChild)
                    )
            }
            if (node.name == "Identifier") {
                return {ref: getText(node.node)}
            }
            if (node.name == "String") {
                const text = getText(node.node)
                return {literal: text.substring(1, text.length-1)}
            }
            if (node.name == "BinExpr") {
                const opName = node.node.firstChild.nextSibling.type.name.toLowerCase() as "or"
                return {[opName]: [
                    visit(node.node.firstChild),
                    visit(node.node.lastChild),
                ]}
            }
            if (node.name == "DefExpr") {
                return {def: [
                    getText(node.node.firstChild),
                    visit(node.node.lastChild),
                ]}
            }
        }
    console.log(visit(tree.topNode.firstChild))
    //return JSON.stringify(visit(tree.topNode.firstChild))
    return $(expand({ref: "pat"})(visit(tree.topNode.firstChild)))
        .map(x => x.literal)
        .take(10)
        .join("<br>")
}