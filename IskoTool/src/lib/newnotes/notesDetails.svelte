<script>
    export let note;
</script>


<div class="note">
    <div class="title"> 
        <h3>{note.title}</h3>
    </div>
    <div class="note-content">
        <p>{note.noteContent}</p>
    </div>
    <!-- <Button type="secondary" on:click={() => {handleDelete(note.id)}}> Delete </Button> -->
    <!-- <DeletenoteForm on:deleteNote={note.id}/> -->
    <!-- <DeletenoteForm noteID={note.id} notes={notes}/> -->
</div>

<style>
    h3 {
        color: #1c8d76;
    }
</style>