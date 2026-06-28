import Phaser from "phaser";
import { loadDialogues } from "../dialogues";
import { loadItems } from "../items";
import Inventory from "../items/inventory";
import { loadRooms } from "../rooms";
import { loadWorldObjects } from "../world_objects";

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: "GameScene" });
	}

	create() {
		window.gameState.gameScene = this;
		window.gameState.dialogues = loadDialogues(
			this.cache.json.get("dialogues"),
		);
		window.gameState.items = loadItems(this.cache.json.get("items"));
		window.gameState.worldObjects = loadWorldObjects(
			this.cache.json.get("worldObjects"),
		);
		window.gameState.rooms = loadRooms(this.cache.json.get("rooms"));
		window.gameState.inventory = new Inventory();

		this.scene.launch("UIScene");
	}

	update() {}
}
