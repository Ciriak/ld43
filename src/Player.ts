import PlayerInputs from "./PlayerInputs";

export default class Player {
  private scene: Phaser.Scene;
  private inputsManager = new PlayerInputs();
  public playerObject: any;
  public isDead = false;
  /**
   *
   * @param scene Target scene
   * @param x x spawn position
   * @param y y spawn position
   */
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    if (!x) {
      x = 0;
    }
    if (!y) {
      y = 0;
    }
    this.scene = scene;
    this.playerObject = scene.physics.add.sprite(x, y, "player");
    this.playerObject.setCollideWorldBounds(true);
  }

  kill() {
    this.playerObject.destroy();
    this.isDead = true;
  }

  update(time: number, delta: number) {
    if (this.isDead) {
      return;
    }
    this.inputsManager.update(time, delta, this.playerObject, this.scene);
  }
}
