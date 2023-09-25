import Achievement from '$lib/achievements/achievement';
import {
	BeanIcon,
	HeartPulseIcon,
	MouseIcon,
	MousePointer2Icon,
	MousePointerIcon,
	SkullIcon
} from 'lucide-svelte';

const METRICS = {
	CURRENT_MONEY: 'resources.money',
	CURRENT_BRAINS: 'resources.brains',
	TOTAL_CLICKS: 'stats.clicks',
	TOTAL_KILLS: 'stats.kills',
	TOTAL_DAMAGE_DEALT: 'stats.damageDealt'
};

export const ACHIEVEMENTS: Achievement[] = [
	new Achievement(
		'starterInstinct',
		'Starter Instincts',
		SkullIcon,
		'Kill 50 zombies',
		METRICS.TOTAL_KILLS,
		50
	),
	new Achievement(
		'improvedInstinct',
		'Improved instinct',
		SkullIcon,
		'Kill 250 zombies',
		METRICS.TOTAL_KILLS,
		250
	),
	new Achievement(
		'murderousInstinct',
		'Murderous instinct',
		SkullIcon,
		'Kill 1k zombies',
		METRICS.TOTAL_KILLS,
		1_000
	),

	new Achievement(
		'mouseMasher',
		'Mouse Masher',
		MouseIcon,
		'Click 1k times',
		METRICS.TOTAL_CLICKS,
		1_000
	),
	new Achievement(
		'questionableHabits',
		'Questionable Habits',
		MousePointerIcon,
		'Click 10k times',
		METRICS.TOTAL_CLICKS,
		10_000
	),
	new Achievement(
		'mouseGod',
		'Mouse God',
		MousePointer2Icon,
		'Click 100k times',
		METRICS.TOTAL_CLICKS,
		10_000
	),

	new Achievement(
		'hurtful',
		'Hurtful',
		HeartPulseIcon,
		'Deal 1k damage',
		METRICS.TOTAL_DAMAGE_DEALT,
		1_000
	),
	new Achievement(
		'undefinedBean',
		'Undefined Bean',
		BeanIcon,
		'????',
		METRICS.TOTAL_DAMAGE_DEALT,
		100_000
	)
];
