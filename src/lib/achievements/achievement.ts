import type { GameManager } from '$lib/gameManager';
import { getReflected } from '$lib/utils';

export default class Achievement {
	public id: string;
	public name: string;
	public icon: any;
	public description: string;
	public metric: string;
	public target: number;

	private _gameManager: GameManager | undefined;

	constructor(
		id: string,
		name: string,
		icon: any,
		description: string,
		metric: string,
		target: number
	) {
		this.id = id;
		this.name = name;
		this.icon = icon;
		this.description = description;
		this.metric = metric;
		this.target = target;
	}

	get gameManager(): GameManager {
		if (!this._gameManager) throw new Error('GameManager is not set');

		return this._gameManager;
	}

	set gameManager(value: GameManager) {
		this._gameManager = value;
	}

	public calculateProgress(): number {
		const currentVal = getReflected<number>(this.gameManager.saveData, this.metric);
		return Math.round(Math.min(currentVal / this.target, 1) * 100);
	}
}
