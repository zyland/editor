<script>
    import CodeMirror from "svelte-codemirror-editor"
    import {
        zy,
        colors,
        parser,
        toHtml,
    } from "$lib/lang.js"
    import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
    import {EditorView} from "@codemirror/view"
    import { dark } from "ayu"

    import {TreeFragment} from "@lezer/common"

    let value = 
`pat:
  | ""
  | paren pat
  | pat \\
    | "x"
    | "-"
paren: $pat -> "(" \\ pat \\ ")"`
    
    let tree = parser.parse(value)
    let fragments = TreeFragment.addTree(tree)

    const change = t => {
      tree = parser.parse(value, fragments)
      fragments = TreeFragment.addTree(tree, fragments)
    }
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
            on:change={change}
            lang={zy()}
            extensions={[
              syntaxHighlighting(
                  HighlightStyle.define(colors)
              )
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
    <preview class="r(20) p(10) clip b(black) w(400~) grow monospace">
        {@html toHtml(value, tree)} 
    </preview>
</app>

