<script>
    export const showModal = false;
    export const showAddNoteForm = false;
    export let toggleEdit;

    function handleEdit(){
        toggleEdit();
    }
    

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card" on:click={handleEdit} on:click> 
    <slot></slot>
</div>

<style>
    .card{
        max-width: 75%;
        max-height: 80%;
        width: 100%;
        height: 100%;
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