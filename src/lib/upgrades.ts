import type { Upgrade } from '$lib/upgrades/upgrade';

import {
	CurrencyIcon,
	GrabIcon,
	PersonStandingIcon,
	SwordIcon,
	SwordsIcon,
	UtensilsIcon
} from 'lucide-svelte';

import { DpsUpgrade } from '$lib/upgrades/dpsUpgrade';
import { PlayerUpgrade } from '$lib/upgrades/playerUpgrade';
import { PlayerUpgradeItem } from '$lib/upgrades/playerUpgradeItem';

const PLAYER_UPGRADES: PlayerUpgradeItem[] = [
	new PlayerUpgradeItem(
		'gloves',
		'Boxing Gloves',
		GrabIcon,
		'+1 dmg/level',
		200,
		(dpc: number) => dpc + 1
	),
	new PlayerUpgradeItem(
		'utensils',
		'Kitchen Utensils',
		UtensilsIcon,
		'+3 dmg/level',
		500,
		(dpc: number) => dpc + 3
	),
	new PlayerUpgradeItem(
		'sword',
		'Spicy Sword',
		SwordIcon,
		'+4 dmg/level',
		2500,
		(dpc: number) => dpc + 5
	)
];

const UPGRADES: Upgrade[] = [
	new PlayerUpgrade(
		'player',
		'Player',
		PersonStandingIcon,
		'+1 dmg/click',
		10,
		1.5,
		1,
		PLAYER_UPGRADES
	),

	new DpsUpgrade('malitia', 'Malitia', SwordsIcon, '+2 dmg/s', 50, 1.5, 2),
	new DpsUpgrade('turret', 'Turret', CurrencyIcon, '+5 dmg/s', 100, 1.5, 5)
];

export default UPGRADES;
