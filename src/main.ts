import "phaser";

import UIManager from "./UIManager";
import MainScene from "./scenes/Scene";
import DungeonMap from "./dungeon/DungeonMap";
const scale = 2;

export class main {
  constructor() {
    const config: GameConfig = {
      type: Phaser.AUTO,
      parent: "content",
      width: document.body.offsetWidth / scale,
      height: window.innerHeight / scale,
      pixelArt: true,
      zoom: scale,
      backgroundColor: "#EDEEC9",
      scene: [MainScene],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 20 }
        }
      }
    };

    new Phaser.Game(config);
  
    new UIManager();
  }

}
new main();

