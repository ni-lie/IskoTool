<script>
    export let type = 'primary';
    export let style = '';
    export let disabled = false;
</script>

<button class={type} style={style} disabled={disabled} on:click>
    <slot></slot>
</button>

<style>
    button{
        border: 0;
        cursor: pointer;
        border-radius: 6px;
        padding: 8px 12px;
        font-family: Rubik;
        font-weight: 800;
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
        transition: background 0.1s linear;
    }

    .primary {
        background: #1c8d76;
        color: white;
    }
    
    .primary:disabled {
        background: var(--evergreen-light);
    }

    .primary:hover {
        background: var(--evergreen-light);
    }

    .danger {
        background: rgb(255, 82, 82);
        color: white;
    }

    .danger:disabled {
        background: lightcoral;
    }

    .danger:hover {
        background: lightcoral;
    }
</style>