import "phaser";
import DungeonScene from "./scenes/DungeonScene";
const scale = 4;
let game;
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

    game = new Phaser.Game(config);
  }
}
new main();
