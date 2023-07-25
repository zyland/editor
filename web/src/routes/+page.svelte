<script>
    import CodeMirror from "svelte-codemirror-editor"
    import { flark } from "$lib/lang.js"
    import { oneDark } from "@codemirror/theme-one-dark"
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<CodeMirror
    lang={flark()}
    theme={oneDark}
/>