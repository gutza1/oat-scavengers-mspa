import Phaser from 'phaser';
import RexUIPlugin from 'phaser4-rex-plugins/templates/ui/ui-plugin.js';
import BBCodeTextPlugin from 'phaser4-rex-plugins/plugins/bbcodetext-plugin.js';

import GameLoader from './scenes/GameLoader';
import GameScene from './scenes/GameScene';
import MainMenu from './scenes/MainMenu';
import UIScene from './scenes/UIScene';

window.gameState = {
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
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: RexUIPlugin,
      mapping: 'rexUI'
    }],
    global: [{
      key: 'rexBBCodeTextPlugin',
      plugin: BBCodeTextPlugin,
      start: true
    }
    ]
  }
};

const game = new Phaser.Game(config);
