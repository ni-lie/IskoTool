<script>
    import Modal from '../lib/newnotes/modal.svelte';

    let showModal = false;

    const toggleNote = () => {
        showModal = !showModal;
    };

    let notes = [
        { title: 'first note', note: 'this is the first note', id: 1 },
        { title: 'second note', note: 'this is the second note', id: 2 },
        { title: 'third note', note: 'this is the third note', id: 3 }
    ];
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

    {#each notes as note (note.id)}
        <div>
            <h3>{note.title}</h3>
            <p>{note.note}</p>
        </div>
    {/each}
    
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