import { parser, flarkHighlighting, toHtml } from "flark"
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
      flarkHighlighting,
      
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

export const myHighlightStyle = HighlightStyle.define([
  {tag: t.operator, color: "#e60"},
  {tag: t.content, color: "#252"},
])