<script>
    import Card from "./Card.svelte";
    import NotesStore from "./stores/NotesStore";
    import Modal from "./modal.svelte";
    import EditNoteForm from "./editNoteForm.svelte";
    import Button from "./Button.svelte";


    export let note;
    export let showModal;
    export let toggleEdit;
    export let showAddNoteForm;


</script>

<Card showModal={showModal} toggleEdit={toggleEdit} showAddNoteForm={showAddNoteForm}>
    <div class="note">
        <h4>{note.title}</h4>
        <p>{note.noteContent}</p>
    </div>    
</Card>

<style>
    h4 {
        margin: 0 auto;
        color: #1c8d76;
    }
    p{
    margin-top: 6px;
    font-size: 14px;
    color: #000000;
    margin-bottom: 30px;
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