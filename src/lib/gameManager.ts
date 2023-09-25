import type { DpsUpgrade } from '$lib/upgrades/dpsUpgrade';

import AchievementManager from '$lib/achievements/achievementManager';
import { SaveData } from '$lib/savedata';
import { UpgradeManager } from '$lib/upgrades/upgradeManager';
import { UpgradeType } from '$lib/upgrades/upgradeType';
import { KILL_EXPERIENCE, MAX_EXPERIENCE, ZOMBIE_HEALTH } from '$lib/data';
import type { PlayerUpgrade } from '$lib/upgrades/playerUpgrade';

export class GameManager {
	public saveData: SaveData;
	public upgradeManager = new UpgradeManager(this);
	public achievementManager = new AchievementManager(this);

	constructor() {
		this.saveData = SaveData.load();
	}

	public getDpc(): number {
		return (this.upgradeManager.getUpgradeById('player') as PlayerUpgrade).getDpc();
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
		const dmg = this.damage(this.getDpc());
		if (dmg > 0) this.click();
		return dmg;
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
		this.saveData.experience += KILL_EXPERIENCE(this.saveData.level);
		this.saveData.stats.kills += 1;
	}

	public levelUp() {
		console.log('level up');
		this.saveData.experience = 0;
		this.saveData.level += 1;
		this.saveData.maxExperience += MAX_EXPERIENCE(this.saveData.level);
		this.saveData.zombie.maxHealth = ZOMBIE_HEALTH(this.saveData.level);

		this.save();
	}

	public sellBrains() {
		this.saveData.resources.money += this.saveData.resources.brains * 5;
		this.saveData.resources.brains = 0;

		this.save();
	}

	public spendMoney(amount: number): boolean {
		if (this.saveData.resources.money < amount) return false;

		this.saveData.resources.money -= amount;
		this.save();

		return true;
	}

	public save() {
		SaveData.save(this.saveData);
	}
}
