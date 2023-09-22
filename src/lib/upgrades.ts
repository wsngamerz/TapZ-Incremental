import type { Upgrade } from '$lib/upgrades/upgrade';

import {
	ChevronsUpIcon,
	CrosshairIcon,
	CurrencyIcon,
	GrabIcon,
	IceCreamIcon,
	PersonStandingIcon,
	ShieldCheckIcon,
	SwordIcon,
	SwordsIcon,
	TractorIcon,
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
		'+1 base dpc',
		200,
		(dpc: number) => dpc + 1
	),
	new PlayerUpgradeItem(
		'utensils',
		'Kitchen Utensils',
		UtensilsIcon,
		'+3 base dpc',
		500,
		(dpc: number) => dpc + 3
	),
	new PlayerUpgradeItem(
		'sword',
		'Spicy Sword',
		SwordIcon,
		'+5 base dpc',
		2500,
		(dpc: number) => dpc + 5
	),
	new PlayerUpgradeItem(
		'katana',
		'Katana',
		ChevronsUpIcon,
		'+10 base dpc',
		10000,
		(dpc: number) => dpc + 10
	),
	new PlayerUpgradeItem(
		'smg',
		'SMG',
		CrosshairIcon,
		'+50 base dpc',
		25000,
		(dpc: number) => dpc + 50
	)
];

const UPGRADES: Upgrade[] = [
	new PlayerUpgrade(
		'player',
		'Player',
		PersonStandingIcon,
		'+1 dmg/click',
		10,
		1.35,
		1,
		PLAYER_UPGRADES
	),

	new DpsUpgrade('farmer', 'Farmer John', TractorIcon, '+1 dmg/s (unlocks at Lvl 2)', 25, 1.2, 1),
	new DpsUpgrade(
		'icecream',
		'Icecream Man',
		IceCreamIcon,
		'+3 dmg/s (unlocks at Lvl 3)',
		100,
		1.3,
		3
	),
	new DpsUpgrade(
		'guard',
		'Security Guard',
		ShieldCheckIcon,
		'+5 dmg/s (unlocks at Lvl 5)',
		500,
		1.3,
		5
	),
	new DpsUpgrade(
		'malitia',
		'Local Malitia',
		SwordsIcon,
		'+10 dmg/s (unlocks at Lvl 8)',
		1000,
		1.3,
		10
	),
	new DpsUpgrade(
		'soldier',
		'Soldier',
		CrosshairIcon,
		'+20 dmg/s (unlocks at Lvl 11)',
		5000,
		1.3,
		20
	),
	new DpsUpgrade(
		'turret',
		'Auto Turret 9000',
		CurrencyIcon,
		'+50 dmg/s (unlocks at Lvl 15)',
		10000,
		1.4,
		50
	)
];

export default UPGRADES;
