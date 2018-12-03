import DungeonScene from "../scenes/DungeonScene";
import Ennemie from "./Ennemie";
import Phaser from "phaser";
import Player from "../Player";

export default class CloseCombat extends Ennemie {
  spriteName = "closeCombat";
  sanityGiven: number = 30;
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super(scene, x, y);
    this.ennemieObject = this.scene.add.sprite(x, y, "knight");
    const ennemiRef = this;
    this.reduceCoolDown = 5;
    scene.physics.add.collider(
      this.ennemieObject,
      scene.player.playerObject,
      function() {
        ennemiRef.giveDamageToPlayer(scene.player);
      },
      function() {},
      function() {}
    );
  }

  /**
   * Move to the player
   */
  applyPattern(player: Player, time: number, delta: number) {
    this.moveToPlayer(player.playerObject);
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
