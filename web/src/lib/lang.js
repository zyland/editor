import { parser, flarkHighlighting, toHtml } from "flark"
export { parser, toHtml }

import {
  foldNodeProp,
  foldInside,
  indentNodeProp,
  LRLanguage,
  LanguageSupport,
  HighlightStyle,
} from "@codemirror/language"

import { tags as t } from "@lezer/highlight"

let parserWithMetadata = parser.configure({
    props: [
      flarkHighlighting,
      /*
      indentNodeProp.add({
        Block: context => context.column(context.node.from) + context.unit
      }),
      foldNodeProp.add({
        Block: foldInside
      })
      */
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