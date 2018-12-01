import "phaser";

import UIManager from "./UIManager";
import MainScene from "./scenes/Scene";
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

