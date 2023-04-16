<script>
    import Modal from '../lib/newnotes/modal.svelte';
    import AddnoteForm from '../lib/newnotes/addnoteForm.svelte';
    import NotesList from '../lib/newnotes/notesList.svelte';
    import EditNoteForm from '../lib/newnotes/editNoteForm.svelte';

    let showModal = false;
    let showAddNoteForm = true;
    
    const toggleNote = () => {
        showModal = !showModal;
        showAddNoteForm = true;
    };
    const toggleEdit = () => {
        showModal = !showModal;
        showAddNoteForm = false;
    };

    // const handleDelete = (id) => {
    //     notes = notes.filter((note) => note.id != id);
    // }

    const addNote = (e) => {
        showModal = false;
    };

</script>

<Modal {showModal} on:click={toggleNote}>
    {#if showAddNoteForm}
        <AddnoteForm on:addNote={addNote} /> 
    {:else}
        <AddnoteForm on:addNote={addNote}/>
        <!-- <EditNoteForm on:addNote={addNote}/> -->
    {/if}
</Modal>

<main>
    <button on:click={toggleNote}>Add a note</button>
    <NotesList showModal={showModal} toggleEdit={toggleEdit} showAddNoteForm={showAddNoteForm}/>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
</style>