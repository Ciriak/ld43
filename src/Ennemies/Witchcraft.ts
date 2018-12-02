import DungeonScene from "../scenes/DungeonScene";
import Ennemie from "./Ennemie";
import Phaser from "phaser";
export default class Witchcraft extends Ennemie {
  private projectiles: Phaser.Physics.Arcade.Sprite[] = [];
  projectileSpeed: number = 80;
  shootDelay: number = 3000;
  shootRepeatEvent: any = null;
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
    let witchRef = this;
    if (this.shooting) {
      return;
    } else {
      this.shooting = true;
      this.shootRepeatEvent = setTimeout(function() {
        witchRef.shootAtPlayer(player);
      }, this.shootDelay);
      this.randomMovement();
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
      "fireball"
    );

    var config = {
      key: "fireballCast",
      frames: this.scene.anims.generateFrameNumbers("fireball"),
      frameRate: 6,
      yoyo: true,
      repeat: -1
    };

    let anim = this.scene.anims.create(config);

    projectile.anims.play("fireballCast");

    this.projectiles.push(projectile);
    this.scene.physics.moveToObject(projectile, player, this.projectileSpeed);
    const ennemiRef = this;
    //collision projectile => player
    this.scene.physics.add.collider(
      projectile,
      this.scene.player.playerObject,
      function() {
        ennemiRef.giveDamageToPlayer(ennemiRef.scene.player);
        projectile.destroy();
      },
      function() {},
      function() {}
    );
    // collision projectile / walls

    //collision projectile => player
    this.scene.physics.add.collider(
      projectile,
      this.scene.dungeonLoader.groundLayer,
      function() {
        ennemiRef.giveDamageToPlayer(ennemiRef.scene.player);
        projectile.destroy();
      },
      function() {},
      function() {}
    );
  }

  randomMovement() {
    let randomVelocity = Math.floor(Math.random() * (+20 - -10)) + -10;
    this.ennemieObject.setVelocityX(randomVelocity);
    randomVelocity = Math.floor(Math.random() * (+20 - -10)) + -10;
    this.ennemieObject.setVelocityY(randomVelocity);
  }
}
