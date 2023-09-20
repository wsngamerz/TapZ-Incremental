import type { Upgrade } from '$lib/upgrades/upgrade';
import { DpcUpgrade } from '$lib/upgrades/dpcUpgrade';
import { CurrencyIcon, GrabIcon, SwordIcon, SwordsIcon, UtensilsIcon } from 'lucide-svelte';
import { DpsUpgrade } from '$lib/upgrades/dpsUpgrade';

const UPGRADES: Upgrade[] = [
	new DpcUpgrade('fist', 'Fist', GrabIcon, '+1 dmg/click', 10, 1.1, 1),
	new DpcUpgrade('kitchenSet', 'Kitchen Set', UtensilsIcon, '+3 dmg/click', 50, 1.1, 3),
	new DpcUpgrade('spicySword', 'Spicy Sword', SwordIcon, '+7 dmg/click', 100, 1.1, 5),

	new DpsUpgrade('malitia', 'Malitia', SwordsIcon, '+2 dmg/s', 50, 1.1, 2),
	new DpsUpgrade('turret', 'Turret', CurrencyIcon, '+5 dmg/s', 100, 1.1, 5)
];

export default UPGRADES;
