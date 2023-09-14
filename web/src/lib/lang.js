import { parser, toHtml } from "../../../language/dist/index.js"
export * from "../../../language/dist/index.js"

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

export function zy() {
  return new LanguageSupport(language)
}