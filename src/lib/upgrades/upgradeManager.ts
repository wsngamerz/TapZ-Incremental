import type { Upgrade } from '$lib/upgrades/upgrade';
import { UpgradeType } from '$lib/upgrades/upgradeType';
import type { DpsUpgrade } from '$lib/upgrades/dpsUpgrade';
import type { GameManager } from '$lib/gameManager';

export class UpgradeManager {
	private upgrades: Upgrade[] = [];
	private readonly gameManager: GameManager;

	constructor(gameManager: GameManager) {
		this.gameManager = gameManager;
	}

	public registerUpgrade(upgrade: Upgrade) {
		upgrade.gameManager = this.gameManager;
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
