import { styleTags, tags as t } from "@lezer/highlight"

export const highlight = styleTags({
    String: t.string,
    Number: t.number,
    Identifier: t.name,
    "Add Sub Mul Div Or And Join Def": t.operator,
})

import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"

export const colors = [
    { tag: t.string, color: "#baf56a" },
    { tag: t.number, color: "#ca6ca7" },
    { tag: t.name, color: "#fcc01b" },
    { tag: t.operator, color: "#e76a0b" },
]

export const extensions = [
    syntaxHighlighting(
        HighlightStyle.define(colors)
    )
]