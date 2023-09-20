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
