<script>
    import Modal from '../lib/newnotes/modal.svelte';

    let showModal = false;

    const toggleNote = () => {
        showModal = !showModal;
    };
</script>

<Modal {showModal} on:click={toggleNote}>
    <h3> Add a new note </h3>
    <form>
        <input type="text" placeholder="Title">
        <input type="text" placeholder="Type a note">
    </form>
</Modal>
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