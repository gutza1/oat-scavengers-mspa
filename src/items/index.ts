export interface Item {
	id: string;
	image: string;
}

export function loadItems(json: unknown): Map<string, Item> {
	return new Map((json as Item[]).map((item) => [item.id, item]));
}

export { default as Inventory } from "./inventory";
