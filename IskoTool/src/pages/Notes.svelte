<script lang="ts">
	import Count from '../lib/notes/Count.svelte';
	import { notesStore } from '../lib/notes/stores';
    import Svelecte from 'svelecte';
	import { onMount } from 'svelte';
    import type { Note } from '../types/note';
	
	let editing = false;
	let selectedId: number | null = null;
	let textInput: HTMLTextAreaElement | null = null;
	let titleInput: HTMLInputElement | null = null;
	// !! NOTE -- adding the .sort() method breaks the delete function. Must find workaround in the future.
	// let sortedNotes: Note[];

	let note: Note = {
		id: $notesStore.length,
		title: '',
		text: '',
	};

	$: {
		const found = $notesStore.find(note => note.id === selectedId);
		if (found) note = found;
	}

	onMount(() => {
		const preloaded: string = localStorage.getItem('userNotes');
		if (preloaded) {
			$notesStore.push(...JSON.parse(preloaded));
			$notesStore = $notesStore;
		}
	});

	function deleteNote() {
		if (confirm('Are you sure you want to delete this note?')) {
			notesStore.deleteNote(selectedId);
			localStorage.setItem("userNotes", JSON.stringify($notesStore));
			selectedId = null;
			note.title = '';
			note.text = '';
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
		editing = true;

		note = {
			id: $notesStore.length,
			title: 'Untitled',
			text: '',
		};

		notesStore.addNote(note.title, note.text);
		selectedId = note.id;

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
	<div>
        <Svelecte options={$notesStore} bind:value={selectedId} valueField="id" labelField="title" placeholder="Search a note..."></Svelecte>
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