import PlayerInputs from "./PlayerInputs";
import DungeonScene from "./scenes/DungeonScene";
export default class Player {
  private scene: DungeonScene;
  private inputsManager: PlayerInputs;
  public playerObject: any;
  public isDead = false;
  public currentRoom;
  /**
   *
   * @param scene Target scene
   * @param x x spawn position
   * @param y y spawn position
   */
  constructor(scene: DungeonScene, x?: number, y?: number) {
    this.inputsManager = new PlayerInputs();
    if (!x) {
      x = 0;
    }
    if (!y) {
      y = 0;
    }
    this.scene = scene;
    this.playerObject = scene.physics.add.sprite(x, y, "player");
  }

  kill() {
    this.playerObject.destroy();
    this.isDead = true;
    this.scene.uiManager.startDeathScreen();
  }

  update(time: number, delta: number) {
    if (this.isDead) {
      return;
    }
    this.inputsManager.update(time, delta, this.playerObject, this.scene);
  }

  castSpell() {}
}
