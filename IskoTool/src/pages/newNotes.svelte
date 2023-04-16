<script>
    import Modal from '../lib/newnotes/modal.svelte';
    import AddnoteForm from '../lib/newnotes/addnoteForm.svelte';
    import NotesList from '../lib/newnotes/notesList.svelte';

    let showModal = false;

    const toggleNote = () => {
        showModal = !showModal;
    };

    // let notes = [
    //     { title: 'first note', noteContent: 'this is the first note', id: 1 },
    //     { title: 'second note', noteContent: 'this is the second note', id: 2 },
    //     { title: 'third note', noteContent: 'this is the third note', id: 3 }
    // ];

    // const handleDelete = (id) => {
    //     notes = notes.filter((note) => note.id != id);
    // }

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
    <NotesList notes={notes} />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
</style>