import "phaser";

import UIManager from "./UIManager";
import MainScene from "./scenes/Scene";
import DungeonScene from "./scenes/DungeonScene";
const scale = 4;

export class main {
  constructor() {
    const config: GameConfig = {
      type: Phaser.AUTO,
      parent: "content",
      width: document.body.offsetWidth,
      height: window.innerHeight,
      pixelArt: true,
      zoom: scale,
      backgroundColor: "#000000",
      scene: [DungeonScene],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }
        }
      }
    };

    new Phaser.Game(config);

    new UIManager();
  }
}
new main();
