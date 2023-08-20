import { parser, toHtml } from "../../../language/dist/index.js"
export { parser, toHtml }

import {
  foldNodeProp,
  getIndentation,
  indentNodeProp,
  LRLanguage,
  LanguageSupport,
  HighlightStyle,
} from "@codemirror/language"

import { tags as t } from "@lezer/highlight"

const boxFold = node => ({
  from:node.from,
  to:node.childBefore(node.to)?.to||node.to
})

let parserWithMetadata = parser.configure({
    props: [      
      indentNodeProp.add({
        VBox: context => context.column(context.node.from),
        HBox: context => context.column(context.node.from),
      }),
      
      foldNodeProp.add({
        VBox: boxFold,
        HBox: boxFold,
      })
    ]
  })

const language = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {

  }
})

export function flark() {
  return new LanguageSupport(language)
}

import { dark } from "ayu"
const s = dark.syntax

export const myHighlightStyle = HighlightStyle.define([
  {tag: t.operator, color: s.operator.hex()},
  {tag: t.content, color: s.markup.hex()},
  {tag: t.brace, color: s.special.hex()},
  {tag: t.bracket, color: s.regexp.hex()},
  {tag: t.name, color: s.func.hex()},
  {tag: t.number, color: s.constant.hex()}
])