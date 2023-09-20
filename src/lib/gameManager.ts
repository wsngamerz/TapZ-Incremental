import type { DpcUpgrade } from '$lib/upgrades/dpcUpgrade';
import type { DpsUpgrade } from '$lib/upgrades/dpsUpgrade';
import type { SaveData } from '$lib/savedata';

import { UpgradeManager } from '$lib/upgrades/upgradeManager';
import { load, save } from '$lib/save';
import { UpgradeType } from '$lib/upgrades/upgradeType';
import { ZOMBIE_HEALTH } from '$lib/data';

export class GameManager {
	public saveData: SaveData;
	public upgradeManager = new UpgradeManager(this);

	constructor() {
		this.saveData = load();
	}

	public getDpc(): number {
		return this.upgradeManager
			.getUpgradesByType(UpgradeType.DPC)
			.map((upgrade) => (upgrade as DpcUpgrade).getTotalDPC())
			.reduce((a, b) => a + b, 0);
	}

	public getDps(): number {
		return this.upgradeManager
			.getUpgradesByType(UpgradeType.DPS)
			.map((upgrade) => (upgrade as DpsUpgrade).getTotalDps())
			.reduce((a, b) => a + b, 0);
	}

	public click() {
		this.saveData.stats.clicks += 1;
	}

	public attack(): number {
		return this.damage(this.getDpc());
	}

	public damage(amount: number): number {
		if (this.saveData.zombie.health <= 0) return 0;

		const damageDealt = Math.min(this.saveData.zombie.health, amount);
		this.saveData.zombie.health -= damageDealt;
		this.saveData.stats.damageDealt += damageDealt;

		if (this.saveData.zombie.health <= 0) {
			this.saveData.zombie.health = 0;
			this.onKill();
		}

		return damageDealt;
	}

	public respawn() {
		this.saveData.zombie.health = this.saveData.zombie.maxHealth;
	}

	public onKill() {
		this.saveData.resources.brains += 1;
		this.saveData.experience += 1;
		this.saveData.stats.kills += 1;
	}

	public levelUp() {
		console.log('level up');
		this.saveData.experience = 0;
		this.saveData.maxExperience += 1;
		this.saveData.level += 1;
		this.saveData.zombie.maxHealth = ZOMBIE_HEALTH(this.saveData.level);

		this.saveGameData();
	}

	public sellBrains() {
		this.saveData.resources.money += this.saveData.resources.brains * 5;
		this.saveData.resources.brains = 0;

		this.saveGameData();
	}

	public spendMoney(amount: number): boolean {
		if (this.saveData.resources.money < amount) return false;

		this.saveData.resources.money -= amount;
		this.saveGameData();

		return true;
	}

	public saveGameData() {
		console.log('saving game data');
		save(this.saveData);
	}
}
