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
`| [p(50) gap(50) bg(#eef) pack]
  | [gap(20) w(100%) w(~2000)]
    - Flark [font(100) bold grow]
    - <a href="https://github.com/flark-lang/flark">GitHub</a> [c(blue) bold underline]
    - 😎
  | [font(50) pack text(right) gap(50)]
    -
      | flexbox-based
      | tiny
    - markup language! [font(80)]
  | [pack text(center) font(50) r(20) clip b(black) w(800)]
    | [w(100%) h(200) hbox(fill)]
      - | [flex(1) bg(#3555ea) c(#eef) vpack]
      - - [flex(1) bg(#fc8041) vpack]
    | makes
    | [w(100%)]
      - vertical [flex(1) bg(#3555ea) c(#eef)]
      - horizontal [flex(1) bg(#fc8041)]
    | box!
  | [r(20) clip b(black) w(800) p(50)]
    | This editor [font(50)]
    | [font(40)]
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
        font-size: 32px;
        justify-content: center;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    editor, preview {
        width: 100%;
        /* max-width: 600px; */
    }
    preview {
        font-family: monospace;
    }
</style>

<app>
    <editor>
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
    <preview>
        {@html toHtml(value)} 
    </preview>
</app>

