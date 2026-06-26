const DateTime = luxon.DateTime

const gameState = {
    render: {
        pixelArt: true
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'game_container',
    width: 1280,
    height: 720,
    antiAlias: true,
    gameVersion: "0.01",
    scene: [GameLoader, MainMenu, GameScene, UIScene],
};

const game = new Phaser.Game(config);