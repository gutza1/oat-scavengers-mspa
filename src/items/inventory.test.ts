import { beforeEach, describe, expect, test } from "vitest";
import { Inventory, type Item } from ".";

const item: Item = {
	id: "test item",
	image: "test image",
};

let inventory: Inventory;

beforeEach(() => {
	inventory = new Inventory();
});

describe("getItemInSlot", () => {
	test("returns null if the slot is empty", () => {
		expect(inventory.getItemInSlot(0)).toBeNull();
	});

	test("returns null if the slot is out of bounds", () => {
		expect(inventory.getItemInSlot(100)).toBeNull();
		expect(inventory.getItemInSlot(20)).toBeNull();
		expect(inventory.getItemInSlot(-1)).toBeNull();
	});
});

describe("addItem", () => {
	test("adds an item to the first empty slot", () => {
		inventory.addItemToSlot(item, 0);
		inventory.addItemToSlot(item, 1);
		inventory.addItemToSlot(item, 5);
		inventory.addItem(item);

		expect(inventory.getItemInSlot(2)).toBe(item);
	});

	test("adds an item to the first slot of an empty inventory", () => {
		inventory.addItem(item);

		expect(inventory.getItemInSlot(0)).toBe(item);
	});

	test("throws an error if the inventory is full", () => {
		for (let i = 0; i < 20; i++) {
			inventory.addItemToSlot(item, i);
		}

		expect(() => inventory.addItem(item)).toThrow(
			"Tried to add item, but the inventory is full",
		);
	});
});

describe("addItemToSlot", () => {
	test("adds an item to the specified slot", () => {
		inventory.addItemToSlot(item, 0);

		expect(inventory.getItemInSlot(0)).toBe(item);
	});

	test("throws an out of bounds error if the slot specified is negative", () => {
		expect(() => inventory.addItemToSlot(item, -1)).toThrow(
			"Tried to add item to out of bounds inventory slot -1",
		);
	});

	test("throws an out of bounds error if the slot specified is beyond the max inventory size", () => {
		expect(() => inventory.addItemToSlot(item, 100)).toThrow(
			"Tried to add item to out of bounds inventory slot 100",
		);
	});

	test("throws a conflict error if the slot specified already contains an item, without overwriting the slot", () => {
		inventory.addItemToSlot(item, 0);

		expect(() =>
			inventory.addItemToSlot(
				{
					...item,
					id: "other test item",
				},
				0,
			),
		).toThrow(
			"Tried to add item to inventory slot 0 that already contains an item",
		);
		expect(inventory.getItemInSlot(0)).toBe(item);
	});
});

describe("clearSlot", () => {
	test("removes the item from the given slot", () => {
		inventory.addItemToSlot(item, 0);
		inventory.clearSlot(0);

		expect(inventory.getItemInSlot(0)).toBeNull();
	});

	test("is a no-op if the slot is already empty", () => {
		expect(inventory.getItemInSlot(0)).toBeNull();

		inventory.clearSlot(0);
		expect(inventory.getItemInSlot(0)).toBeNull();
	});

	test("throws an out of bounds error if the slot specified is negative", () => {
		expect(() => inventory.clearSlot(-1)).toThrow(
			"Tried to clear out of bounds inventory slot -1",
		);
	});

	test("throws an out of bounds error if the slot specified is beyond the max inventory size", () => {
		expect(() => inventory.clearSlot(100)).toThrow(
			"Tried to clear out of bounds inventory slot 100",
		);
	});
});

describe("swapSlots", () => {
	test("swaps the items in the given slots", () => {
		const item1 = { ...item, id: "item 1" };
		const item2 = { ...item, id: "item 2" };

		inventory.addItemToSlot(item1, 0);
		inventory.addItemToSlot(item2, 1);
		inventory.swapSlots(0, 1);

		expect(inventory.getItemInSlot(0)).toBe(item2);
		expect(inventory.getItemInSlot(1)).toBe(item1);
	});

	test("moves an item to an empty slot", () => {
		inventory.addItemToSlot(item, 0);
		inventory.swapSlots(0, 1);

		expect(inventory.getItemInSlot(0)).toBeNull();
		expect(inventory.getItemInSlot(1)).toBe(item);
	});

	test("throws an out of bounds error if the first slot is out of bounds, without modifying the inventory", () => {
		inventory.addItemToSlot(item, 0);

		expect(() => inventory.swapSlots(-2, 0)).toThrow(
			"Tried to swap item in out of bounds inventory slot -2",
		);
		expect(inventory.getItemInSlot(0)).toBe(item);
	});

	test("throws an out of bounds error if the second slot is out of bounds, without modifying the inventory", () => {
		inventory.addItemToSlot(item, 0);

		expect(() => inventory.swapSlots(0, 100)).toThrow(
			"Tried to swap item in out of bounds inventory slot 100",
		);
		expect(inventory.getItemInSlot(0)).toBe(item);
	});

	test("throws an out of bounds error if both slots are out of bounds", () => {
		expect(() => inventory.swapSlots(-4, 100)).toThrow(
			"Tried to swap item in out of bounds inventory slot -4",
		);
	});
});

describe("itemCount", () => {
	test("returns the amount of items in the inventory", () => {
		inventory.addItemToSlot(item, 1);
		inventory.addItemToSlot(item, 5);
		inventory.addItemToSlot(item, 17);

		expect(inventory.itemCount).toBe(3);
	});

	test("returns 0 for an empty inventory", () => {
		expect(inventory.itemCount).toBe(0);
	});
});
