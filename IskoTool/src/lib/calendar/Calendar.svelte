<script lang="ts">
	import calendarize from 'calendarize';
	import { eventStore } from './CalendarStore';
	import Arrow from './Arrow.svelte';
	import EventsDropdown from './Events.svelte';
	import type { Event } from '../../types/event';

	export let today = new Date();
	export let year = today.getFullYear();
	export let month = today.getMonth(); 
	export let offset = 0; // Display Sunday as first day of the week

	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	export let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	$: today_month = today && today.getMonth();
	$: today_year = today && today.getFullYear();
	$: today_day = today && today.getDate();
	
	let prev = calendarize(new Date(year, month-1), offset);
	let current = calendarize(new Date(year, month), offset);
	let next = calendarize(new Date(year, month+1), offset);
	
	function displayEvent(events: Event[], day) {
		for (const e of events) {
			let [sYear, sMonth, sDay, sTime] = e.startTime.split(/-|T/);
			if (Number(sYear) == year && Number(sMonth) == month+1 && Number(sDay) == day) {
				return e.name;
			}
		}
		return '';
	}

	function toPrev() {
		[current, next] = [prev, current];
		
		if (--month < 0) {
			month = 11;
			year--;
		}
		
		prev = calendarize(new Date(year, month-1), offset);
	}
	
	function toNext() {
		[prev, current] = [current, next];
		
		if (++month > 11) {
			month = 0;
			year++;
		}
		
		next = calendarize(new Date(year, month+1), offset);
	}
	
	function isToday(day) {
		return today && today_year === year && today_month === month && today_day === day;
	}
</script>

<header>
	<Arrow left on:click={toPrev} />
	<h4>{months[month]} {year}</h4>
	<Arrow on:click={toNext} />
</header>

<div class="month">
	{#each labels as txt, idx (txt)}
		<span class="label">{ labels[(idx + offset) % 7] }</span>
	{/each}

	{#each { length:6 } as w,idxw (idxw)}
		{#if current[idxw]}
			{#each { length:7 } as d,idxd (idxd)}
				{#if current[idxw][idxd] != 0}
					<span class="date" class:today={isToday(current[idxw][idxd])}>
						{ current[idxw][idxd] }
						<div class="eventdisplay">
							{displayEvent($eventStore, current[idxw][idxd])}
						</div>
					</span>
				{:else if (idxw < 1)}
					<span class="date other">{ prev[prev.length - 1][idxd] }</span>
				{:else}
					<span class="date other">{ next[0][idxd] }</span>
				{/if}
			{/each}
		{/if}
	{/each}
</div>

<footer>
    <EventsDropdown />
</footer>

<style>
	header {
		display: flex;
		margin: 2rem auto;
		align-items: center;
		justify-content: center;
		user-select: none;
	}
	
	h4 {
		display: block;
		text-align: center;
		text-transform: uppercase;
		font-size: 140%;
		margin: 0 1rem;
	}
	
	.month {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: right;
		grid-gap: 4px;
	}
	
	.label {
		font-weight: 300;
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		opacity: 0.6;
	}
	
	.date {
		height: 50px;
		font-size: 16px;
		letter-spacing: -1px;
		border: 1px solid #e6e4e4;
		padding-right: 4px;
		font-weight: 700;
		padding: 0.5rem;
	}
	
	.date.today {
		color: #5286fa;
		background: #c4d9fd;
		border-color: currentColor;
	}
	
	.date.other {
		opacity: 0.2;
	}

	.eventdisplay {
		font-weight: 600;
		text-align: center;
		color: #1c8d76;
	}
</style>