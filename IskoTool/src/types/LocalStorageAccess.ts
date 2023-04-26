import type { Note } from '../types/note';
import type { CustomMode } from './customtimer';

export function loadCustomModes(): CustomMode[] {
    const value = localStorage.getItem('pomodoroCustomModes');
    return value === null ? [] : JSON.parse(value);
}

export function setCustomModes(customModes: CustomMode[]) {
    localStorage.setItem('pomodoroCustomModes', JSON.stringify(customModes));
}

export function loadNotes(): Note[] {
    const value = localStorage.getItem('userNotes');
    return value === null ? [] : JSON.parse(value);
}

export function setNotes(notes: Note[]) {
    localStorage.setItem('userNotes', JSON.stringify(notes));
}