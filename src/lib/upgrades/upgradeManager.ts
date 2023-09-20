import type { Upgrade } from '$lib/upgrades/upgrade';
import { UpgradeType } from '$lib/upgrades/upgradeType';
import type { GameModel } from '$lib/savedata';
import type { DpsUpgrade } from '$lib/upgrades/dpsUpgrade';

export class UpgradeManager {
	private upgrades: Upgrade[] = [];
	private readonly gameManager: GameModel;

	constructor(gameManager: GameModel) {
		this.gameManager = gameManager;
	}

	public registerUpgrade(upgrade: Upgrade) {
		upgrade.gameModel = this.gameManager;
		this.upgrades.push(upgrade);
	}

	public update(deltaT: number) {
		this.getUpgradesByType(UpgradeType.DPS).forEach((upgrade) =>
			(upgrade as DpsUpgrade).update(deltaT)
		);
	}

	public getUpgradeById(id: string): Upgrade | undefined {
		return this.upgrades.find((upgrade) => upgrade.id === id);
	}

	public getUpgradesByType(type: UpgradeType | null = null): Upgrade[] {
		if (type === null) return this.upgrades;
		return this.upgrades.filter((upgrade) => upgrade.type === type);
	}
}
