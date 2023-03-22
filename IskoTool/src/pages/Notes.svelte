<script>
	import Count from '../lib/notes/Count.svelte';
	import {addNote, notesStore} from '../lib/notes/stores';
    import Svelecte from 'svelecte'; 		        // run 'npm install svelecte --save'
	
	const NEW_NOTE = {title: '', text: ''};
	
	let editing = false;
	let note;
	let selectedId;
	let textInput;
	let titleInput;
	
	$: console.log('note =', note);
	$: console.log('editing =', editing);
	
	$: sortedNotes = Object.values($notesStore).sort();
	$: note = $notesStore[selectedId] || NEW_NOTE;
	
	function deleteNote() {
		if (confirm('Are you sure you want to delete this note?')) {
	    notesStore.update(notes => {
        delete notes[note.id];
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
		selectedId = addNote('', '');
		editing = true;
		titleInput.focus();
	}
</script>
<form on:submit|preventDefault={handleSubmit}>
	<div>
	  <select bind:value={selectedId}>
			<option>Select note</option>
	    {#each sortedNotes as note}
  		  <option value={note.id}>{note.title}</option>
	    {/each}
	  </select>
    <button disabled={!note.id} on:click={editNote}>Edit</button>
		<button disabled={!note.id} on:click={deleteNote}>Delete</button>
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