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
  -
    | Hello,
    | Bye,
  - world!
|
  | asdf
  |
    - made by
    - gnlow`
</script>

<style>
    :global(.flark-vbox) {
        display: flex;
        flex-direction: column;
        padding: .3rem;
        background-color: rgba(0,0,0,10%);
        gap: .3rem;
    }
    :global(.flark-hbox) {
        display: flex;
        flex-direction: row;
        padding: .3rem;
        background-color: rgba(0,0,0,10%);
        gap: .3rem;
    }
    :global(.flark-text) {
        padding: .3rem;
        border: solid white 1px;
    }
</style>

<CodeMirror
    bind:value
    lang={flark()}
    extensions={[
        syntaxHighlighting(myHighlightStyle)
    ]}
/>

{@html toHtml(value)}