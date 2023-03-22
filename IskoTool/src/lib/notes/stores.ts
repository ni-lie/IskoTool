import { writable } from 'svelte/store';
import type { Note } from '../../types/note';

/** Notes are now stored in an array instead of a dictionary (more efficient lookup).*/  
export const notesStore = writable([] as Note[]);

export function addNote(title: string, text: string) {
	notesStore.update(notes => {
		const id = notes.length;
		notes.push({id, title, text});
		return notes;
	});
}

addNote('Note1', 'JS is cool!');
addNote('Note2', 'Svelte is elegant and minimal.');
addNote('Note3', 'Svelecte is nice.');
addNote('Note4', 'CS 192 is <3.');
addNote('Note5', 'I love UP');
addNote('Note6', 'UP Naming Mahal');
addNote('Note7', '\'Salamat UP\' but read it backwards');

