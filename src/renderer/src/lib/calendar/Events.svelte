<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { eventStore } from './CalendarStore';
    import type { Event } from '../../types/event';
    import DialogBox from '../global-components/DialogBox.svelte';
    import EditEventForm from './EditEventForm.svelte';
    import AddEventForm from './AddEventForm.svelte';
    import Svelecte from 'svelecte';
    import Button from "../global-components/Button.svelte";
    import addButtonFilePath from '../../images/white_plus_resized.png';
    import searchButtonPath from '../../images/search_icon.png';
    import { timeAscending } from "../helper-functions/timeAscending";
    import { clickOutside } from "../helper-functions/clickOutside";

    export let right = false;
    export let calendar = false;

    let showAddEventModal: boolean = false;
    let showEditEventModal: boolean = false;
    let addEventDialog: HTMLDialogElement;
    let editEventDialog: HTMLDialogElement;

    let searching: boolean = false;

    let selectedID: string | null = null;
    let event: Event = {
		name: '',
		eventType: '',
		startTime: '',
        endTime: '',
        id: '',
	};

    let dispatch = createEventDispatcher();

    $: sortedEvents = $eventStore.sort(timeAscending);

    $: {
		const found = $eventStore.find(event => event.id === selectedID);
		if (found) event = found;
	}

    function addEvent(e) {
        addEventDialog.close();
        eventStore.addEvent(e.detail);
    }

    function editEvent(e) {
        editEventDialog.close();
        eventStore.saveEvent(e.detail);
    }

    function deleteEvent() {
        searching = false;
			
        eventStore.deleteEvent(selectedID);
		selectedID = null;
    }

    function jumptoEvent() {
        searching = false;
        dispatch('jumptoEvent', {startTime: event.startTime});
    }

</script>

{#if !searching}
    <button class="search" on:click={() => (searching = true)}><img class="search-icon" src={searchButtonPath} alt="Search"/></button>
{/if}

{#if searching}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <section class:right use:clickOutside on:click_outside={() => (searching = false)}>
        <Svelecte options={sortedEvents} bind:value={selectedID} valueField="id" labelField="name" placeholder="Select (or search for) an event..." />

        {#if calendar}
            <Button type="primary" style="margin: 4px 2px; float: right;" disabled={selectedID === null} on:click={jumptoEvent}>Jump to Event</Button>
        {/if}

        <Button type="danger" style="margin: 4px 2px; float: right;" disabled={selectedID === null} on:click={deleteEvent}>Delete</Button>
        <Button type="primary" style="margin: 4px 2px; float: right;" disabled={selectedID === null} on:click={() => {showEditEventModal = true; searching = false;}}>Edit Event</Button>
    </section>
{/if}

<button class="add-event" on:click={() => (showAddEventModal = true)}><img class="white-plus" src={addButtonFilePath} alt="Add note"/></button>
<DialogBox bind:showModal={showAddEventModal} bind:dialog={addEventDialog}>
    <h2 slot="header" class="pop-up">Create New Event</h2>
    <AddEventForm slot="contents" on:addNewEvent={addEvent} />
</DialogBox>
<DialogBox bind:showModal={showEditEventModal} bind:dialog={editEventDialog}>
    <h2 slot="header" class="pop-up">Edit Event</h2>
    <EditEventForm slot="contents" bind:event on:editExistingEvent={editEvent} />
</DialogBox>

<style>
    .right {
        position: absolute; 
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

    .search {
        position: absolute; 
        right: 2em;
        border: none;
        height: 3rem;
        background: transparent;
    }

    .search-icon {
        height: 100%;
    }

    .search-icon:hover {
        opacity: 0.5;
    }
</style>