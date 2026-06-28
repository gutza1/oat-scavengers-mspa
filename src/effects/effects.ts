export interface Effect {
    id: string;
    args: unknown;
}

export const event_effects_map:Map<string, Function> = new Map([["switchRooms", function (args:unknown) {
        const roomId = (args as { roomId: string }).roomId;
        //window.gameState.gameScene!.sound.play(roomId);
    }],
    ["openDialogue", function (args:unknown) {
        const dialogueId = (args as { dialogueId: string }).dialogueId;
        //window.gameState.gameScene!.sound.play(SFXId);
    }],
    ["playSFX", function (args:unknown) {
        const SFXId = (args as { SFXId: string }).SFXId;
        window.gameState.gameScene!.sound.play(SFXId);
    }]])