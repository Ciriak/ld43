import "phaser";

import MainScene from "./scenes/Scene";
const scale = 2;

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
