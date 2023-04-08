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
        <textarea placeholder="Type your note" cols="30" rows="10"></textarea>
        <br>
        <button>Save note</button>
        <button>Delete</button>
    </form>
</Modal>
<main>
    <button on:click={toggleNote}>Add a note</button>
</main>

<style>
    input {
        background-color: white;
    }
	input:read-only, textarea:read-only {
		background-color: lightgray;
        border: none;
	}
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
</style>