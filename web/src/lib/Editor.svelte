<script>
    import CodeMirror from "svelte-codemirror-editor"
    import { flark, myHighlightStyle } from "$lib/lang.js"
    import { syntaxHighlighting } from "@codemirror/language"

    let value = 
`|
  - a
  - b
|
  | b
  | c`
</script>

<CodeMirror
    bind:value
    lang={flark()}
    extensions={[
        syntaxHighlighting(myHighlightStyle)
    ]}
/>