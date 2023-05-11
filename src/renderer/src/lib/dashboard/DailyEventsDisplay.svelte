<script lang="ts">
    import { eventStore } from "../calendar/CalendarStore";
    import type { Event } from "../../types/event";

    let dailyEvents: Event[] = [];
    let today = new Date();
    let today_day = today.getDate();
    let today_month = today.getMonth();
    let today_year = today.getFullYear();

    console.log("new:\n") // <-------- DELETE THIS -------->
    for (const event of $eventStore) {
        const start = new Date(event.startTime);
        const start_day = start.getDate();
        const start_month = start.getMonth();
        const start_year = start.getFullYear();

        if (today_day === start_day && today_month === start_month && today_year === start_year) {
            dailyEvents.push(event);
        }
    }

    function getEventTime(event: Event) {
        if (["Birthday", "Holiday"].includes(event.eventType)) {
            return null;
        }

        const eventStart = new Date(event.startTime);
        const eventEnd = new Date(event.endTime);
        let eventStartTime = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric'}).format(eventStart);
        let eventEndTime;

        // Show end time if the event ends on the same day
        if (today_day === eventEnd.getDate() && today_month === eventEnd.getMonth() && today_year === eventEnd.getFullYear()) {
            eventEndTime = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric'}).format(eventEnd);
        } else {
            eventEndTime = null;
        }

        return [eventStartTime, eventEndTime];
    }

    console.log(dailyEvents); // <-------- DELETE THIS -------->
</script>

<div class="display">
    <h2>Tasks for today</h2>

    <div class="events">
        {#each dailyEvents as event}
            <div class="event">
                <h3>{event.name}</h3>

                {#if getEventTime(event) != null}
                    <p class="time">
                        {getEventTime(event)[0]}

                        {#if getEventTime(event)[1] != null}
                            - {getEventTime(event)[1]}
                        {/if}
                    </p>
                {/if}

                <p class="event-type">{event.eventType}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .display {
        /* outline: 2px solid gray; */
		border-radius: 2px;
        height: 30rem;
        max-width: 50%;
        margin-left: 2em;
    }

    .events {
        height: 25em;
        overflow-y: auto;
    }

    .event {
        background-color: white;
        border-radius: 2px;
    }

    .event-type {
        font-size: 1em;
        font-weight: 300;
    }

    .time {
        position: relative;
        float: right;
        bottom: 3em;
    }
</style>