import type Achievement from '$lib/achievements/achievement';
import type GameManager from '$lib/gameManager';

export default class AchievementManager {
	private achievements: Achievement[] = [];
	private readonly gameManager: GameManager;

	constructor(gameManager: GameManager) {
		this.gameManager = gameManager;
	}

	public registerAchievement(achievement: Achievement) {
		achievement.gameManager = this.gameManager;
		this.achievements.push(achievement);
	}

	public getAchievement(id: string) {
		return this.achievements.find((a) => a.id === id);
	}

	public getAchievements() {
		return this.achievements;
	}
}
