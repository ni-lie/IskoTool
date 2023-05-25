<script>
	import Header from "./Header.svelte";
</script>

<div class="container">
    <Header />
    sample text
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