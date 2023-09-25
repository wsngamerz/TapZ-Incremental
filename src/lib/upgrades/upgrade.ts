import { updateGameManager } from '$lib/store';
import type GameManager from '$lib/gameManager';
import type { UpgradeType } from '$lib/upgrades/upgradeType';

export abstract class Upgrade {
	public id: string;
	public name: string;
	public icon: any;
	public description: string;
	public cost: number;
	public costMultiplier: number;
	public type: UpgradeType;

	private _gameManager: GameManager | undefined;

	protected constructor(
		id: string,
		name: string,
		type: UpgradeType,
		icon: any,
		description: string,
		cost: number,
		costMultiplier: number
	) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.icon = icon;
		this.description = description;
		this.cost = cost;
		this.costMultiplier = costMultiplier;
	}

	abstract initialised(): void;

	get gameManager(): GameManager {
		if (!this._gameManager) throw new Error('GameManager is not set');

		return this._gameManager;
	}

	set gameManager(value: GameManager) {
		this._gameManager = value;

		// create the upgrade data if it doesn't exist
		if (!this.gameManager.saveData.upgrades[this.id]) {
			this.gameManager.saveData.upgrades[this.id] = {
				level: 0,
				enhancements: {}
			};
		}

		if (this.initialised) this.initialised();
	}

	public getCount(): number {
		return this.gameManager.saveData.upgrades[this.id]?.level || 0;
	}

	public getCost(): number {
		return Math.floor(this.cost * Math.pow(this.costMultiplier, this.getCount()));
	}

	public buy(): boolean {
		if (this.gameManager.spendMoney(this.getCost())) {
			this.gameManager.saveData.upgrades[this.id].level += 1;
			return true;
		}

		updateGameManager();
		return false;
	}
}
