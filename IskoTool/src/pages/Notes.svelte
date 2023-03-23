<script lang="ts">
	import Count from '../lib/notes/Count.svelte';
	import { addNote, notesStore } from '../lib/notes/stores';
	import type { Note } from '../types/note';
    import Svelecte from 'svelecte';
	
	const NEW_NOTE = {id: ($notesStore.length)+1, title: '', text: ''};
	
	let editing = false;
	let note: Note;
	let selectedId: number;
	let textInput;
	let titleInput;
	
	// !! NOTE -- adding the .sort() method breaks the delete function. Must find workaround in the future.
	$: sortedNotes = $notesStore;
	$: note = $notesStore[selectedId] || NEW_NOTE;
	
	function deleteNote() {
		if (confirm('Are you sure you want to delete this note?')) {
	    notesStore.update(notes => {
        	delete notes[selectedId];
			selectedId = null;
		    return notes;
		  });
		}
	}
	
	function editNote() {
		textInput.focus();
		editing = true;
	}
	
	function handleSubmit() {
    // do nothing for now
	}

	function newNote() {
		selectedId = $notesStore.length;
		addNote('', '');
		editing = true;
		titleInput.focus();
	}

	function pinNote(){
		notesStore.update(notes => {
			let pinNote = notes[selectedId];
			for(let i=selectedId; i>0; i--){
				notes[i] = notes[i-1];
				notes[i].id = i
			}
			notes[0] = pinNote;
			notes[0].id=0;
			selectedId = null;
		    return notes;
		  });
	}

</script>
<form on:submit|preventDefault={handleSubmit}>
	<div>
        <Svelecte options = {sortedNotes} bind:value={selectedId} placeholder="Search a note...">
        </Svelecte>
    	<button disabled={selectedId == null} on:click={editNote}>Edit</button>
		<button disabled={selectedId == null} on:click={deleteNote}>Delete</button>
		<button disabled={selectedId == null} on:click={pinNote}>Pin</button>
		<button on:click={newNote}>New</button>
	</div>

	<div>
	  <label for="title">Title</label>
	  <input id="title" readonly={!editing} bind:this={titleInput} bind:value={note.title} />
	</div>

	<textarea readonly={!editing} rows="10" bind:this={textInput} bind:value={note.text} />
	{#if note.text}
	  <Count text={note.text} />
	{/if}
</form>

<style>
	input, textarea {
    width: 100%;
	}
	
	input:read-only, textarea:read-only {
		background-color: lightgray;
    border: none;
	}

    :global(.svelecte-control) {	
        --sv-color: rgb(0, 0, 0) !important;
    }
</style>