import Phaser from "phaser";
import BBCodeTextPlugin from "phaser4-rex-plugins/plugins/bbcodetext-plugin.js";
import RexUIPlugin from "phaser4-rex-plugins/templates/ui/ui-plugin.js";

import type { Dialogue } from "./dialogues";
import type { Item } from "./items";
import type Inventory from "./items/inventory";
import type Room from "./rooms";
import GameLoader from "./scenes/GameLoader";
import GameScene from "./scenes/GameScene";
import MainMenu from "./scenes/MainMenu";
import UIScene from "./scenes/UIScene";
import type WorldObject from "./world_objects";

export type GameState = {
	gameScene: GameScene;
	uiScene: UIScene;

	// Images
	mainlogo: Phaser.GameObjects.Image;
	menu_bg: Phaser.GameObjects.Image;

	// Colours
	eventForeground: number;
	superLineColor: number;
	trackBorder: number;
	trackFill: number;
	uiBackground: number;
	widgetBorder: number;
	widgetForeground: number;
	widgetGlow: number;
	widgetWarning: number;

	// Text properties
	adminTextColor: string;
	engTextColor: string;
	eventFont: string;
	eventTextColor: string;
	greenTextColor: string;
	lightTextColor: string;
	opsTextColor: string;
	sciTextColor: string;
	widgetTextColor: string;
	widgetFont: string;

	dateFormat: string;

	render: {
		pixelArt: boolean;
	};

	// Data holders
	dialogues: Map<string, Dialogue>;
	items: Map<string, Item>;
	rooms: Map<string, Room>;
	worldObjects: Map<string, WorldObject>;

	//Game Variables
	inventory: Inventory;
};

window.gameState = {
	render: {
		pixelArt: true,
	},
};

const config = {
	type: Phaser.AUTO,
	parent: "game_container",
	width: 1280,
	height: 720,
	antiAlias: true,
	gameVersion: "0.01",
	scene: [GameLoader, MainMenu, GameScene, UIScene],
	plugins: {
		scene: [
			{
				key: "rexUI",
				plugin: RexUIPlugin,
				mapping: "rexUI",
			},
		],
		global: [
			{
				key: "rexBBCodeTextPlugin",
				plugin: BBCodeTextPlugin,
				start: true,
			},
		],
	},
};

const _game = new Phaser.Game(config);
