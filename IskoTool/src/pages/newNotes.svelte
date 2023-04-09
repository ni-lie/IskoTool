<script>
    import Modal from '../lib/newnotes/modal.svelte';
    import AddnoteForm from '../lib/newnotes/addnoteForm.svelte';

    let showModal = false;

    const toggleNote = () => {
        showModal = !showModal;
    };

    let notes = [
        { title: 'first note', noteContent: 'this is the first note', id: 1 },
        { title: 'second note', noteContent: 'this is the second note', id: 2 },
        { title: 'third note', noteContent: 'this is the third note', id: 3 }
    ];

    const handleDelete = (id) => {
        notes = notes.filter((note) => note.id != id);
    }

    const addNote = (e) => {
        const note = e.detail;
        notes  = [note, ...notes];
        showModal = false;
    };
</script>

<Modal {showModal} on:click={toggleNote}>
    <AddnoteForm on:addNote={addNote} /> 
</Modal>

<main>
    <button on:click={toggleNote}>Add a note</button>

    {#each notes as note (note.id)}
        <div>
            <h3>{note.title}</h3>
            <p>{note.noteContent}</p>
            <button on:click={() => {handleDelete(note.id)}}>Delete</button>
        </div>
    {:else}
        <p>There are no notes to show...</p>
    {/each}
    
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h3 {
        color: #1c8d76;
    }
</style>