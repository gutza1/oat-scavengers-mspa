import type WorldObject from "./world_objects";

type JSONRoom = {
	id: string;
	background: string;
	world_objects: string[];
};

export function loadRooms(json: any): Map<string, Room> {
	return new Map(
		(json as JSONRoom[]).map((room) => [
			room.id,
			new Room(
				room.id,
				room.background,
				room.world_objects.map(
					(worldObjectId) =>
						// TODO: better error handling in case of undefined world object, remove global state somehow
						window.gameState.worldObjects?.get(worldObjectId) as WorldObject,
				),
			),
		]),
	);
}

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
