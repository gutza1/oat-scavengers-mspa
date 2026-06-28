import { type Effect, event_effects_map } from "./effects/effects";

export interface Interaction {
	label: string;
	effects: Effect[];
}

type JSONWorldObject = {
	id: string;
	image: string;
	state: number;
	effects: Interaction[][];
	itemEffects: {
		item: string;
		effects: Effect[][];
	}[];
};

export function loadWorldObjects(json: unknown): Map<string, WorldObject> {
	return new Map(
		(json as JSONWorldObject[]).map((worldObject) => [
			worldObject.id,
			new WorldObject(
				worldObject.id,
				worldObject.image,
				worldObject.state,
				worldObject.effects,
				new Map(
					worldObject.itemEffects.map((itemEffect) => [
						itemEffect.item,
						itemEffect.effects,
					]),
				),
			),
		]),
	);
}

export default class WorldObject {
	private id: string;
	private image: string;
	private state: number;
	private effects: Interaction[][];
	private item_effects: Map<string, Effect[][]>;

	constructor(
		id: string,
		image: string,
		state: number,
		effects: Interaction[][],
		item_effects: Map<string, Effect[][]>,
	) {
		this.id = id;
		this.image = image; //stores id string of background image
		this.state = state;
		this.effects = effects;
		this.item_effects = item_effects;
	}

	public get Id(): string {
		return this.id;
	}

	public get Image(): string {
		return this.image;
	}

	public set Image(newImage: string) {
		this.image = newImage;
	}

	public get State(): number {
		return this.state;
	}

	public set State(newState: number) {
		this.state = newState;
	}

	public get Effects(): Interaction[][] {
		return this.effects;
	}

	public get Item_Effects(): Map<string, Effect[][]> {
		return this.item_effects;
	}

	public interact(interaction_num: number): void {
		const state_num_effects = this.effects[this.state][interaction_num].effects;

		for (const effect of state_num_effects) {
			event_effects_map.get(effect.id)?.apply(window.gameState, effect.args);
		}
	}

	public item_interact(item_id: string): void {
		const effects_for_item = this.item_effects.get(item_id)?.[this.state];

		if (effects_for_item !== undefined) {
			for (const effect of effects_for_item) {
				event_effects_map.get(effect.id)?.apply(window.gameState, effect.args);
			}
		}
	}
}
