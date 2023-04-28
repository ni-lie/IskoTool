<script>
    import Card from "./Card.svelte";
    import NotesStore from "./stores/NotesStore";
    import Modal from "./modal.svelte";
    import EditNoteForm from "./editNoteForm.svelte";
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let note;
    export let showModal;
    export let toggleEdit;
    export let showAddNoteForm;

    // delete a poll
    const handleDelete = (id) => {
        NotesStore.update(notes => {
            return notes.filter(note => note.id != id)
        })
    }

    function handleCardClick(sel) {
        dispatch('cardClick', sel);
    }
</script>

<Card showModal={showModal} toggleEdit={toggleEdit} showAddNoteForm={showAddNoteForm} on:click={() => handleCardClick(note)}>
    <div class="note">
        <h4>{note.title}</h4>
        <p>{note.noteContent}</p>
    </div>    
    <div class = "delete">
        <Button type="secondary" on:click={() => handleDelete(note.id)}>Delete</Button>
    </div>
</Card>

<style>
    h4 {
        margin: 0 auto;
        color:black;
    }
    p{
    margin-top: 6px;
    font-size: 14px;
    color: var(--evergreen-dark);
    margin-bottom: 30px;
    font-family: 'Space Grotesk';
    }
    /* .note.title, .note-content{
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }
    .title:hover, .note-content:hover{
    opacity: 0.6;
    } */

</style>