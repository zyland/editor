<script>
    import CodeMirror from "svelte-codemirror-editor"
    import { flark, myHighlightStyle } from "$lib/lang.js"
    import { syntaxHighlighting } from "@codemirror/language"
    import { oneDark } from "@codemirror/theme-one-dark"

    let value = "Hello world\n# v"
</script>

<CodeMirror
    bind:value
    lang={flark()}
    theme={oneDark}
    extensions={[
        syntaxHighlighting(myHighlightStyle)
    ]}
/>