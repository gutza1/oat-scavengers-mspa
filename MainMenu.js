class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.scenePlugin('rexuiplugin', 'rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.audio('maintheme', 'game/music/maintheme.mp3');
    }

    create() {
        this.game.sound.stopAll();
        this.sound.play('maintheme')
        console.log("MainMenuScene started");
        this.settingsOpen = false;

        gameState.menu_bg = this.add.image(160, 0, 'menu_bg');
        gameState.menu_bg.setOrigin(0, 0);

        gameState.mainlogo = this.add.image(333, 125, 'mainlogo');
        gameState.mainlogo.setOrigin(0, 0);
        
        const menuButtons = this.rexUI.add.buttons({
            x: 640, y: 375,
            orientation: 'y',
            buttons: [
                createMenuButton(this, 200, 50, 'Start Game'),
                createMenuButton(this, 200, 50, 'Settings'),
            ],
            space: { item: 15 }
        }).layout();

        menuButtons.on('button.click', function(button, index, pointer, event) {
            if (index == 0 && !this.settingsOpen) {
                this.game.sound.stopAll();
                this.scene.stop('MainMenu');
                this.scene.start('GameScene');
            } else if (index == 1 && !this.settingsOpen) {
                this.openSettingsMenu();
                this.settingsOpen = true;
            }
        }, this);
    }

    openSettingsMenu() {
        const settingsBackground = this.add.rectangle(400, 300, 300, 200, 0x000000, 0.5);
        const closeButton = this.add.text(550, 250, 'Close', { fontSize: '16px', fill: '#fff' }).setInteractive();
        const volumeLabel = this.add.text(325, 320, 'Volume:', { fontSize: '16px', fill: '#fff' });
    
        const currentFormatLabel = gameState.dateFormat === "MM/dd/yyyy" ? "MM/DD/YYYY" : "DD/MM/YYYY";
        const dateFormatLabel = this.add.text(325, 370, `${currentFormatLabel}`, { fontSize: '16px', fill: '#fff' }).setInteractive();
    
        dateFormatLabel.on('pointerdown', () => {
            if (gameState.dateFormat === "MM/dd/yyyy") {
                gameState.dateFormat = "dd/MM/yyyy";
                dateFormatLabel.setText("DD/MM/YYYY");
            } else {
                gameState.dateFormat = "MM/dd/yyyy";
                dateFormatLabel.setText("MM/DD/YYYY");
            }
        });
    
        if (this.sound.volume === undefined) {
            this.sound.volume = 0.7;
        }
    
        const volumeSlider = this.rexUI.add.slider({
            x: 400,
            y: 340,
            width: 200,
            height: 10,
            orientation: 'x',
            value: this.sound.volume,  // The initial value of the slider
            background: this.add.rectangle(0, 0, 200, 10, 0xffffff),
            track: this.add.rectangle(0, 0, 190, 10, 0x9e4f02),
            thumb: this.add.circle(0, 0, 10, 0xff0000),
            input: 'drag',
            valuechangeCallback: (value) => {
                this.sound.volume = value;
                this.sound.play('maintheme');
            }
        }).layout();
    
        closeButton.on('pointerdown', () => {
            settingsBackground.setVisible(false);
            closeButton.setVisible(false);
            volumeSlider.setVisible(false);  // Hide the rexUI slider
            volumeLabel.setVisible(false);
            this.settingsOpen = false;  // Set flag to false when settings menu is closed
            dateFormatLabel.setVisible(false); // Hide the date format label when settings are closed
        });
    }
}

const createMenuButton = function(scene, width, height, text) {
    return scene.rexUI.add.label({
        width: width,
        height: height,
        align: "center",
        background: scene.add.rectangle(0, 0, width, height, gameState.widgetForeground).setStrokeStyle(5, gameState.widgetBorder),
        text: scene.add.text(0, 0, text, {
            fontFamily: "LeagueSpartan",
            color: gameState.widgetTextColor,
            fontSize: 24
        }).setResolution(2),
    });
};
