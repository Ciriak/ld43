declare let game;
import DungeonScene from "../scenes/DungeonScene";
import Ennemie from "./Ennemie";
import Phaser from "phaser";
export default class Witchcraft extends Ennemie {
  private projectiles: Phaser.Physics.Arcade.Sprite[];
  projectileSpeed: number = 30;
  private shooting: boolean = false;
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super(scene, x, y);
  }

  /**
   * shoot at the player
   */
  applyPattern(
    player: Phaser.Physics.Arcade.Sprite,
    time: number,
    delta: number
  ) {
    if (this.shooting) {
      return;
    } else {
      game.time.events.repeat(
        Phaser.Timer.SECOND * 2,
        1,
        this.shootAtPlayer(player),
        this
      );
    }
  }
  /**
   * shoot a projectil at the player
   * @param player
   */
  shootAtPlayer(player: Phaser.Physics.Arcade.Sprite) {
    this.shooting = false;
    let projectile = this.scene.physics.add.sprite(
      this.ennemieObject.x,
      this.ennemieObject.y,
      "ennemieProjectile"
    );

    this.projectiles.push(projectile);
    this.scene.physics.moveToObject(projectile, player, this.projectileSpeed);
    const ennemiRef = this;

    this.scene.physics.add.collider(
      projectile,
      this.scene.player.playerObject,
      function() {
        ennemiRef.giveDamageToPlayer(this.scene.player);
        projectile.destroy();
      },
      function() {},
      function() {}
    );
  }
}
