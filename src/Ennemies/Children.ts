import DungeonScene from "../scenes/DungeonScene";
import Ennemie from "./Ennemie";
import Phaser from "phaser";

export default class Children extends Ennemie {
  spriteName = "children";
  sanityGiven: number = 40;
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super(scene, x, y);
    const ennemiRef = this;
    this.ennemieObject = this.scene.add.sprite(x, y, "child");
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
   * Flee the player
   */
  applyPattern(
    player: Phaser.Physics.Arcade.Sprite,
    time: number,
    delta: number
  ) {
    this.fleePlayer(player);
  }

  /**
   * Move the ennemie to the player
   * @param player
   */
  fleePlayer(player: Phaser.Physics.Arcade.Sprite) {
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
