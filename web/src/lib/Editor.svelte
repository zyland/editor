<script>
    import CodeMirror from "svelte-codemirror-editor"
    import {
        flark,
        myHighlightStyle,
        parser,
        toHtml,
    } from "$lib/lang.js"
    import { syntaxHighlighting } from "@codemirror/language"
    import {EditorView} from "@codemirror/view"
    import { dark } from "ayu"

    let value = 
`| [p(32) gap(32) bg(#eef) pack]
  | [gap(16) w(100%) w(~2000)]
    - Flark [font(64) bold grow]
    - <a href="https://github.com/flark-lang/flark">GitHub</a> [c(blue) bold underline]
    - 😎
  | [font(32) pack text(right) gap(32)]
    -
      | flexbox-based
      | tiny
    - markup language! [font(48)]
  | [pack text(center) font(32) r(16) clip b(black) w(600)]
    | [w(100%) hbox(fill)]
      - | [flex(1) bg(#3555ea) c(#eef) vpack]
      - - [flex(1) bg(#fc8041) vpack]
    | makes
    | [w(100%)]
      - vertical [flex(1) bg(#3555ea) c(#eef)]
      - horizontal [flex(1) bg(#fc8041)]
    | box!
  | [r(16) clip b(black) w(600) p(32)]
    | This editor [font(32)]
    | [font(36)]
      - built with [grow]
      - [text(right) bold]
        | CodeMirror [c(#da687d)]
        | Svelte [c(#f73c00)]
        | AdorableCSS [c(#fb3958)]
`
</script>

<style>
    app {
        display: flex;
        flex-direction: row;
        height: 100vh;
        font-size: 16px;
        justify-content: center;
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 20px;
        padding: 20px;
    }
</style>

<app>
    <editor class="r(20) clip b(black) w(400~) grow bg(#0b0e14)">
        <CodeMirror
            bind:value
            lang={flark()}
            extensions={[
                syntaxHighlighting(myHighlightStyle)
            ]}
            theme={EditorView.theme({
              "&": {
                color: "white",
                backgroundColor: dark.ui.bg.hex()
              },
              ".cm-content": {
                caretColor: "white"
              },
              "&.cm-focused .cm-cursor": {
                borderLeftColor: "white"
              },
              "&.cm-focused .cm-selectionBackground, ::selection": {
                backgroundColor: dark.ui.selection.normal.hex()
              },
              ".cm-gutters": {
                backgroundColor: dark.editor.gutter.normal.hex(),
                color: "#ddd",
                border: "none"
              }
            }, {dark: true})}
        />
    </editor>
    <preview class="r(20) clip b(black) w(800~) grow monospace">
        {@html toHtml(value)} 
    </preview>
</app>

