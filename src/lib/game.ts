import type { GameModel } from '$lib/savedata';

import { gameModel, updateGameModel } from '$lib/store';
import { AUTOSAVE_INTERVAL, UPGRADES, RESPAWN_COOLDOWN, TICK_INTERVAL, VERSION } from '$lib/data';
import { DpsUpgrade } from '$lib/upgrade';

let gameModelInstance: GameModel;
gameModel.subscribe((m) => (gameModelInstance = m));

let lastTick = Date.now();
let lastAutosave = Date.now();
let lastKill: number | null = null;

export function startGame() {
	console.log('game started');
	console.log('tick interval', TICK_INTERVAL);
	console.log('autosave interval', AUTOSAVE_INTERVAL);
	console.log('version', VERSION);

	// register upgrades
	UPGRADES.forEach((upgrade) => gameModelInstance.registerUpgrade(upgrade));

	(function loop() {
		tick();
		setTimeout(loop, TICK_INTERVAL);
	})();
}

function tick() {
	console.log('tick');
	const currentTime = Date.now();

	if (currentTime - lastAutosave >= AUTOSAVE_INTERVAL) {
		lastAutosave = currentTime;

		console.log('autosave');
		gameModelInstance.saveGameData();
	}

	let deltaT = Math.max(Math.min((currentTime - lastTick) / 1000, 1), 0);
	lastTick = currentTime;

	// update all generators / dps using deltaT
	UPGRADES.forEach((upgrade) => {
		if (upgrade instanceof DpsUpgrade) {
			upgrade.update(deltaT);
		}
	});

	// respawn enemies
	if (lastKill == null && gameModelInstance.saveData.zombie.health <= 0) {
		lastKill = Date.now();
	} else if (lastKill !== null && currentTime - lastKill >= RESPAWN_COOLDOWN) {
		lastKill = null;
		gameModelInstance.respawn();
	}

	// update experience and level up if necessary
	if (gameModelInstance.saveData.experience === gameModelInstance.saveData.maxExperience) {
		gameModelInstance.levelUp();
	}

	updateGameModel();
}
