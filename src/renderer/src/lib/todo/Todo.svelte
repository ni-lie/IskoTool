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
        background: var(--evergreen-dark);
    }
</style>