import {type Effect, event_effects_map } from '../effects/effects';

export interface Interaction {
    label: string;
    effects: Effect[]
}

export default class WorldObject {
    private id: string
    private image: string
    private state: number
    private effects: Interaction[][];
    private item_effects: Map<string, Effect[][]>;

    constructor(id: string, image: string, state:number, effects: Interaction[][], item_effects: Map<string, Effect[][]>) {
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

    public set Image(newImage:string) {
        this.image = newImage;
    }

    public get State(): number {
        return this.state;
    }

    public set State(newState:number) {
        this.state = newState;
    }

    public get Effects(): Interaction[][] {
        return this.effects;
    }

    public get Item_Effects(): Map<string, Effect[][]> {
        return this.item_effects;
    }

    public interact(interaction_num:number): void {
        const state_num_effects = this.effects[this.state][interaction_num].effects;

        for (var i = 0; i < state_num_effects.length; i++) {
            event_effects_map.get(state_num_effects[i].id)!.apply(window.gameState, state_num_effects[i].args);
        }
    }

    public item_interact(item_id:string): void {
        const effects_for_item = this.item_effects.get(item_id)![this.state];

        if (effects_for_item != undefined) {
            for (var i = 0; i < effects_for_item.length; i++) {
                event_effects_map.get(effects_for_item[i].id)!.apply(window.gameState, effects_for_item[i].args);
            }
        }
    }
}