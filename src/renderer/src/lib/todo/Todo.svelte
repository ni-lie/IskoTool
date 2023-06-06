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
        padding: 1rem;
        background: var(--evergreen-dark);
        border-radius: 0.5rem;
    }
</style>
