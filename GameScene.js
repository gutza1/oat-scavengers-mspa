class GameScene extends Phaser.Scene {

    constructor() {
		super({ key: 'GameScene' });
	}

    preload () {
        this.load.scenePlugin('rexuiplugin', 'rexuiplugin.min.js', 'rexUI', 'rexUI');
    }
    create () {
        gameState.gameScene = this;

        this.scene.launch("UIScene");
    }

    update () {
        
    }
}