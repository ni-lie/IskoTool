import { writable } from 'svelte/store';
import { loadEvents, setEvents } from '../../types/LocalStorageAccess';
import type { Event } from '../../types/event';

const init: Event[] = loadEvents();
const { update, subscribe } = writable(init);

export const eventStore  = {
	subscribe,
	addEvent(event: Event) {
		update(events => {
			events.push({...event});

            setEvents(events);
			return events;
		});
    },
    saveEvent(eventEd: Event) {
        update(events => {
            let editIdx = events.findIndex(event => event.id == eventEd.id);
            events[editIdx].name = eventEd.name;
            events[editIdx].eventType = eventEd.eventType;
            events[editIdx].startTime = eventEd.startTime;
            events[editIdx].endTime = eventEd.endTime;

            setEvents(events);
            return events;
        });
    },
    deleteEvent(id: string) {
        update(events => {
            events = events.filter(event => event.id != id);

            setEvents(events);
            return events;
        });
    }
};