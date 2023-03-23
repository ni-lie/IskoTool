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

    pinNote(id: number){
		update(notes => {
			let pinNote = notes[id];
			for(let i=id; i>0; i--){
				notes[i] = notes[i-1];
				notes[i].id = i
			}
			notes[0] = pinNote;
			notes[0].id=0;
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