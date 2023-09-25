import { writable } from 'svelte/store';
import GameManager from '$lib/gameManager';

export const gameManager = writable(new GameManager());

export function updateGameManager() {
	gameManager.update((m) => (m = m));
}
