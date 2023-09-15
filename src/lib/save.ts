import { SaveData } from './savedata';

const saveDataKey = 'tapz-saveData';

export function save(data: SaveData) {
	if (!data) return;

	data.savedAt = Date.now();

	try {
		localStorage.setItem(saveDataKey, JSON.stringify(data));
	} catch (error) {
		console.error('Error saving data', error);
	}
}

export function load(): SaveData {
	try {
		// If there is no save data, return a new SaveData object
		if (localStorage.getItem(saveDataKey) === null) return new SaveData();

		// Otherwise, parse the save data and return it
		const data = localStorage.getItem(saveDataKey);
		return JSON.parse(<string>data);
	} catch (error) {
		console.error('Error loading data', error);
		return new SaveData();
	}
}
