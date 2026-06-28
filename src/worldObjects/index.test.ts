import { beforeEach, describe, expect, test } from "vitest";
import WorldObject from ".";

describe("WorldObject", () => {
	const states = ["default", "secondary"];
	const effects = new Map(Object.entries({ default: [], secondary: [] }));
	const itemEffects = new Map(
		Object.entries({
			testItem: new Map(Object.entries({ default: [], secondary: [] })),
		}),
	);

	describe("constructor", () => {
		test("creates a WorldObject", () => {
			const worldObject = new WorldObject(
				"test id",
				"test image",
				states,
				effects,
				itemEffects,
			);

			expect(worldObject.id).toBe("test id");
			expect(worldObject.image).toBe("test image");
			expect(worldObject.states).toStrictEqual(states);
			expect(worldObject.effects).toStrictEqual(effects);
			expect(worldObject.itemEffects).toStrictEqual(itemEffects);
		});

		test("fails if the object has no states defined", () => {
			expect(
				() =>
					new WorldObject("test id", "test image", [], effects, itemEffects),
			).toThrow("WorldObject test id has no states defined");
		});

		test("fails if the object has missing effects for states", () => {
			expect(
				() =>
					new WorldObject(
						"test id",
						"test image",
						states,
						new Map(),
						itemEffects,
					),
			).toThrow(
				"WorldObject test id is missing effects for the following states: default, secondary",
			);
		});

		test("fails if the object has missing item interaction effects for states", () => {
			expect(
				() =>
					new WorldObject(
						"test id",
						"test image",
						states,
						effects,
						new Map(Object.entries({ testItem: new Map() })),
					),
			).toThrow(
				"WorldObject test id is missing effects for item testItem for the following states: default, secondary",
			);
		});
	});

	describe("currentState", () => {
		let worldObject: WorldObject;

		beforeEach(() => {
			worldObject = new WorldObject(
				"test id",
				"test image",
				states,
				effects,
				itemEffects,
			);
		});

		test("getter returns the currently set state", () => {
			expect(worldObject.currentState).toBe("default");
		});

		test("setter modifies the currently set state", () => {
			worldObject.currentState = "secondary";
			expect(worldObject.currentState).toBe("secondary");
		});

		test("setter fails if the given state is not a defined state", () => {
			expect(() => (worldObject.currentState = "invalid")).toThrow(
				"Tried to set state of WorldObject test id to undefined state invalid",
			);
			expect(worldObject.currentState).toBe("default");
		});
	});
});
