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
    this.ennemieObject = scene.physics.add.sprite(x, y, this.spriteName);

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
    if (this.isInSameRoomThan(player)) {
      this.applyPattern(player, time, delta);
    }
  }

  private isInSameRoomThan(player: any) {
    let targetRoom = player.currentRoom;
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
      console.log('dead')
      this.kill();
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
