import { writable } from 'svelte/store';
import { load } from '$lib/save';

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

export class SaveData {
	public resources: Resources = new Resources();
	public zombie: Zombie = new Zombie();
	public stats: Stats = new Stats();

	public attack: number = 1;
	// TODO: Add generators and upgrades

	public level: number = 1;
	public experience: number = 0;
	public maxExperience: number = 10;

	public savedAt: number = 0;
}

export class GameModel {
	public saveData: SaveData;

	constructor() {
		this.saveData = load();
	}

	public click() {
		this.saveData.stats.clicks += 1;
	}

	public attack(): number {
		if (this.saveData.zombie.health <= 0) return 0;

		this.saveData.zombie.health -= this.saveData.attack;
		this.saveData.stats.damageDealt += this.saveData.attack;

		if (this.saveData.zombie.health <= 0) {
			this.saveData.zombie.health = 0;
			this.onKill();
		}

		return this.saveData.attack;
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
	}

	public sellBrains() {
		this.saveData.resources.money += this.saveData.resources.brains * 5;
		this.saveData.resources.brains = 0;
	}
}

export const gameModel = writable(new GameModel());

export function updateGameModel() {
	gameModel.update((m) => (m = m));
}
