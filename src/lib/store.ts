import { writable } from 'svelte/store';
import { load } from '$lib/save';

export class SaveData {
	public money: number = 0;
	public brains: number = 0;

	public health: number = 10;
	public maxHealth: number = 10;

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

	public attack(): number {
		if (this.saveData.health <= 0) return 0;

		this.saveData.health -= this.saveData.attack;

		if (this.saveData.health <= 0) {
			this.saveData.health = 0;
			this.onKill();
		}

		return this.saveData.attack;
	}

	public respawn() {
		this.saveData.health = this.saveData.maxHealth;
	}

	public onKill() {
		this.saveData.brains += 1;
		this.saveData.experience += 1;
	}

	public levelUp() {
		console.log('level up');
		this.saveData.experience = 0;
		this.saveData.maxExperience += 1;
		this.saveData.level += 1;
	}
}

export const gameModel = writable(new GameModel());

export function updateGameModel() {
	gameModel.update((m) => (m = m));
}
