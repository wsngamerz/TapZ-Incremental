import type { DpsUpgrade } from '$lib/upgrades/dpsUpgrade';
import type { DpcUpgrade } from '$lib/upgrades/dpcUpgrade';

import { load, save } from '$lib/save';
import { ZOMBIE_HEALTH } from '$lib/data';
import { UpgradeType } from '$lib/upgrades/upgradeType';
import { UpgradeManager } from '$lib/upgrades/upgradeManager';

class Resources {
	public money: number = 0;
	public brains: number = 0;
}

class Zombie {
	public health: number = 10;
	public maxHealth: number = 10;
}

class Stats {
	public clicks: number = 0;
	public damageDealt: number = 0;
	public kills: number = 0;
}

class UpgradeRecord {
	public level: number = 0;

	// TODO: ability to add additional data to upgrades
}

export class SaveData {
	public resources: Resources = new Resources();
	public zombie: Zombie = new Zombie();
	public stats: Stats = new Stats();

	public upgrades: Record<string, UpgradeRecord> = {};

	public level: number = 1;
	public experience: number = 0;
	public maxExperience: number = 10;

	public savedAt: number = 0;
}

export class GameModel {
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
