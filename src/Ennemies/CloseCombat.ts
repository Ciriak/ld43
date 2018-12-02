import DungeonScene from "../scenes/DungeonScene";
import Ennemie from "./Ennemie";
import Phaser from "phaser";

export default class CloseCombat extends Ennemie {
  spriteName = "closeCombat";
  sanityGiven: number = 5;
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super(scene, x, y);
  }

  /**
   * Move to the player
   */
  applyPattern(
    player: Phaser.Physics.Arcade.Sprite,
    time: number,
    delta: number
  ) {
    this.moveToPlayer(player);
  }

  /**
   * Move the ennemie to the player
   * @param player
   */
  moveToPlayer(player: Phaser.Physics.Arcade.Sprite) {
    if (
      player.x !== this.lastPlayerPos.x ||
      player.y !== this.lastPlayerPos.y
    ) {
      this.scene.physics.moveToObject(this.ennemieObject, player, 50);
      this.lastPlayerPos = {
        x: player.x,
        y: player.y
      };
    }
  }
}
