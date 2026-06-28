import type WorldObject from "../world_objects/world_object";

export default class Room {
  background: string;
	readonly id: string;
	readonly worldObjects: WorldObject[];

	constructor(id: string, background: string, worldObjects: WorldObject[]) {
		this.id = id;
		this.background = background; //stores id string of background image
		this.worldObjects = worldObjects;
	}
}
