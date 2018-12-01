import DungeonScene from "../scenes/DungeonScene";
import Player from "../Player";
import Phaser from "phaser";
export default class Ennemie {
  public scene: DungeonScene;
  public ennemieObject: any;
  public rof: number = 0.1;
  public isFollower: boolean = false;
  public canShoot: boolean = false;
  public health: number = 1;
  public isDead = false;
  private lastPlayerPos = {
    x: 0,
    y: 0
  };
  constructor(scene: DungeonScene, x?: number, y?: number) {
    if (!x) {
      x = 0;
    }
    if (!y) {
      y = 0;
    }
    this.scene = scene;
    this.ennemieObject = scene.physics.add.sprite(x, y, "ennemie");

    const ennemiRef = this;

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

  giveDamageToPlayer(player: Player) {
    player.kill();
  }
  refreshAttack(
    player: Phaser.Physics.Arcade.Sprite,
    time: number,
    delta: number
  ) {
    this.applyPattern(player, time, delta);
  }

  /**
   * When ennemie take a damage, kill himselft if he don't have hp left
   * @param damage
   */
  takeDamage(damage: number) {
    this.health -= damage;
    if (this.health <= 0) {
      this.kill;
    }
  }

  /**
   * Kill himself
   */
  kill() {
    this.ennemieObject.destroy();
    this.isDead = true;
  }

  /**
   * Apply the ennemie pattern depending of his name
   */
  applyPattern(
    player: Phaser.Physics.Arcade.Sprite,
    time: number,
    delta: number
  ) {}
}
