export default class Ennemie {
  private scene: Phaser.Scene;
  public ennemieObject: any;
  public rof: number = 0.1;
  public followPlayer: boolean = false;
  public health: number = 1;
  private lastPlayerPos = {
    x: 0,
    y: 0
  };
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    if (!x) {
      x = 0;
    }
    if (!y) {
      y = 0;
    }
    this.scene = scene;
    this.ennemieObject = scene.physics.add.sprite(x, y, "ennemie");
  }
  refreshAttack(player: Phaser.Physics.Arcade.Sprite) {
    // only if this is a "follower" ennemie
    if (this.followPlayer) {
      this.moveToPlayer(player);
    }
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
   * Move the ennemie to the player
   * @param player
   */
  private moveToPlayer(player: Phaser.Physics.Arcade.Sprite) {
    if (
      player.x !== this.lastPlayerPos.x ||
      player.y !== this.lastPlayerPos.y
    ) {
      this.scene.physics.moveToObject(this.ennemieObject, player, 30);
      this.lastPlayerPos = {
        x: player.x,
        y: player.y
      };
    }
  }

  /**
   * Kill himself
   */
  kill() {
    this.ennemieObject.destroy();
  }
}
