import { updateGameManager } from '$lib/store';
import { Upgrade } from '$lib/upgrades/upgrade';
import { UpgradeType } from '$lib/upgrades/upgradeType';

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
			this.gameManager.damage(flooredCount);
			this._internalCount -= flooredCount;
		}

		updateGameManager();
	}

	public getTotalDps(): number {
		return this.getCount() * this.dps;
	}

	initialised(): void {}
}
