import PlayerInputs from "./PlayerInputs";
import Entitie from "./Entitie";
import DungeonScene from "./scenes/DungeonScene";
export default class Player extends Entitie {
  private scene: DungeonScene;
  private inputsManager: PlayerInputs;
  public playerObject: any;
  public isDead = false;
  public sanity: number = 0;
  public currentRoom;
  private sanityCooldown;
  /**
   *
   * @param scene Target scene
   * @param x x spawn position
   * @param y y spawn position
   */
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super();
    this.inputsManager = new PlayerInputs();
    if (!x) {
      x = 0;
    }
    if (!y) {
      y = 0;
    }
    this.scene = scene;
    this.playerObject = this.scene.physics.add.sprite(x, y, "wizard");
    const playerRef = this;
    this.sanityCooldown = setInterval(function() {
      if (playerRef.sanity > 0) {
        playerRef.sanity -= 1;
        playerRef.scene.uiManager.updateSanity(playerRef.sanity);
      }
    }, 500);
  }

  kill() {
    this.playerObject.destroy();
    this.isDead = true;
    let sound = this.scene.sound.add("playerDead");
    sound.play();
    this.scene.uiManager.startDeathScreen();
  }

  /**
   * add x amount of sanity to the player
   * @param amount
   */
  addSanity(amount: number) {
    this.sanity += amount;
    this.scene.uiManager.updateSanity(this.sanity);
  }

  update(time: number, delta: number) {
    if (this.isDead) {
      return;
    }
    this.inputsManager.update(time, delta, this, this.scene);
  }

  castSpell() {}
}
