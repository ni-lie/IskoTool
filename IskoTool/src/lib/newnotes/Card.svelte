<script>
    export let showModal;
    export let toggleEdit;
    export let showAddNoteForm;

    function handleEdit(){
        toggleEdit();
    }
</script>
<div class="card" on:click={handleEdit}> 
    <slot></slot>
</div>

<style>
    .card{
        background: #fff;
        padding: 20px;
        border-radius: 6px;
        box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
    }
    .card:hover{
        cursor: pointer;
        background: #1c8d76;
        color: black;
    }
</style>