<script>
	import Header from "./Header.svelte";
    import List from "./List.svelte";
</script>

<div class="container">
    <Header />
    <List />
</div>

<style>
    .container {
        width: 500px;
        background: #009579;
    }

    :global(.container *) {
        font-family:sans-serif
    }
</style>