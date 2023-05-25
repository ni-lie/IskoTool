import { writable } from "svelte/store";

export const items = writable([
    {
        id: 1,
        text: "Do cs 145 labex",
        completed: false
    },
    {
        id: 2,
        text: "Do cs 155 labex",
        completed: true
    },
]);

