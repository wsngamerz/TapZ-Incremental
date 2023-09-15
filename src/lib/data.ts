import { DpsUpgrade } from '$lib/upgrade';
import { CurrencyIcon, SwordsIcon } from 'lucide-svelte';

export const VERSION = 'v2.0.0 ALPHA 3';
export const TICK_INTERVAL = 1000 / 5;
export const AUTOSAVE_INTERVAL = 1000 * 60;
export const RESPAWN_COOLDOWN = 1000 / 4;

export const DPS_UPGRADES: DpsUpgrade[] = [
	new DpsUpgrade('malitia', 'Malitia', SwordsIcon, '+2 dmg/s', 50, 1.1, 2),
	new DpsUpgrade('turret', 'Turret', CurrencyIcon, '+5 dmg/s', 100, 1.1, 5)
];
