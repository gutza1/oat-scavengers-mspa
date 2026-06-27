import Phaser from "phaser";
import BBCodeTextPlugin from "phaser4-rex-plugins/plugins/bbcodetext-plugin.js";
import RexUIPlugin from "phaser4-rex-plugins/templates/ui/ui-plugin.js";

import GameLoader from "./scenes/GameLoader";
import GameScene from "./scenes/GameScene";
import MainMenu from "./scenes/MainMenu";
import UIScene from "./scenes/UIScene";

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
}

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
