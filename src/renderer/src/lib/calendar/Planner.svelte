<script lang="ts">
	import { eventStore } from './CalendarStore';
	import EventsDropdown from './Events.svelte';
	import type { Event } from '../../types/event';
	import DialogBox from '../global-components/DialogBox.svelte';
	import EditEventForm from './EditEventForm.svelte';
	import timeDisplayOptions from '../calendar/Calendar.svelte'
	import { timeAscending } from './timeAscending';
	import { isInRange } from '../isInRange';

	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth();
	const weekday = today.getDay();
	const offset = 0; // Display Sunday as first day of the week

	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	export let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	$: today_month = today && today.getMonth();
	$: today_year = today && today.getFullYear();
	$: today_day = today && today.getDate();

	let viewEventDialog: HTMLDialogElement;
	let editEventDialog: HTMLDialogElement;

	// Populate the currentWeek array with dates relative to today's date.
	let currentWeek: Date[] = [];
	let day = today.getDate()-weekday-1;
	for (let i = 0; i < weekday; ++i) {
		currentWeek.push(new Date(today.setDate(day + 1)));
		day = today.getDate();
	}
	for (let i = weekday; i < 7; ++i) {
		let day = today.getDate();
		currentWeek.push(new Date(today.setDate(day + 1)));
	}

	function getEventsOnDay(events: Event[], currDate: Date) {
		let eventsOnDay: Event[] | null = [];

		const currYear = currDate.getFullYear();
		const currMth = currDate.getMonth()+1;
		const currDay = currDate.getDate();

		for (const e of events) {
			const start = new Date(e.startTime);
			const startYr = start.getFullYear();
			const startMth = start.getMonth()+1;
			const startDay = start.getDate();

			// Display an event over a span of multiple days
			if (e.endTime != undefined) {
				const end = new Date(e.endTime);
				const endYr = end.getFullYear();
				const endMth = end.getMonth()+1;
				const endDay = end.getDate();
				if (isInRange(currYear, startYr, endYr) && isInRange(currMth, startMth, endMth) && isInRange(currDay, startDay, endDay)) {
					eventsOnDay.push(e);
				}
			}
			// Display a one-day event
			else if (startYr == currYear && startMth == currMth && startDay == currDay) {
				eventsOnDay.push(e);
			}
		}
		eventsOnDay = eventsOnDay.sort(timeAscending);
		return eventsOnDay;
	}
	
	let showModal = false;
	let showEditEventModal: boolean = false;
	let eventToView: Event | null = null;

	function isToday(day) {
		return today && today_year === year && today_month === month && today_day === day;
	}

	function editEvent(e) {
		editEventDialog.close();
        eventStore.saveEvent(e.detail);
    }

    function deleteEvent() {
        if (confirm('Are you sure you want to delete this event?')) {
			eventStore.deleteEvent(eventToView.id);
			viewEventDialog.close();
		}
    }
</script>

<header>
	<h1>Week Planner</h1>
	<EventsDropdown right />
</header>

<!-- <div>
	<EventsDropdown />
</div> -->

<div class="week">
	{#each labels as txt, idx (txt)}
		<span class="label" class:today={idx==weekday}>{ labels[(idx + offset) % 7] }</span>
	{/each}

	{#each { length:7 } as d,idxd (idxd)}
		<span class="date" class:today={idxd==weekday}>
			{months[currentWeek[idxd].getMonth()]} {currentWeek[idxd].getDate()}
			<div class="eventdisplay" class:noevent={displayEvent($eventStore, currentWeek[idxd]) == null } on:keydown
				on:click={() => { 
					showModal = true;
					eventToView = displayEvent($eventStore, currentWeek[idxd]);
					}}>
				{ displayEvent($eventStore, currentWeek[idxd]) != null ? displayEvent($eventStore, currentWeek[idxd]).name : ''}
			</div>
		</span>
	{/each}
</div>

{#if eventToView !== null}
	<DialogBox bind:showModal bind:dialog={viewEventDialog}>
		<h2 slot="header" class="pop-up">Event details</h2>
		<div slot="contents">
			<p> Name: {eventToView.name} </p>
			<p> Event type: {eventToView.eventType} </p>
			<p> Start date: {months[new Date(eventToView.startTime).getMonth()]} {new Date(eventToView.startTime).getDate()}, {new Date(eventToView.startTime).getFullYear()}</p>
			{#if eventToView.endTime == null}
				<p> End date: {months[new Date(eventToView.startTime).getMonth()]} {new Date(eventToView.startTime).getDate()}, {new Date(eventToView.startTime).getFullYear()}</p>
			{:else}
				<p> End date: {months[new Date(eventToView.endTime).getMonth()]} {new Date(eventToView.endTime).getDate()}, {new Date(eventToView.endTime).getFullYear()}</p>
			{/if}
			<button style="position: relative; right: 30em;" on:click={() => (showEditEventModal = true)}>Edit</button>
			<DialogBox bind:showModal={showEditEventModal} bind:dialog={editEventDialog}>
				<h2 slot="header" class="pop-up">Edit Event</h2>
				<EditEventForm slot="contents" bind:event={eventToView} on:editExistingEvent={editEvent} />
			</DialogBox>
			<button style="position: relative; right: 2em;" on:click={deleteEvent}>Delete</button>
		</div>
		
	</DialogBox>
{/if}

<style>
	header {
		display: flex;
		margin: 2rem auto;
		align-items: center;
		justify-content: center;
		user-select: none;
	}
	
	h1 {
		display: block;
		text-align: center;
		font-size: 240%;
		margin: 0 1rem;
	}
	
	.week {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: center;
		grid-gap: 0px;
		margin-left: 3%;
		margin-right: 3%;
	}
	
	.label {
		font-weight: 500;
		font-size: 25px;
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		opacity: 0.6;
		color: #1C8D76;
	}
	
	.date {
		height: 400px;
		font-size: 16px;
		letter-spacing: -1px;
		padding-right: 4px;
		font-weight: 700;
		padding: 0.5rem;
		color: #1C8D76;
		border-top: 2px solid #A7D7CD;
		border-left: 0px;
		border-right: 0px;
		border-bottom: 0px;
	}

	.label.today {
		color: #DFA46D;
	}

	.eventdisplay {
		font-weight: 600;
		padding-top: 2em;
		text-align: center;
		color: #000000;
		user-select: none;
		border: outset 1px;
	}

	.eventdisplay.noevent{
		border: 0px;
	}

	.eventdisplay:hover {
		color: #6E7ED3;
	}
</style>