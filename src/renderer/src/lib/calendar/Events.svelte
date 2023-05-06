<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { eventStore } from './CalendarStore';
    import type { Event } from '../../types/event';
    import EditEventModal from './EditEventModal.svelte';
    import AddEventModal from './AddEventModal.svelte';
	import addButtonFilePath from '../../images/white_plus_resized.png';
    import Svelecte from 'svelecte';

    export let right = false;
    export let calendar = false;

    let showAddEventModal = false;
    let showEditEventModal = false;
    let selectedID: string | null = null;
    let event: Event = {
		name: '',
		eventType: '',
		startTime: '',
        endTime: '',
        id: '',
	};

    let dispatch = createEventDispatcher();

    $: {
		const found = $eventStore.find(event => event.id === selectedID);
		if (found) event = found;
	}

    function addEvent(e) {
        eventStore.addEvent(e.detail);
    }

    function editEvent(e) {
        eventStore.saveEvent(e.detail);
    }

    function deleteEvent() {
        if (confirm('Are you sure you want to delete this event?')) {
			eventStore.deleteEvent(selectedID);
			selectedID = null;
		}
    }

    function jumptoEvent() {
        dispatch('jumptoEvent', {startTime: event.startTime});
    }
</script>

<section class:right>
    <Svelecte options={$eventStore} bind:value={selectedID} valueField="id" labelField="name" placeholder="Select (or search for) an event..."></Svelecte>
    <button class="add-event" on:click={() => (showAddEventModal = true)}><img class="white-plus" src={addButtonFilePath} alt="Add note"/></button>
	<AddEventModal bind:showAddEventModal on:addNewEvent={addEvent} />
    <button class="fadedtext" disabled={selectedID === null} on:click={() => (showEditEventModal = true)}>Edit Event</button>
    <EditEventModal bind:showEditEventModal bind:event on:editExistingEvent={editEvent} />
    <button disabled={selectedID === null} on:click={deleteEvent}>Delete</button>
    {#if calendar}
        <button class="fadedtext" disabled={selectedID === null} on:click={jumptoEvent}>Jump to Event</button>
    {/if}
</section>

<style>
    section.right {
        position: fixed; 
        right: 2em;
    }

    .add-event {
        color: white;
        margin: auto;
        height: 4rem;
        width: 4rem;
        padding: 0.1em;
        border-radius: 50%;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: var(--orange-light);

        position: fixed;
        bottom: 2em;
        right: 2em;
        z-index: 5;

        transition: background 0.25s ease-in-out, border 0.25s ease-in-out;
    }

    .add-event:hover {
        background: var(--orange-faded);
        border-color: var(--orange-faded);
    }
    .white-plus {
        height: 50%;
    }
</style>