<script>
    import Editor from "$lib/Editor.svelte"
    import logo from "$lib/assets/zy-logo.svg"
</script>

<h1 class="hbox px(20) pt(20) gap(10) font(32) bold monospace">
    <img src={logo} alt="Zy logo" class="h(1em)"/>
    Zy
</h1>
<Editor/>