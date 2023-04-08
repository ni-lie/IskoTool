<script>
    import Modal from '../lib/newnotes/modal.svelte';

    let showModal = false;

    const toggleNote = () => {
        showModal = !showModal;
    };
</script>

<Modal message = "Hey there!" {showModal} on:click={toggleNote} />
<main>
    <button on:click={toggleNote}>Add a note</button>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

</style>