<script>
    import CodeMirror from "svelte-codemirror-editor"
    import {
        flark,
        myHighlightStyle,
        parser,
        toHtml,
    } from "$lib/lang.js"
    import { syntaxHighlighting } from "@codemirror/language"

    let value = 
`|
  - <h1>Flark</h1>
  - <a href="https://github.com/flark-lang/flark">GitHub</a>
  - 😎
|
  -
    | flexbox-based
    | tiny
  - markup language!
|
  |
    - |
    - -
  | makes
  |
    - vertical
    - horizontal
  | box!
|
  | This editor
  |
    - built with
    -
      | CodeMirror
      | Svelte
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
        />
    </editor>
    <preview>
        {@html toHtml(value)} 
    </preview>
</app>

