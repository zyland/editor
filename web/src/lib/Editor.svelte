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
`| Hello
| {catchWord} [center p.35]
|
  - [a]
    | {name_kr} [t.64]
    |
      - {name_self}
      - {name_alt}
  - {flag}
| {map} [w.fill h.440]
`
</script>

<style>
    :global(.flark-vbox) {
        display: flex;
        flex-direction: column;
        padding: .3rem;
        background-color: rgba(0,0,50,10%);
        gap: .3rem;
        width: 100%;
    }
    :global(.flark-hbox) {
        display: flex;
        flex-direction: row;
        padding: .3rem;
        background-color: rgba(0,0,50,10%);
        gap: .3rem;
        align-items: center;
    }
    :global(.flark-text) {
        padding: .3rem;
        border: solid white 1px;
        width: 100%;
        box-sizing: border-box;
        text-align: center;
    }

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
        max-width: 600px;
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

