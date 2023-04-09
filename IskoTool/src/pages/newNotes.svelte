<script>
    import Modal from '../lib/newnotes/modal.svelte';
    import AddnoteForm from '../lib/newnotes/addnoteForm.svelte';

    let showModal = false;

    const toggleNote = () => {
        showModal = !showModal;
    };

    let notes = [
        { title: 'first note', note: 'this is the first note', id: 1 },
        { title: 'second note', note: 'this is the second note', id: 2 },
        { title: 'third note', note: 'this is the third note', id: 3 }
    ];

    const handleDelete = (id) => {
        notes = notes.filter((note) => note.id != id);
    }
</script>

<Modal {showModal} on:click={toggleNote}>
    
</Modal>

<main>
    <button on:click={toggleNote}>Add a note</button>

    {#each notes as note (note.id)}
        <div>
            <h3>{note.title}</h3>
            <p>{note.note}</p>
            <button on:click={() => {handleDelete(note.id)}}>Delete</button>
        </div>
    {:else}
        <p>There are no notes to show...</p>
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