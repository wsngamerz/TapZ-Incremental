import { MAX_EXPERIENCE, SAVEDATA_KEY, ZOMBIE_HEALTH } from '$lib/data';

class Resources {
	public money: number = 0;
	public brains: number = 0;
}

class Zombie {
	public health: number = 10;
	public maxHealth: number = ZOMBIE_HEALTH(1);
}

class Stats {
	public clicks: number = 0;
	public damageDealt: number = 0;
	public kills: number = 0;
}

class UpgradeRecord {
	public level: number = 0;
	public enhancements: Record<string, boolean> = {};
}

export class SaveData {
	public resources: Resources = new Resources();
	public zombie: Zombie = new Zombie();
	public stats: Stats = new Stats();

	public upgrades: Record<string, UpgradeRecord> = {};

	public level: number = 1;
	public experience: number = 0;
	public maxExperience: number = MAX_EXPERIENCE(1);

	public savedAt: number = 0;

	public static save(data: SaveData) {
		console.log('Saving data');
		data.savedAt = Date.now();

		try {
			localStorage.setItem(SAVEDATA_KEY, JSON.stringify(data));
		} catch (error) {
			console.error('Error saving data', error);
		}
	}

	private static migrate(data: SaveData): SaveData {
		const blank = new SaveData();

		Object.getOwnPropertyNames(blank).forEach((prop) => {
			// @ts-ignore
			if (typeof data[prop] === 'undefined') {
				console.log(`${prop} was undefined, adding it to saveData`);
				// @ts-ignore
				data[prop] = blank[prop];
			}
		});

		return data;
	}

	public static load(): SaveData {
		try {
			// If there is no save data, return a new SaveData object
			if (localStorage.getItem(SAVEDATA_KEY) === null) return new SaveData();

			// Otherwise, parse the save data and return it
			const data = localStorage.getItem(SAVEDATA_KEY);
			return this.migrate(JSON.parse(<string>data));
		} catch (error) {
			console.error('Error loading data', error);
			return new SaveData();
		}
	}
}
