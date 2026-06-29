import Phaser from "phaser";
import { Inventory, type Item } from "../items";

interface PhaserItem {
	image: Phaser.GameObjects.Image;
	background: Phaser.GameObjects.Rectangle;
	inventory_obj:Inventory;
	inventory_no:number;
}

class InventoryBar {
	readonly container:Phaser.GameObjects.Container;
	readonly inventoryObject:Inventory;
	readonly phaserItemArray:PhaserItem[];

	constructor(inventoryObject:Inventory, x:number, y:number) {
		const itemImgSize = 80; //assuming square
		
		this.inventoryObject = inventoryObject;
		this.phaserItemArray = [];
		const container_array = [];

		var startingX = 10;
		for (var i = 0; i < inventoryObject.itemCount; i++) {
			const itemBackground = window.gameState.uiScene!.add.rectangle(startingX - 1, 9, itemImgSize, itemImgSize, window.gameState.widgetBorder);
			const itemImage = window.gameState.uiScene!.add.image(startingX, 10, "");
			itemImage.setInteractive({useHandCursor:true});
			const itemObject = {image: itemImage, 
				background: itemBackground,
				inventory_obj:inventoryObject,
				inventory_no:i}
			this.phaserItemArray.push(itemObject);
			container_array.push(itemBackground);
			container_array.push(itemImage);

			itemImage.on('pointerup', () => {
            	this.onclick(itemObject.inventory_no);
       		}, this);
		}

		this.container = window.gameState.uiScene!.add.container(x, y, container_array);
	}

	update() {
		this.phaserItemArray.forEach((phaserItem) => {
			const itemObj = this.inventoryObject.getItemInSlot(phaserItem.inventory_no)
			phaserItem.image.setTexture(itemObj?.image ?? "");
		})
	}

	onclick(inventory_no:number):void {
		const selected_item = window.gameState.uiScene!.selectedItem;
		if (selected_item != null) {
			if (selected_item.inventory_no != inventory_no && selected_item.inventory_obj == this.inventoryObject) {
				this.inventoryObject.swapSlots(selected_item.inventory_no, inventory_no);
				window.gameState.uiScene!.selectItem(this.phaserItemArray[inventory_no]);
			}
		}
		else {
			window.gameState.uiScene!.selectItem(this.phaserItemArray[inventory_no]);
		}
	}
}

class UIBar {
	readonly container:Phaser.GameObjects.Container;
	readonly evidenceBar:InventoryBar;
	readonly playerImage:Phaser.GameObjects.Image;
	readonly inventoryBar:InventoryBar

	constructor() {
		const UIBarHeight = 100;
		const playerImageWidth = 80;

		this.evidenceBar = new InventoryBar(window.gameState.evidence!, 0, 720 - UIBarHeight);
		this.inventoryBar = new InventoryBar(window.gameState.inventory!, (1280 + playerImageWidth)/2, 720 - UIBarHeight);

		this.playerImage = window.gameState.uiScene!.add.image((1280 - playerImageWidth)/2, (720 - UIBarHeight), "");

		this.container = window.gameState.uiScene!.add.container(0, 0, [this.evidenceBar.container, this.playerImage, this.inventoryBar.container])
	}
}

export default class UIScene extends Phaser.Scene {
	selectedItem!:(PhaserItem | null);

	constructor() {
		super({ key: "UIScene" });
	}

	create() {
		window.gameState.uiScene = this;

		this.selectedItem = null;
	}

	update() {}

	selectItem(item:(PhaserItem | null)) {
		if (this.selectedItem != null) {
			this.selectedItem.background.setFillStyle(window.gameState.widgetBorder);
		}
		this.selectedItem = item;
		if (item != null) {
			this.selectedItem!.background.setFillStyle(window.gameState.widgetWarning);
		}
	}
}
