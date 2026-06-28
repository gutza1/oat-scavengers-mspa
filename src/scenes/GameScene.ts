import Phaser from "phaser";
import Inventory from "../items/inventory";
import Room from "../rooms/room";
import WorldObject from "../world_objects/world_object";

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: "GameScene" });
	}

	create() {
		window.gameState.gameScene = this;

		const dialogues_json = this.cache.json.get("dialogues");
		window.gameState.dialogues = new Map();

		for (var i = 0; i < dialogues_json.length; i++) {
			window.gameState.dialogues.set(dialogues_json[i].id, dialogues_json[i]);
		}

		const items_json = this.cache.json.get("items");
		window.gameState.items = new Map();

		for (var i = 0; i < items_json.length; i++) {
			window.gameState.items.set(items_json[i].id, items_json[i]);
		}

		const world_objects_json = this.cache.json.get("world_objects");
		window.gameState.worldObjects = new Map();

		for (var i = 0; i < world_objects_json.length; i++) {
			const item_effects = new Map();
			const item_effects_data = world_objects_json[i].item_effects;

			for (var j = 0; j < item_effects_data.length; j++) {
				item_effects.set(
					item_effects_data[j].item,
					item_effects_data[j].effects,
				);
			}

			const newWorldObject: WorldObject = new WorldObject(
				world_objects_json[i].id,
				world_objects_json[i].image,
				world_objects_json[i].state,
				world_objects_json[i].effects,
				item_effects,
			);
			window.gameState.worldObjects.set(
				world_objects_json[i].id,
				newWorldObject,
			);
		}

		const rooms_json = this.cache.json.get("rooms");
		window.gameState.rooms = new Map();

		for (var i = 0; i < rooms_json.length; i++) {
			const room_objects: WorldObject[] = rooms_json[i].world_objects.map(
				(obj_id: string) => window.gameState.worldObjects?.get(obj_id),
			);
			const newRoom = new Room(
				rooms_json[i].id,
				rooms_json[i].background,
				room_objects,
			);

			window.gameState.rooms.set(items_json[i].id, newRoom);
		}

		window.gameState.inventory = new Inventory();

		this.scene.launch("UIScene");
	}

	update() {}
}
