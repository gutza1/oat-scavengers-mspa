import { type Effect, event_effects_map } from "../effects/effects";

export interface ImageData {
	id: string,
	x: number,
	y: number
}

export interface Interaction {
	label: string;
	effects: Effect[];
}

type JSONWorldObject = {
	id: string;
	image: ImageData;
	states: string[];
	effects: Record<string, Interaction[]>;
	itemEffects: Record<string, Record<string, Effect[]>>;
};

export function loadWorldObjects(json: unknown): Map<string, WorldObject> {
	return new Map(
		(json as JSONWorldObject[]).map((worldObject) => [
			worldObject.id,
			new WorldObject(
				worldObject.id,
				worldObject.image,
				worldObject.states,
				new Map(Object.entries(worldObject.effects)),
				new Map(
					Object.entries(worldObject.itemEffects).map(([item, effects]) => [
						item,
						new Map(Object.entries(effects)),
					]),
				),
			),
		]),
	);
}

type StateMap<T> = Map<string, T>;

function getUndefinedEffects(
	effects: Map<string, unknown>,
	states: string[],
): string[] {
	return states.filter((state) => !effects.has(state));
}

export default class WorldObject {
	readonly id: string;
	readonly image: ImageData;
	readonly states: string[];
	private _state: string;
	readonly effects: StateMap<Interaction[]>;
	readonly itemEffects: Map<string, StateMap<Effect[]>>;

	constructor(
		id: string,
		image: ImageData,
		states: string[],
		effects: StateMap<Interaction[]>,
		itemEffects: Map<string, StateMap<Effect[]>>,
	) {
		if (states.length <= 0) {
			throw new Error(`WorldObject ${id} has no states defined`);
		}

		const undefinedEffects = getUndefinedEffects(effects, states);
		if (undefinedEffects.length > 0) {
			throw new Error(
				`WorldObject ${id} is missing effects for the following states: ${undefinedEffects.join(", ")}`,
			);
		}

		itemEffects.forEach((effects, item) => {
			const undefinedEffects = getUndefinedEffects(effects, states);
			if (undefinedEffects.length > 0) {
				throw new Error(
					`WorldObject ${id} is missing effects for item ${item} for the following states: ${undefinedEffects.join(", ")}`,
				);
			}
		});

		this.id = id;
		this.image = image; //stores id string and x and y position of background image
		this.states = states;
		this._state = states[0];
		this.effects = effects;
		this.itemEffects = itemEffects;
	}

	public get imageData(): ImageData {
		return this.image;
	}

	public get currentState(): string {
		return this._state;
	}
	public set currentState(newState: string) {
		if (!this.states.includes(newState)) {
			throw new Error(
				`Tried to set state of WorldObject ${this.id} to undefined state ${newState}`,
			);
		}

		this._state = newState;
	}

	public getStateInteractionLabels(): string[] {
		var labels:string[] = [];
		const current_state = this.effects.get(this._state)!;
		current_state.forEach((interaction) => {
			labels.push(interaction.label);
		})
		return labels;
	}

	public interact(interactionNum: number): void {
		const effectsForState =
			this.effects.get(this._state)?.[interactionNum].effects ?? [];

		effectsForState.forEach((effect) => {
			event_effects_map.get(effect.id)?.apply(window.gameState, effect.args);
		});
	}

	public interactWithItem(itemId: string): void {
		const effectsForItem = this.itemEffects.get(itemId)?.get(this._state) ?? [];

		effectsForItem.forEach((effect) => {
			event_effects_map.get(effect.id)?.apply(window.gameState, effect.args);
		});
	}
}
