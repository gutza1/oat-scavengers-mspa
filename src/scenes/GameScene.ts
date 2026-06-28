import Phaser from "phaser";
import { loadDialogues } from "../dialogues";
import { loadItems } from "../items";
import Inventory from "../items/inventory";
import Room from "../rooms"
import { loadRooms } from "../rooms";
import WorldObject, { loadWorldObjects } from "../worldObjects";

class PhaserWorldObject {
	private _worldObject:WorldObject;
	private _image:(Phaser.GameObjects.Image | undefined);

	constructor(worldObject:WorldObject) {
		this._worldObject = worldObject;
		const image_data = worldObject.image;
		this._image = window.gameState.gameScene?.add.image(image_data.x, image_data.y, image_data.id);
		this._image?.setInteractive(true);

		this._image?.on('pointerup', () => {
            this.onclick();
        }, this);
	}

	public deleteImage(): void {
		if (this._image != undefined) {
			this._image.destroy();
			this._image = undefined;
		}
	}

	public onclick(): void {

	}
}

export default class GameScene extends Phaser.Scene {
	private _currentRoom:(Room | undefined);
	private _roomBackground:(Phaser.GameObjects.Image | undefined);
	private _phaserWorldObjects!:PhaserWorldObject[];

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

		this._phaserWorldObjects = [];
		this._roomBackground = this.add.image(0, 0, ""); //assign blank image

		this.changeRooms("example_room");

		this.scene.launch("UIScene");
	}

	changeRooms(roomId:string) {
		//removes previous world objects
		this._phaserWorldObjects.forEach((phaserObj) => {
			phaserObj.deleteImage()
		});
		this._phaserWorldObjects = [];

		this._currentRoom = window.gameState.rooms?.get(roomId);

		if (this._currentRoom != undefined) {
			this._roomBackground?.setTexture(this._currentRoom.background);

			this._currentRoom.worldObjects.forEach((worldObject) => {
				const newPhaserObj = new PhaserWorldObject(worldObject);
				this._phaserWorldObjects.push(newPhaserObj);
			});
		}
	}

	update() {

	}

	
}
