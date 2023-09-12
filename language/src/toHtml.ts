import { parser } from "./main.grammar"
import { Tree, SyntaxNodeRef } from "@lezer/common"

import { Expr, expand, $, f, any } from "@zyland/core"

export function toHtml(text: string, tree: Tree) {
    const getText = node => text.slice(node.from, node.to)
    
    const visit =
        (node: SyntaxNodeRef): Expr => {
            if (node.name == "LogicBlock") {
                const [head, ...lines] =
                    node.node.getChildren("LogicLine")
                        .reverse()
                return lines
                    .reduce((acc: Expr, x): Expr => {
                        const opName = x.node.firstChild.type.name.toLowerCase()
                        return {[opName]: [visit(x.node.lastChild), acc]}
                    },
                    visit(head.lastChild)
                    )
            }
            if (node.name == "Lines") {
                return {and: [
                    visit(node.node.firstChild),
                    visit(node.node.lastChild),
                ]}
            }
            if (node.name == "Identifier") {
                return {ref: getText(node.node)}
            }
            if (node.name == "String") {
                const text = getText(node.node)
                return {literal: text.substring(1, text.length-1)}
            }
            if (node.name == "CaptureExpr") {
                return {capture: [
                    getText(node.node.firstChild),
                    any,
                ]}
            }
            if (node.name == "CallExpr") {
                return {call: [
                    visit(node.node.firstChild),
                    visit(node.node.lastChild),
                ]}
            }
            if (node.name == "ArrowExpr") {
                return {arrow: [
                    visit(node.node.firstChild),
                    visit(node.node.lastChild),
                ]}
            }
            if (node.name == "BinExpr") {
                const opName = node.node.firstChild.nextSibling.type.name.toLowerCase()
                if ([
                    "or",
                    "and",
                    "call",
                    "arrow",
                    "def"
                ].includes(opName)) {
                    return {[opName]: [
                        visit(node.node.firstChild),
                        visit(node.node.lastChild),
                    ]}    
                } else {
                    return f({[opName]: [
                        visit(node.node.firstChild),
                        visit(node.node.lastChild),
                    ]}  )
                }
            }
        }
    console.log(JSON.stringify(visit(tree.topNode.firstChild)))
    //return JSON.stringify(visit(tree.topNode.firstChild))
    return $(expand({ref: "pat"})(visit(tree.topNode.firstChild)))
        .map(x => `"`+x?.literal+`"`)
        .take(20)
        .join("<br>")
}