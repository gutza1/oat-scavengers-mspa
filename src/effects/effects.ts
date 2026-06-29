import WorldObject from "../worldObjects";

export interface Effect {
	id: string;
	args: unknown;
}

export const event_effects_map: Map<string, Function> = new Map([
	[
		"switchRooms",
		(args: unknown) => {
			const _roomId = (args as { roomId: string }).roomId;
			window.gameState.gameScene?.changeRooms(_roomId);
		},
	],
    [
		"pickUpItem",
		(args: unknown) => {
			const item = (args as { item_id: string }).item_id;
            const item_obj = window.gameState.items?.get(item)!;
			window.gameState.evidence?.addItem(item_obj);
            console.log(window.gameState.evidence);
		},
	],
    [
		"switchState",
		(args: unknown) => {
			const worldObject = (args as {worldObject : WorldObject, newState: string }).worldObject;
            const newState = (args as {worldObject : WorldObject, newState: string }).newState;
            worldObject.currentState = newState;
		},
	],
	[
		"openDialogue",
		(args: unknown) => {
			const _dialogueId = (args as { dialogueId: string }).dialogueId;
			//window.gameState.gameScene!.sound.play(SFXId);
		},
	],
	[
		"playSFX",
		(args: unknown) => {
			const _SFXId = (args as { SFXId: string }).SFXId;
			window.gameState.gameScene?.sound.play(_SFXId);
		},
	],
]);
