<script lang="ts">
	import Count from '../lib/notes/Count.svelte';
	import { notesStore } from '../lib/notes/stores';
	import type { Note } from '../types/note';
    import Svelecte from 'svelecte';
	
	const NEW_NOTE = {id: ($notesStore.length)+1, title: '', text: ''};
	
	let editing = false;
	let note: Note | null = null;
	let selectedId: number | null = null;
	let textInput: HTMLTextAreaElement | null = null;
	let titleInput: HTMLInputElement | null = null;
	let sortedNotes: Note[];
	
	// !! NOTE -- adding the .sort() method breaks the delete function. Must find workaround in the future.
	$: {
		sortedNotes = $notesStore;
		note = $notesStore[selectedId] || NEW_NOTE;
	}

	function deleteNote() {
		if (confirm('Are you sure you want to delete this note?')) {
			notesStore.deleteNote(selectedId);
			selectedId = null;
		}
	}
	
	function editNote() {
		textInput.focus();
		editing = true;
	}
	
	function handleSubmit() {
		notesStore.saveNote(note);
		localStorage.setItem("userNotes", JSON.stringify($notesStore));
	}

	function newNote() {
		selectedId = $notesStore.length;
		notesStore.addNote('', '');
		editing = true;
		titleInput.focus();
	}
</script>
	<div>
        <Svelecte options = {sortedNotes} bind:value={selectedId} placeholder="Search a note...">
        </Svelecte>
    	<button disabled={selectedId === null} on:click={editNote}>Edit</button>
		<button disabled={selectedId === null} on:click={deleteNote}>Delete</button>
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

	<form on:submit|preventDefault={handleSubmit}>
		<button disabled={!editing}>Save</button>
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