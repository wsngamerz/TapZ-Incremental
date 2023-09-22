import type { GameManager } from '$lib/gameManager';
import { updateGameManager } from '$lib/store';

export class PlayerUpgradeItem {
	public id: string;
	public name: string;
	public icon: any;
	public description: string;
	public cost: number;
	public dpcFunction: (dpc: number) => number = (dpc: number) => dpc;

	private _gameManager: GameManager | undefined;

	constructor(
		id: string,
		name: string,
		icon: any,
		description: string,
		cost: number,
		dpcFunction: (dpc: number) => number
	) {
		this.id = id;
		this.name = name;
		this.icon = icon;
		this.description = description;
		this.cost = cost;
		this.dpcFunction = dpcFunction;
	}

	get gameManager(): GameManager {
		if (!this._gameManager) throw new Error('GameManager is not set');

		return this._gameManager;
	}

	set gameManager(value: GameManager) {
		this._gameManager = value;

		// create the upgrade data if it doesn't exist
		if (!this.gameManager.saveData.upgrades.player.enhancements[this.id]) {
			this.gameManager.saveData.upgrades.player.enhancements[this.id] = false;
		}
	}

	public has(): boolean {
		return this.gameManager.saveData.upgrades.player.enhancements[this.id];
	}

	public buy(): boolean {
		if (this.has()) return false;

		if (this.gameManager.spendMoney(this.cost)) {
			this.gameManager.saveData.upgrades.player.enhancements[this.id] = true;
			return true;
		}

		updateGameManager();
		return false;
	}
}
