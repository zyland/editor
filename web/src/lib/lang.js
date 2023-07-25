import { parser } from "flark"

import {
  foldNodeProp,
  foldInside,
  indentNodeProp,
  LRLanguage,
  LanguageSupport,
} from "@codemirror/language"

import {styleTags, tags as t} from "@lezer/highlight"

let parserWithMetadata = parser.configure({
    props: [
      styleTags({
        Identifier: t.variableName,
        //Boolean: t.bool,
        //String: t.string,
        Comment: t.lineComment,
        "( )": t.paren
      }),
      indentNodeProp.add({
        Application: context => context.column(context.node.from) + context.unit
      }),
      foldNodeProp.add({
        Application: foldInside
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