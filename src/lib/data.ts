import type { Upgrade } from '$lib/upgrades/upgrade';
import { CurrencyIcon, GrabIcon, SwordIcon, SwordsIcon, UtensilsIcon } from 'lucide-svelte';
import { DpcUpgrade } from '$lib/upgrades/dpcUpgrade';
import { DpsUpgrade } from '$lib/upgrades/dpsUpgrade';

export const VERSION = 'v2.0.0 ALPHA 5';
export const TICK_INTERVAL = 1000 / 5;
export const AUTOSAVE_INTERVAL = 1000 * 60;
export const RESPAWN_COOLDOWN = 1000 / 4;
export const SAVEDATA_KEY = 'tapz-saveData';

export const ZOMBIE_HEALTH = (level: number) => Math.floor(10 * Math.pow(1.5, level - 1));

export const UPGRADES: Upgrade[] = [
	new DpcUpgrade('fist', 'Fist', GrabIcon, '+1 dmg/click', 10, 1.1, 1),
	new DpcUpgrade('kitchenSet', 'Kitchen Set', UtensilsIcon, '+3 dmg/click', 50, 1.1, 3),
	new DpcUpgrade('spicySword', 'Spicy Sword', SwordIcon, '+7 dmg/click', 100, 1.1, 5),

	new DpsUpgrade('malitia', 'Malitia', SwordsIcon, '+2 dmg/s', 50, 1.1, 2),
	new DpsUpgrade('turret', 'Turret', CurrencyIcon, '+5 dmg/s', 100, 1.1, 5)
];
