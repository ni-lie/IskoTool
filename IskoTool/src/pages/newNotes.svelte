<script>
    import Modal from '../lib/newnotes/modal.svelte';
    import AddnoteForm from '../lib/newnotes/addnoteForm.svelte';
    import NotesList from '../lib/newnotes/notesList.svelte';

    let showModal = false;

    const toggleNote = () => {
        showModal = !showModal;
    };

    // const handleDelete = (id) => {
    //     notes = notes.filter((note) => note.id != id);
    // }

    const addNote = (e) => {
        showModal = false;
    };

</script>

<Modal {showModal} on:click={toggleNote}>
    <AddnoteForm on:addNote={addNote} /> 
</Modal>

<main>
    <button on:click={toggleNote}>Add a note</button>
    <NotesList />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
</style>