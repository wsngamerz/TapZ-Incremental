import type { GameModel } from '$lib/store';
import { gameModel, updateGameModel } from '$lib/store';
import { save } from '$lib/save';

let gameModelInstance: GameModel;
gameModel.subscribe((m) => (gameModelInstance = m));

export const VERSION = 'v1.0.0 ALPHA 2';

const tickInterval = 1000 / 5;
const autosaveInterval = 1000 * 60;
const respawnCooldownTicks = 2;

let lastTick = Date.now();
let lastAutosave = Date.now();
let lastKillTicks: number | null = null;

let gameLoopInterval;

export function startGame() {
	gameLoopInterval = setInterval(tick, tickInterval);
}

function tick() {
	console.log('tick');
	const currentTime = Date.now();

	if (currentTime - lastAutosave >= autosaveInterval) {
		lastAutosave = currentTime;

		console.log('autosave');
		save(gameModelInstance.saveData);
	}

	let deltaT = Math.max(Math.min((currentTime - lastTick) / 1000, 1), 0);
	lastTick = currentTime;

	// update all generators using deltaT
	// gameModelInstance.generators.forEach((generator) => generator.update(deltaT)); etc....

	// respawn enemies
	if (lastKillTicks == null && gameModelInstance.saveData.health <= 0) {
		lastKillTicks = 0;
	} else if (lastKillTicks !== null && lastKillTicks >= respawnCooldownTicks) {
		lastKillTicks = null;
		gameModelInstance.respawn();
	} else if (lastKillTicks !== null) {
		lastKillTicks++;
	}

	updateGameModel();
}
