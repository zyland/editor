import { styleTags, tags as t } from "@lezer/highlight"

export const highlight = styleTags({
    String: t.string,
    Number: t.number,
    Identifier: t.name,
    "Add Sub Mul Div Join Def": t.operator,
	"Or And": t.logicOperator,
})

import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"

export const colors = [
    { tag: t.string, color: "#baf56a" },
    { tag: t.number, color: "#c1b8ff" },
    { tag: t.name, color: "#fcc01b" },
    { tag: t.operator, color: "#e76a0b" },
    { tag: t.logicOperator, color: "#b38b89" },
]

export const extensions = [
    syntaxHighlighting(
        HighlightStyle.define(colors)
    )
]