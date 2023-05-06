<script lang="ts">
	import { createEventDispatcher } from "svelte";
    import MonthDropdown from "./MonthDropdown.svelte";

	export let showGoToDateModal: boolean;
    export let gotoMonth: number;
    export let gotoYear: number;
    
	let dialog: HTMLDialogElement;
	let dispatch = createEventDispatcher();
	
	$: if (dialog && showGoToDateModal) dialog.showModal();

	function handleSubmit() {
		// Close the modal for good
		dialog.close();
		// Forward the form data to all event listeners
        dispatch('gotoDate');
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showGoToDateModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>x</button>
		<h2 class="pop-up">Go To...</h2>
		<form on:submit|preventDefault={handleSubmit}>
			<h3 class="pop-up">Month</h3>
			<MonthDropdown bind:month={gotoMonth} />
			<h3 class="pop-up">Year</h3>
			<input type="number" min=0 max=9999 bind:value={gotoYear}><br>
			<input type="submit" value="Go">
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
	.transparent-bg {
		background-color: transparent;
	}
</style>
