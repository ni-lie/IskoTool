<script>
    import Modal from '../lib/newnotes/modal.svelte';
    import AddnoteForm from '../lib/newnotes/addnoteForm.svelte';
    import NotesList from '../lib/newnotes/notesList.svelte';
    import EditNoteForm from '../lib/newnotes/editNoteForm.svelte';

    let selectedNoteId = null;

    let searchTerm = '';

    let showModal = false;
    let showAddNoteForm = true;

    const noteSelection = (e) => {
        selectedNoteId = e.detail;
    }
    
    const toggleNote = () => {
        showModal = !showModal;
        showAddNoteForm = true;
    };
    const toggleEdit = () => {
        showModal = !showModal;
        showAddNoteForm = false;
    };

    const addNote = (e) => {
        showModal = false;
    };

    const editNote = (e) => {
        showModal = false;
        selectedNoteId = null;
    };

    function handleInput(event) {
        searchTerm = event.target.value;
        console.log(searchTerm);
    };

    // console.log(selectedNoteId);
</script>

<Modal {showModal} on:click={toggleNote}>
    {#if showAddNoteForm}
        <AddnoteForm on:addNote={addNote} /> 
    {:else}
        {#if selectedNoteId !== null}
            <EditNoteForm selectedNoteId={selectedNoteId} on:editNote={editNote}/>
        {:else}
            <p>Note not found</p>
        {/if}
    {/if}
</Modal>

<main>
    <input type="text" placeholder="Search..." bind:value={searchTerm}> <!-- on:input={handleInput}-->
    <button on:click={toggleNote}>Add a note</button>
    <NotesList showModal={showModal} toggleEdit={toggleEdit} showAddNoteForm={showAddNoteForm} on:selectedNote={noteSelection} searchTerm={searchTerm}/> 
    <!-- <p> Typed term: {searchTerm}</p> -->
</main>

<style>
    input {
        background-color: white;
    }
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
</style>