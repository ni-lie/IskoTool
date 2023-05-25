<script>
    import Button from './Button.svelte';

    let showDialog = false
    let functionToCall = {
    func: null,
    args: null
    }
    
    function callFunction () {
    showDialog = false
    functionToCall['func'](...functionToCall['args'])
    }
  
    function confirm (func, ...args) {
    functionToCall = {func, args}
    showDialog = true
    }
</script>

<slot confirm={confirm}></slot>

{#if showDialog}
    <div class="overlay"></div>
    <div class="confirm-dialog">
        <p>Do you wish to delete this item?</p>
        <span class="button-group">
            <Button type="tertiary" on:click="{() => showDialog = false }"> Cancel </Button>
            <Button type="danger" on:click="{callFunction}"> Delete </Button>
        </span>
    </div>
{/if}

<style>
div.confirm-dialog {
    min-width: fit-content;
    min-height: fit-content;
    position: absolute;
    z-index: 999;
    transform: translate(40%);
    margin: 0;
    padding: 1em;
    border-radius: 3px;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.button-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.overlay {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    user-select: none;
    z-index: 998;
    background: hsla(0, 0%, 0%, 50%);
}
</style>