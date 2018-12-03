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
  public isDead = false;
  public sanityGiven: number;
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
      this.setDirectionFromVelocity(this.ennemieObject.body.velocity);
      let char = this.spriteName.charAt(0);
      switch (this.direction) {
        case "left":
          this.ennemieObject.anims.play(char + "left", true);
          break;
        case "right":
          this.ennemieObject.anims.play(char + "right", true);
          break;
        case "top":
        this.ennemieObject.anims.play(char+"top", true);
          break;
        case "bottom":
          this.ennemieObject.anims.play(char + "down", true);
          break;
        default:
          this.ennemieObject.anims.play(char + "idle", true);
          break;
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
    this.health -= damage;
    if (this.health <= 0) {
      this.kill();
    }
  }

  /**
   * Kill himself
   */
  kill() {
    this.ennemieObject.destroy();
    this.scene.player.addSanity(this.sanityGiven);
    this.scene.player.decreaseCastTime(this.reduceCoolDown);
    this.isDead = true;
  }

  /**
   * Apply the ennemie pattern depending of his name
   */
  applyPattern(player: Player, time: number, delta: number) {}
}
