import { writable } from 'svelte/store';

export const health = writable(10);
export const maxHealth = writable(10);
export const attack = writable(1);

export const level = writable(1);
export const experience = writable(0);
export const maxExperience = writable(10);

export const money = writable(0);
export const brains = writable(0);
