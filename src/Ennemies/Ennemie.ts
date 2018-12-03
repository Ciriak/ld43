import DungeonScene from "../scenes/DungeonScene";
import Player from "../Player";
import Entitie from "../Entitie";
import Phaser from "phaser";
export default class Ennemie extends Entitie {
  spriteName = "ennemie";
  public scene: DungeonScene;
  public ennemieObject: any;
  public rof: number = 0.1;
  public isFollower: boolean = false;
  public canShoot: boolean = false;
  public health: number = 3;
  public currentRoom;
  public bonusText: string = "";
  public scoreGiven: number = 0;
  public isDead = false;
  public sanityGiven: number;
  public hpEnabled: boolean = false;
  private hpBar: any;
  private hpBarProgress: any;
  public reduceCoolDown: number;
  public lastPlayerPos = {
    x: 0,
    y: 0
  };
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super();
    if (!x) {
      x = 0;
    }
    if (!y) {
      y = 0;
    }
    this.scene = scene;
    this.reduceCoolDown = 0;
  }

  update(time: number, delta: number) {
    if (this.ennemieObject.active !== false) {
      this.manageHPBar();
      this.setDirectionFromVelocity(this.ennemieObject.body.velocity);
      let char = this.spriteName.charAt(0);
      if (typeof this.direction !== "undefined") {
        switch (this.direction) {
          case "left":
            this.ennemieObject.anims.play(char + "left", true);
            break;
          case "right":
            this.ennemieObject.anims.play(char + "right", true);
            break;
          case "top":
            this.ennemieObject.anims.play(char + "top", true);
            break;
          case "bottom":
            this.ennemieObject.anims.play(char + "down", true);
            break;
          default:
            this.ennemieObject.anims.play(char + "idle", true);
            break;
        }
      }

      if (this.scene.player.isDead) {
        return;
      }

      this.refreshAttack(this.scene.player, time, delta);
    }
  }

  giveDamageToPlayer(player: Player) {
    player.kill();
  }
  refreshAttack(player: Player, time: number, delta: number) {
    if (this.isInSameRoomThan(player) && this.ennemieObject.active !== false) {
      this.applyPattern(player, time, delta);
    }
  }

  private isInSameRoomThan(player: any) {
    let targetRoom = player.currentRoom;
    if (typeof targetRoom === "undefined") {
      return false;
    }
    if (player instanceof Ennemie === false) {
      targetRoom = this.scene.dungeonLoader.getPlayerRoom(player);
    }
    if (
      this.currentRoom.x === targetRoom.x &&
      this.currentRoom.y === targetRoom.y
    ) {
      return true;
    }
    return false;
  }

  /**
   * When ennemie take a damage, kill himselft if he don't have hp left
   * @param damage
   */
  takeDamage(damage: number, value) {
    if (!this.hpEnabled) {
      this.hpEnabled = true;
    }

    this.health -= damage;

    if (this.health <= 0) {
      this.kill();
    }
  }

  manageHPBar() {
    // if (!this.hpEnabled) {
    //   return;
    // }
    // let hpPos = {
    //   x: this.ennemieObject.body.position.x + 32,
    //   y: this.ennemieObject.body.position.y - 32
    // };
    // if (!this.hpBar) {
    //   this.hpBar = this.scene.physics.add.sprite(
    //     hpPos.x,
    //     hpPos.y,
    //     "hp_container"
    //   );
    //   this.hpBarProgress = this.scene.physics.add.sprite(
    //     hpPos.x,
    //     hpPos.y,
    //     "hp"
    //   );
    // }
    // //refresh bar position
    // this.hpBar.setPosition(hpPos.x, hpPos.y);
    // this.hpBarProgress.setPosition(hpPos.x, hpPos.y);
    // const hpWidth = ((this.health / 30) * 100) % 32;
    // this.hpBar.setScale(32, 3);
    // this.hpBarProgress.setScale(hpWidth, 3);
  }

  /**
   * Kill himself
   */
  kill() {
    this.addKillText();
    this.ennemieObject.destroy();
    this.scene.player.addSanity(this.sanityGiven);
    this.scene.player.decreaseCastTime(this.reduceCoolDown);
    this.scene.player.score += this.scoreGiven;
    this.scene.updateScore();
    if (this.hpBar) {
      this.hpBar.destroy();
      this.hpBarProgress.destroy();
    }

    this.isDead = true;
  }

  /**
   * Write kill text on the scene
   */
  addKillText() {
    let scoreText = this.scene.add.text(
      this.ennemieObject.body.position.x,
      this.ennemieObject.body.position.y,
      "+" + this.scoreGiven,
      { fontFamily: "Arial", fontSize: 16, color: "#ffffff" }
    );
    // animate score text
    this.scene.tweens.add({
      targets: scoreText,
      y: this.ennemieObject.body.position.y - 20,
      duration: 2000,
      alpha: 0
    });
    let statText = this.scene.add.text(
      this.ennemieObject.body.position.x,
      this.ennemieObject.body.position.y - 20,
      "+" + this.bonusText,
      { fontFamily: "Arial", fontSize: 16, color: "#1BB76E" }
    );
    // animate score text
    this.scene.tweens.add({
      targets: statText,
      y: this.ennemieObject.body.position.y - 40,
      duration: 2000,
      alpha: 0
    });
  }

  /**
   * Apply the ennemie pattern depending of his name
   */
  applyPattern(player: Player, time: number, delta: number) {}
}
