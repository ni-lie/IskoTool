<script>
    import Card from "./Card.svelte";
    import NotesStore from "./stores/NotesStore";
    import Button from "../global-components/Button.svelte";
    import ConfirmDelete from "../global-components/ConfirmDelete.svelte";
    import { createEventDispatcher } from "svelte";
    import Pin from "../../images/Pin.png"

    let dispatch = createEventDispatcher();

    export let note;
    export let showModal;
    export let toggleEdit;
    export let showAddNoteForm;

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
        <div class="{note.pinned ? '' : 'unpinned'}"><img class="pinicon" src={Pin} alt="Note is pinned"></div>
        <h4>{note.title}</h4>
        <p>{note.noteContent}</p>
        <div class = "delete">
			<ConfirmDelete let:confirm="{confirmDeleteItem}">
                <Button type="danger" on:click={() => confirmDeleteItem(handleDelete, note.id)}>Delete</Button>
            </ConfirmDelete>
        </div>
    </div>    
</Card>

<style>
    .note {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    h4 {
        margin: 0 auto;
        width: 100%;
        color:black;
        min-height: 7%;
        max-height: 15%;
        overflow: clip;
        overflow-wrap: break-word;
        display: -webkit-box;     
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    p {
        min-height: 60%;
        max-height: 75%;
        margin-top: 6px;
        font-size: 14px;
        color: var(--evergreen-dark);
        margin-bottom: 5%;
        font-family: 'Space Grotesk';
        overflow: hidden;
        word-break: break-all;
        flex-basis: 75%;
        flex-shrink: 1;
    }
    .unpinned {
        display: none;
    }

    .pinicon {
        width: 1.25rem;
    }
</style>
