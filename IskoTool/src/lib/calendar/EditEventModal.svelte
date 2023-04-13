<script lang="ts">
    import EventTypeDropdown from "./EventTypeDropdown.svelte";
	import type { Event } from "../../types/event";
    import { eventStore } from './CalendarStore';

	export let showEditEventModal: boolean;
	let dialog: HTMLDialogElement;
    export let event: Event = {
		name: '',
		eventType: '',
		startTime: '',
        endTime: '',
        id: '',
	};
	
	$: if (dialog && showEditEventModal) dialog.showModal();

	function handleSubmit() {
		// Close the modal for good
		dialog.close();
        console.log(event);
		// Forward the form data to all event listeners
        eventStore.saveEvent(event);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showEditEventModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>x</button>
		<h2 class="pop-up">Create New Event</h2>
		<form on:submit|preventDefault={handleSubmit}>
			<h3 class="pop-up">Event Name</h3>
			<input type="text" class="transparent-bg" bind:value={event.name}><br>
            <h3 class="pop-up">Event Type</h3>
            <EventTypeDropdown bind:select={event.eventType} />
			<h3 class="pop-up">Start Time</h3>
			<input type="datetime-local" bind:value={event.startTime}><br>
            <h3 class="pop-up">End Time</h3>
			<input type="datetime-local" bind:value={event.endTime}><br>
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
	.transparent-bg {
		background-color: transparent;
	}
</style>
