<script>
    export let message
    export let showModal = false;
</script>

{#if showModal}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class = "backdrop" on:click|self>
        <div class = "modal">
            <p> {message} </p>
        </div>
    </div>
{/if}

<main>
</main>

<style>
    .backdrop{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
    }
    .modal{
        padding: 10px;
        border-radius: 10px;
        max-width: 400px;
        margin: 10% auto;
        text-align: center;
        background: white;
    }
</style>