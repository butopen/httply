import {writable} from "svelte/store";


export const inputStore = writable(`
fetch("https://httply.com/example")
`)
