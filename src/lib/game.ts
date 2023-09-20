import type { DpcUpgrade } from '$lib/upgrades/dpcUpgrade';

import { gameManager, updateGameManager } from '$lib/store';
import { AUTOSAVE_INTERVAL, RESPAWN_COOLDOWN, TICK_INTERVAL, VERSION } from '$lib/data';
import { UpgradeType } from '$lib/upgrades/upgradeType';
import type { GameManager } from '$lib/gameManager';
import UPGRADES from '$lib/upgrades';

let gameManagerInstance: GameManager;
gameManager.subscribe((m) => (gameManagerInstance = m));

let lastTick = Date.now();
let lastAutosave = Date.now();
let startedRespawning = false;

export function startGame() {
	console.log('game started');
	console.log('tick interval', TICK_INTERVAL);
	console.log('autosave interval', AUTOSAVE_INTERVAL);
	console.log('version', VERSION);

	// register upgrades
	UPGRADES.forEach((upgrade) => gameManagerInstance.upgradeManager.registerUpgrade(upgrade));

	// check that the user has at least level 1 in the lowest dpc upgrade
	let lowestDpcUpgrade = (
		gameManagerInstance.upgradeManager.getUpgradesByType(UpgradeType.DPC) as DpcUpgrade[]
	).sort((a, b) => a.dpc - b.dpc)[0];

	if (gameManagerInstance.saveData.upgrades[lowestDpcUpgrade.id].level < 1) {
		gameManagerInstance.saveData.upgrades[lowestDpcUpgrade.id].level = 1;
		console.log('set lowest dpc upgrade to level 1');
	}

	updateGameManager();

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
		gameManagerInstance.save();
	}

	let deltaT = Math.max(Math.min((currentTime - lastTick) / 1000, 1), 0);
	lastTick = currentTime;

	// update all generators / dps using deltaT
	gameManagerInstance.upgradeManager.update(deltaT);

	// respawn enemies
	if (gameManagerInstance.saveData.zombie.health <= 0 && !startedRespawning) {
		startedRespawning = true;
		setTimeout(() => {
			gameManagerInstance.respawn();
			startedRespawning = false;
		}, RESPAWN_COOLDOWN);
	}

	// update experience and level up if necessary
	if (gameManagerInstance.saveData.experience >= gameManagerInstance.saveData.maxExperience) {
		gameManagerInstance.levelUp();
	}

	updateGameManager();
}
