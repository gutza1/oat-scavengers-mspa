import "phaser";
import RexUIPlugin from "phaser4-rex-plugins/templates/ui/ui-plugin.js";
import { GameState } from ".";

declare module "phaser" {
	interface Scene {
		rexUI: RexUIPlugin;
	}
}

declare global {
	interface Window {
		gameState: Partial<GameState>;
	}
}
