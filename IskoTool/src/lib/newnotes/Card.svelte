<script>
    export let showModal;
    export let toggleEdit;
    export let showAddNoteForm;

    function handleEdit(){
        toggleEdit();
    }
    

</script>
<div class="card" on:click={handleEdit} on:click> 
    <slot></slot>
</div>

<style>
    .card{
        background: #fff;
        padding: 20px;
        border-radius: 6px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.1);

        transition: background 0.25s ease-in-out, border 0.25s ease-in-out;
    }
    .card:hover{
        cursor: pointer;
        background: rgba(0,0,0,0.1);
        color: black;
    }
</style>