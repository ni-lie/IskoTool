import {writable} from 'svelte/store';

let lastId = 0;

// Keys are ids and values are objects with id, title, and text properties.
export const notesStore = writable({});

export function addNote(title, text) {
	lastId++;
  const note = {id: lastId, title, text};
	notesStore.update(notes => {
		notes[lastId] = note;
		return notes;
	});
	return lastId;
}

addNote('Note1', 'JS is cool!');
addNote('Note2', 'Svelte is elegant and minimal.');
addNote('Note3', 'Svelecte is nice.');
addNote('Note4', 'CS 192 is <3.');
addNote('Note5', 'I love UP');
addNote('Note6', 'UP Naming Mahal');
addNote('Note7', '\'Salamat UP\' but read it backwards');

