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
