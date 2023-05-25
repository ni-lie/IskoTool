import type { CustomMode } from '../../types/customtimer';
import type { Note } from '../../types/note';
import type { Event } from '../../types/event';

export function loadCustomModes(): CustomMode[] {
    const value = localStorage.getItem('pomodoroCustomModes');
    return value === null ? [] : JSON.parse(value);
}

export function setCustomModes(customModes: CustomMode[]) {
    localStorage.setItem('pomodoroCustomModes', JSON.stringify(customModes));
}

export function loadNotes(): Note[] {
    const value = localStorage.getItem('notes');
    return value === null ? [] : JSON.parse(value);
}

export function setNotes(notes: Note[]) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

export function loadEvents(): Event[] {
    const value = localStorage.getItem('events');
    return value === null ? [] : JSON.parse(value);
}

export function setEvents(events: Event[]) {
    localStorage.setItem('events', JSON.stringify(events));
}

export function loadToDo(): Event[] {
    const value = localStorage.getItem('todo-list');
    return value === null ? '' : JSON.parse(value);
}

export function setToDo(items) {
    localStorage.setItem('todo-list', JSON.stringify(items));
}