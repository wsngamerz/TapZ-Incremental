import type { PlayerUpgradeItem } from '$lib/upgrades/playerUpgradeItem';

import { Upgrade } from '$lib/upgrades/upgrade';
import { UpgradeType } from '$lib/upgrades/upgradeType';

export class PlayerUpgrade extends Upgrade {
	public dpc: number;
	public items: PlayerUpgradeItem[] = [];

	constructor(
		id: string,
		name: string,
		icon: any,
		description: string,
		cost: number,
		costMultiplier: number,
		dpc: number,
		items: PlayerUpgradeItem[]
	) {
		super(id, name, UpgradeType.DPC, icon, description, cost, costMultiplier);
		this.dpc = dpc;
		this.items = items;
	}

	initialised(): void {
		this.items.forEach((item) => {
			item.gameManager = this.gameManager;
		});
	}

	getBaseDpc(): number {
		let baseDpc = this.dpc;

		// each item has a method that returns an updated dpc
		this.items.forEach((item) => {
			if (this.gameManager.saveData.upgrades.player.enhancements[item.id]) {
				baseDpc = item.dpcFunction(baseDpc);
			}
		});

		return baseDpc;
	}

	getDpc(): number {
		return this.getBaseDpc() * this.getCount();
	}
}
