export const VERSION = 'v2.0.0 ALPHA 10';
export const TICK_INTERVAL = 1000 / 5;
export const AUTOSAVE_INTERVAL = 1000 * 60;
export const RESPAWN_COOLDOWN = 1000 / 4;
export const SAVEDATA_KEY = 'tapz-saveData';

export const ZOMBIE_HEALTH = (level: number) => Math.floor(10 * Math.pow(1.6, level - 1));
export const MAX_EXPERIENCE = (level: number) => Math.floor(20 * Math.pow(1.5, level - 1));
export const KILL_EXPERIENCE = (level: number) => Math.floor(Math.random() * (level - 1)) + 1;
