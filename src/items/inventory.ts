export interface Item {
    id: string;
    image: string;
}

// TODO: should we be able to have inventories with more than 20 slots? can inventories be resized?
export default class Inventory {
	private items: (Item | null)[];

	constructor() {
		this.items = Object.seal(Array.from(Array(20), () => null));
	}

	get itemCount(): number {
		return this.items.filter((item) => item !== null).length;
	}

	getItemInSlot(slot: number): Item | null {
		return this.items[slot] ?? null;
	}

	addItem(item: Item): void {
		const slot = this.items.indexOf(null);

		if (slot === -1) {
			throw new Error("Tried to add item, but the inventory is full");
		} else {
			this.items[slot] = item;
		}
	}

	addItemToSlot(item: Item, slot: number): void {
		try {
			if (this.items[slot] === null || this.items[slot] === undefined) {
				this.items[slot] = item;
			} else {
				throw new Error(
					`Tried to add item to inventory slot ${slot} that already contains an item`,
				);
			}
		} catch (e) {
			if (e instanceof TypeError) {
				throw new Error(
					`Tried to add item to out of bounds inventory slot ${slot}`,
					{ cause: e },
				);
			} else {
				throw e;
			}
		}
	}

	clearSlot(slot: number): void {
		try {
			this.items[slot] = null;
		} catch (e) {
			if (e instanceof TypeError) {
				throw new Error(`Tried to clear out of bounds inventory slot ${slot}`, {
					cause: e,
				});
			} else {
				throw e;
			}
		}
	}

	swapSlots(slot1: number, slot2: number): void {
		if (slot1 < 0 || slot1 >= this.items.length) {
			throw new Error(
				`Tried to swap item in out of bounds inventory slot ${slot1}`,
			);
		} else if (slot2 < 0 || slot2 >= this.items.length) {
			throw new Error(
				`Tried to swap item in out of bounds inventory slot ${slot2}`,
			);
		} else {
			const tmp = this.items[slot1];
			this.items[slot1] = this.items[slot2];
			this.items[slot2] = tmp;
		}
	}
}
