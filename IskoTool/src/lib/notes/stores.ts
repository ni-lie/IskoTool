import { writable } from 'svelte/store';
import type { Note } from '../../types/note';

/** Notes are now stored in an array instead of a dictionary (more efficient lookup).*/  
const { set, update, subscribe } = writable([] as Note[]);

export const notesStore  = {
	subscribe,
	set,
	addNote(title: string, text: string) {
		update(notes => {
			const id = notes.length;
			notes.push({id, title, text});
			return notes;
		});
    },
    saveNote(note: Note) {
        update(notes => {
            notes[note.id].title = note.title;
            notes[note.id].text = note.text;
            return notes;
        });
    },
    deleteNote(id: number) {
        update(notes => {
            let deleteIdx = notes.findIndex(note => note.id == id);
            delete notes[deleteIdx];
            notes = notes.filter(Boolean);
            return notes;
        });
    }
};

notesStore.addNote('Note1', 'JS is cool!');
notesStore.addNote('Note2', 'Svelte is elegant and minimal.');
notesStore.addNote('Note3', 'Svelecte is nice.');
notesStore.addNote('Note4', 'CS 192 is <3.');
notesStore.addNote('Note5', 'I love UP');
notesStore.addNote('Note6', 'UP Naming Mahal');
notesStore.addNote('Note7', '\'Salamat UP\' but read it backwards');