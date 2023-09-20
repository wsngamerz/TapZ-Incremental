import { Upgrade } from '$lib/upgrades/upgrade';
import { UpgradeType } from '$lib/upgrades/upgradeType';

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
