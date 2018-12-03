import DungeonScene from "../scenes/DungeonScene";
import Ennemie from "./Ennemie";
import Phaser from "phaser";
import Player from "../Player";

export default class CloseCombat extends Ennemie {
  spriteName = "knight";
  bonusText = "Damage";
  sanityGiven: number = 3;
  speed: number;
  scoreGiven: number = 20;
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super(scene, x, y);
    this.health = 10;
    this.speed = 50;
    const ennemiRef = this;
    this.ennemieObject = this.scene.add.sprite(x, y, "knight");
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

  kill() {
    this.scene.player.giveStat("damage", 1);
    super.kill();
  }

  buff() {
    this.speed = this.speed + 10;
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
      this.scene.physics.moveToObject(this.ennemieObject, player, this.speed);
      this.lastPlayerPos = {
        x: player.x,
        y: player.y
      };
    }
  }
}
