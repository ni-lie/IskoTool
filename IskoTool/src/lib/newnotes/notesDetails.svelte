<script>
    import Card from "./Card.svelte";
    export let note;
</script>

<Card>
    <div class="note">
        <!-- <div class="title">  -->
            <h4>{note.title}</h4>
        <!-- </div> -->
        <!-- <div class="note-content"> -->
            <p>{note.noteContent}</p>
        <!-- </div> -->
        <!-- <Button type="secondary" on:click={() => {handleDelete(note.id)}}> Delete </Button> -->
        <!-- <DeletenoteForm on:deleteNote={note.id}/> -->
        <!-- <DeletenoteForm noteID={note.id} notes={notes}/> -->
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
    .title, .note-content{
        background: #fafafa;
        cursor: pointer;
        margin: 10px auto;
        position: relative;
    }
    .title:hover, .note-content:hover{
    opacity: 0.6;
    }
    /* span{
        display: inline-block;
        padding: 10px 20px;
    } */
</style>