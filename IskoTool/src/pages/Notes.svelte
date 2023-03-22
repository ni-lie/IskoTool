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
	
	// $: console.log('note =', note);
	// $: console.log('editing =', editing);
	
	$: sortedNotes = $notesStore.sort();
	$: note = $notesStore[selectedId] || NEW_NOTE;
	
	function deleteNote() {
		if (confirm('Are you sure you want to delete this note?')) {
	    notesStore.update(notes => {
        delete notes[selectedId];
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
</script>
<form on:submit|preventDefault={handleSubmit}>
	<div>
        <Svelecte options = {sortedNotes} bind:value={selectedId} placeholder="Search a note...">
        </Svelecte>
    	<button disabled={selectedId == null} on:click={editNote}>Edit</button>
		<button disabled={selectedId == null} on:click={deleteNote}>Delete</button>
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