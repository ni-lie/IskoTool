import type { Note } from '../types/note';
import type { CustomMode } from './CustomTimerMode';

// export function saveToLocal(key: string, value: any[]) {
//     return localStorage.setItem(key, JSON.stringify(value));
// }

// export function loadFromLocal(key: string) {
//     return JSON.parse(localStorage.getItem(key));
// }

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