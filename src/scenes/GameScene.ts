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
		this._image?.setInteractive({useHandCursor:true});

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
		const world_object = this._worldObject
		if (window.gameState.uiScene!.selectedItem != null) {
			const phaserItem = window.gameState.uiScene!.selectedItem;
			const itemObj = phaserItem.inventory_obj.getItemInSlot(phaserItem.inventory_no);
			if (itemObj != null) {
				world_object.interactWithItem(itemObj.id);
			}
			window.gameState.uiScene!.selectItem(null);
		}
		else {

		}
		var menu = window.gameState.uiScene!.rexUI.add.menu({
                    x: this._worldObject.image.x,
                    y: this._worldObject.image.y,
                    orientation: 'y',
                    // subMenuSide: 'right',

      items: world_object.getStateInteractionLabels().map(l => ({name: l, children: []})),
                    createButtonCallback: (item, i) => {
                        var label = window.gameState.uiScene!.rexUI.add.label({
                            background: window.gameState.uiScene!.add.rectangle(0, 0, 148, 24, window.gameState.widgetForeground).setStrokeStyle(1, window.gameState.widgetBorder),
                            text: window.gameState.uiScene!.add.text(0, 0, item.name, {color: window.gameState.widgetTextColor,
                                fontFamily: window.gameState.eventFont,
                                fontSize: 22}),
                        });
                        label.setInteractive({
                            useHandCursor: true
                        }).on('pointerup', () => {
							world_object.interact(i);
                            menu.destroy();
                        })
                        return label
                    },
                });
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
			this.cache.json.get("world_objects"),
		);
		window.gameState.rooms = loadRooms(this.cache.json.get("rooms"));
		window.gameState.inventory = new Inventory(6);
		window.gameState.evidence = new Inventory(6);

		this._phaserWorldObjects = [];
		this._roomBackground = this.add.image(0, 0, "").setOrigin(0, 0); //assign blank image

		this.changeRooms("police_room");

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
