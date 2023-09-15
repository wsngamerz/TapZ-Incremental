import { gameModel, updateGameModel } from '$lib/store';
import type { GameModel } from '$lib/savedata';

let gameModelInstance: GameModel;
gameModel.subscribe((m) => (gameModelInstance = m));

abstract class Upgrade {
	public id: string;
	public name: string;
	public icon: any;
	public description: string;
	public cost: number;
	public costMultiplier: number;

	protected constructor(
		id: string,
		name: string,
		icon: any,
		description: string,
		cost: number,
		costMultiplier: number
	) {
		this.id = id;
		this.name = name;
		this.icon = icon;
		this.description = description;
		this.cost = cost;
		this.costMultiplier = costMultiplier;
	}

	private _ensureDataExists() {
		if (!gameModelInstance.saveData.upgrades[this.id]) {
			gameModelInstance.saveData.upgrades[this.id] = {
				level: 0
			};
		}
	}

	public getCount(): number {
		this._ensureDataExists();
		return gameModelInstance.saveData.upgrades[this.id]?.level || 0;
	}

	public getCost(): number {
		return Math.floor(this.cost * Math.pow(this.costMultiplier, this.getCount()));
	}

	public buy(): boolean {
		if (gameModelInstance.spendMoney(this.getCost())) {
			this._ensureDataExists();
			gameModelInstance.saveData.upgrades[this.id].level += 1;
			return true;
		}

		updateGameModel();
		return false;
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
		super(id, name, icon, description, cost, costMultiplier);
		this.dps = dps;
	}

	public update(deltaT: number) {
		const count = this.getCount();
		if (count === 0) return;

		this._internalCount += count * this.dps * deltaT;
		if (this._internalCount >= 1) {
			const flooredCount = Math.floor(this._internalCount);
			gameModelInstance.damage(flooredCount);
			this._internalCount -= flooredCount;
		}

		updateGameModel();
	}

	public getTotalDps(): number {
		return this.getCount() * this.dps;
	}
}
