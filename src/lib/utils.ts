export function getReflected<T>(from: any, path: string): T {
	return path.split('.').reduce((obj, key) => obj && obj[key], from) as T;
}

export function formatNumber(value: number): string {
	return value.toLocaleString();
}
