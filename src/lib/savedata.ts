import type { Upgrade } from '$lib/upgrade';
import type { DpsUpgrade } from '$lib/upgrade';

import { load, save } from '$lib/save';
import { UpgradeType } from '$lib/enums';

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

	public attack: number = 1;
	public upgrades: Record<string, UpgradeRecord> = {};

	public level: number = 1;
	public experience: number = 0;
	public maxExperience: number = 10;

	public savedAt: number = 0;
}

export class GameModel {
	public saveData: SaveData;

	public upgrades: Upgrade[] = [];

	constructor() {
		this.saveData = load();
	}

	public registerUpgrade(upgrade: Upgrade) {
		this.upgrades.push(upgrade);
	}

	public getDpc(): number {
		return this.saveData.attack;
	}

	public getDps(): number {
		return this.upgrades
			.map((upgrade) => {
				if (upgrade.type === UpgradeType.DPS) {
					return (upgrade as DpsUpgrade).getTotalDps();
				}

				return 0;
			})
			.reduce((a, b) => a + b, 0);
	}

	public click() {
		this.saveData.stats.clicks += 1;
	}

	public attack(): number {
		return this.damage(this.saveData.attack);
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
		this.saveData.zombie.maxHealth = Math.floor(10 + Math.pow(this.saveData.level, 1.5));
	}

	public sellBrains() {
		this.saveData.resources.money += this.saveData.resources.brains * 5;
		this.saveData.resources.brains = 0;
	}

	public spendMoney(amount: number): boolean {
		if (this.saveData.resources.money < amount) return false;

		this.saveData.resources.money -= amount;
		return true;
	}

	public saveGameData() {
		console.log('saving game data');
		save(this.saveData);
	}
}
