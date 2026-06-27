import { beforeEach, describe, expect, test } from "vitest";
import Inventory from "./inventory";

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
		inventory.addItemToSlot("test item", 0);
		inventory.addItemToSlot("test item", 1);
		inventory.addItemToSlot("test item", 5);
		inventory.addItem("test item");

		expect(inventory.getItemInSlot(2)).toBe("test item");
	});

	test("adds an item to the first slot of an empty inventory", () => {
		inventory.addItem("test item");

		expect(inventory.getItemInSlot(0)).toBe("test item");
	});

	test("throws an error if the inventory is full", () => {
		for (let i = 0; i < 20; i++) {
			inventory.addItemToSlot("test item", i);
		}

		expect(() => inventory.addItem("test item")).toThrow(
			"Tried to add item, but the inventory is full",
		);
	});
});

describe("addItemToSlot", () => {
	test("adds an item to the specified slot", () => {
		inventory.addItemToSlot("test item", 0);

		expect(inventory.getItemInSlot(0)).toBe("test item");
	});

	test("throws an out of bounds error if the slot specified is negative", () => {
		expect(() => inventory.addItemToSlot("test item", -1)).toThrow(
			"Tried to add item to out of bounds inventory slot -1",
		);
	});

	test("throws an out of bounds error if the slot specified is beyond the max inventory size", () => {
		expect(() => inventory.addItemToSlot("test item", 100)).toThrow(
			"Tried to add item to out of bounds inventory slot 100",
		);
	});

	test("throws a conflict error if the slot specified already contains an item, without overwriting the slot", () => {
		inventory.addItemToSlot("test item", 0);

		expect(() => inventory.addItemToSlot("other test item", 0)).toThrow(
			"Tried to add item to inventory slot 0 that already contains an item",
		);
		expect(inventory.getItemInSlot(0)).toBe("test item");
	});
});

describe("clearSlot", () => {
	test("removes the item from the given slot", () => {
		inventory.addItemToSlot("test item", 0);
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
		inventory.addItemToSlot("item 1", 0);
		inventory.addItemToSlot("item 2", 1);
		inventory.swapSlots(0, 1);

		expect(inventory.getItemInSlot(0)).toBe("item 2");
		expect(inventory.getItemInSlot(1)).toBe("item 1");
	});

	test("moves an item to an empty slot", () => {
		inventory.addItemToSlot("test item", 0);
		inventory.swapSlots(0, 1);

		expect(inventory.getItemInSlot(0)).toBeNull();
		expect(inventory.getItemInSlot(1)).toBe("test item");
	});

	test("throws an out of bounds error if the first slot is out of bounds, without modifying the inventory", () => {
		inventory.addItemToSlot("test item", 0);

		expect(() => inventory.swapSlots(-2, 0)).toThrow(
			"Tried to swap item in out of bounds inventory slot -2",
		);
		expect(inventory.getItemInSlot(0)).toBe("test item");
	});

	test("throws an out of bounds error if the second slot is out of bounds, without modifying the inventory", () => {
		inventory.addItemToSlot("test item", 0);

		expect(() => inventory.swapSlots(0, 100)).toThrow(
			"Tried to swap item in out of bounds inventory slot 100",
		);
		expect(inventory.getItemInSlot(0)).toBe("test item");
	});

	test("throws an out of bounds error if both slots are out of bounds", () => {
		expect(() => inventory.swapSlots(-4, 100)).toThrow(
			"Tried to swap item in out of bounds inventory slot -4",
		);
	});
});

describe("itemCount", () => {
	test("returns the amount of items in the inventory", () => {
		inventory.addItemToSlot("test item", 1);
		inventory.addItemToSlot("test item", 5);
		inventory.addItemToSlot("test item", 17);

		expect(inventory.itemCount).toBe(3);
	});

	test("returns 0 for an empty inventory", () => {
		expect(inventory.itemCount).toBe(0);
	});
});
