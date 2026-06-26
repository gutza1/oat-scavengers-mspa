class UIScene extends Phaser.Scene {

    constructor() {
		super({ key: 'UIScene' });
	}

    preload () {
        this.load.scenePlugin('rexuiplugin', 'rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.plugin('rexbbcodetextplugin', 'rexbbcodetextplugin.min.js', true);
    }
    create () {
        gameState.uiScene = this;

        
    }

    update () {
        
    }

}