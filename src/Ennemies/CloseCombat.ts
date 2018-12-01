import DungeonScene from "../scenes/DungeonScene";
import Ennemie from "./Ennemie";

export default class CloseCombat extends Ennemie {
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super(scene, x, y);
  }

  /**
   * Move to the player
   */
  applyPattern(player: Phaser.Physics.Arcade.Sprite) {
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
