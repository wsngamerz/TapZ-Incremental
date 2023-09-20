import { updateGameModel } from '$lib/store';
import type { GameModel } from '$lib/savedata';
import { UpgradeType } from '$lib/enums';

export abstract class Upgrade {
	public id: string;
	public name: string;
	public icon: any;
	public description: string;
	public cost: number;
	public costMultiplier: number;
	public type: UpgradeType;

	private _gameModel: GameModel | undefined;

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

	get gameModel(): GameModel {
		if (!this._gameModel) throw new Error('GameModel is not set');

		return this._gameModel;
	}

	set gameModel(value: GameModel) {
		this._gameModel = value;

		// create the upgrade data if it doesn't exist
		if (!this.gameModel.saveData.upgrades[this.id]) {
			this.gameModel.saveData.upgrades[this.id] = {
				level: 0
			};
		}
	}

	public getCount(): number {
		return this.gameModel.saveData.upgrades[this.id]?.level || 0;
	}

	public getCost(): number {
		return Math.floor(this.cost * Math.pow(this.costMultiplier, this.getCount()));
	}

	public buy(): boolean {
		if (this.gameModel.spendMoney(this.getCost())) {
			this.gameModel.saveData.upgrades[this.id].level += 1;
			return true;
		}

		updateGameModel();
		return false;
	}
}

export class DpcUpgrade extends Upgrade {
	public dpc: number;

	constructor(
		id: string,
		name: string,
		icon: any,
		description: string,
		cost: number,
		costMultiplier: number,
		dpc: number
	) {
		super(id, name, UpgradeType.DPC, icon, description, cost, costMultiplier);
		this.dpc = dpc;
	}

	public getTotalDPC(): number {
		return this.getCount() * this.dpc;
	}
}

export class DpsUpgrade extends Upgrade {
	public dps: number;

	private _internalCount: number = 0;

	constructor(
		id: string,
		name: string,
		icon: any,
		description: string,
		cost: number,
		costMultiplier: number,
		dps: number
	) {
		super(id, name, UpgradeType.DPS, icon, description, cost, costMultiplier);
		this.dps = dps;
	}

	public update(deltaT: number) {
		const count = this.getCount();
		if (count === 0) return;

		this._internalCount += count * this.dps * deltaT;
		if (this._internalCount >= 1) {
			const flooredCount = Math.floor(this._internalCount);
			this.gameModel.damage(flooredCount);
			this._internalCount -= flooredCount;
		}

		updateGameModel();
	}

	public getTotalDps(): number {
		return this.getCount() * this.dps;
	}
}
