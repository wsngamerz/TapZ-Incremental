import { writable } from 'svelte/store';
import { GameModel } from '$lib/savedata';

export const gameModel = writable(new GameModel());

export function updateGameModel() {
	gameModel.update((m) => (m = m));
}
