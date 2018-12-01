import "phaser";
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
        default: "arcade"
      }
    };

    new Phaser.Game(config);
  }
}
new main();
