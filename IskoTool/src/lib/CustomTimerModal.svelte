<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import type { CustomMode } from '../types/event';

	export let showModal: boolean;
	let dialog: HTMLDialogElement;

	let dispatch = createEventDispatcher();
    let name = "Custom Mode";
    let minutes = 0;
    let seconds = 0;
	
	$: if (dialog && showModal) dialog.showModal();

	function handleSubmit() {
		// Close the modal for good
		dialog.close();

		// Forward the form data to all event listeners
        dispatch('addCustomMode', {
			name,
			minutes,
			seconds,
			id: crypto.randomUUID(),
		} satisfies CustomMode);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>x</button>
		<h2 class="time-prompt">Create Custom Timer</h2>
		<form on:submit|preventDefault={handleSubmit}>
			<h3 class="time-prompt">Mode Name</h3>
			<input type="text" bind:value={name}><br>
			<h3 class="time-prompt">Timer Duration</h3>
			<input type="number" min=0 max=59 bind:value={minutes}>
			<input type="number" min=0 max=59 bind:value={seconds}><br>
			<input type="submit" value="Confirm" />
		</form>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
