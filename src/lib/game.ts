import type { GameModel } from '$lib/savedata';

import { gameModel, updateGameModel } from '$lib/store';
import { AUTOSAVE_INTERVAL, RESPAWN_COOLDOWN, TICK_INTERVAL, UPGRADES, VERSION } from '$lib/data';
import { DpcUpgrade, DpsUpgrade } from '$lib/upgrade';
import { UpgradeType } from '$lib/enums';

let gameModelInstance: GameModel;
gameModel.subscribe((m) => (gameModelInstance = m));

let lastTick = Date.now();
let lastAutosave = Date.now();

export function startGame() {
	console.log('game started');
	console.log('tick interval', TICK_INTERVAL);
	console.log('autosave interval', AUTOSAVE_INTERVAL);
	console.log('version', VERSION);

	// register upgrades
	UPGRADES.forEach((upgrade) => gameModelInstance.registerUpgrade(upgrade));

	// check that the user has at least level 1 in the lowest dpc upgrade
	let lowestDpcUpgrade = (UPGRADES as DpcUpgrade[])
		.filter((upgrade) => upgrade.type === UpgradeType.DPC)
		.sort((a, b) => a.dpc - b.dpc)[0];

	if (gameModelInstance.saveData.upgrades[lowestDpcUpgrade.id].level < 1) {
		gameModelInstance.saveData.upgrades[lowestDpcUpgrade.id].level = 1;
		console.log('set lowest dpc upgrade to level 1');
	}

	updateGameModel();

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
	if (gameModelInstance.saveData.zombie.health <= 0) {
		setTimeout(() => gameModelInstance.respawn(), RESPAWN_COOLDOWN);
	}

	// update experience and level up if necessary
	if (gameModelInstance.saveData.experience === gameModelInstance.saveData.maxExperience) {
		gameModelInstance.levelUp();
	}

	updateGameModel();
}
