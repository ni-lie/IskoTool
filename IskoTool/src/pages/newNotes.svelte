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
    <br>
    <button class="add-note" on:click={toggleNote}><img class="white-plus" src="src/lib/images/white_plus.png" alt="whiteplus"/></button>
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
        margin: 0 auto;
    }
    .add-note {
        color: white;
        margin: auto;
        height: 4rem;
        width: 4rem;
        padding: 0.1em;
        border-radius: 50%;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: var(--orange-light);

        position: absolute;
        bottom: 2em;
        right: 2em;
        z-index: 5;

        transition: background 0.25s ease-in-out, border 0.25s ease-in-out;
    }

    .add-note:hover {
        background: var(--orange-faded);
        border-color: var(--orange-faded);
    }
    .white-plus {
        height: 50%;
    }
</style>