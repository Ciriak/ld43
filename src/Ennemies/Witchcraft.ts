import DungeonScene from "../scenes/DungeonScene";
import Ennemie from "./Ennemie";
import Phaser from "phaser";
import Player from "../Player";
export default class Witchcraft extends Ennemie {
  spriteName = "witchcraft";
  private projectiles: Phaser.Physics.Arcade.Sprite[] = [];
  projectileSpeed: number = 100;
  shootDelay: number = 1500;
  shootRepeatEvent: any = null;
  sanityGiven: number = 2;
  bonusText: string = "Rate of fire";
  scoreGiven: number = 10;
  private shooting: boolean = false;
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super(scene, x, y);
    const ennemiRef = this;
    this.health = 5;
    this.ennemieObject = this.scene.add.sprite(x, y, "woman");
    this.reduceCoolDown = 20;
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
   * shoot at the player
   */
  applyPattern(player: Player, time: number, delta: number) {
    let witchRef = this;
    if (this.shooting) {
      return;
    } else {
      this.shooting = true;
      this.shootRepeatEvent = setTimeout(function() {
        witchRef.shootAtPlayer(player.playerObject);
      }, this.shootDelay);
      this.randomMovement();
    }
  }
  /**
   * shoot a projectil at the player
   * @param player
   */
  shootAtPlayer(player: Phaser.Physics.Arcade.Sprite) {
    if (this.isDead) {
      this.shooting = false;
      return;
    }
    this.shooting = false;
    let projectile = this.scene.physics.add.sprite(
      this.ennemieObject.x,
      this.ennemieObject.y,
      "fireball"
    );

    projectile.setScale(0.5, 0.5);

    let sound = this.scene.sound.add("fireball");

    sound.play();

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
    this.scene.physics.add.collider(
      projectile,
      this.scene.wallGroup,
      this.scene.checkHitWall,
      null,
      this.scene
    );
    //collision projectile => player
    //destroy after 5 seconds
    setTimeout(function() {
      projectile.destroy();
    }, 5000);
  }

  buff() {
    this.shootDelay = this.shootDelay - 100;
  }

  kill() {
    clearTimeout(this.shootRepeatEvent);
    this.scene.player.giveStat("rof", 1);
    super.kill();
  }

  randomMovement() {
    let randomVelocity = Math.floor(Math.random() * (+20 - -10)) + -10;
    this.ennemieObject.body.setVelocityX(randomVelocity);
    randomVelocity = Math.floor(Math.random() * (+20 - -10)) + -10;
    this.ennemieObject.body.setVelocityY(randomVelocity);
  }
}
