import PlayerInputs from "./PlayerInputs";
import Entitie from "./Entitie";
import DungeonScene from "./scenes/DungeonScene";
export default class Player extends Entitie {
  private scene: DungeonScene;
  private inputsManager: PlayerInputs;
  public playerObject: any;
  public isDead = false;
  public sanity: number = 0;
  public speed: number = 0;
  public rof: number = 0;
  public damage: number = 0;
  public currentRoom;
  public onCd: boolean;
  public cd: number;
  public score: number = 0;
  private castTime: number;

  /**
   *
   * @param scene Target scene
   * @param x x spawn position
   * @param y y spawn position
   */
  constructor(scene: DungeonScene, x?: number, y?: number) {
    super();
    this.inputsManager = new PlayerInputs(scene, this);
    if (!x) {
      x = 0;
    }
    if (!y) {
      y = 0;
    }
    this.scene = scene;
    this.onCd = false;
    this.cd = 2500;
    this.castTime = 2500;
    this.playerObject = this.scene.physics.add.sprite(x, y, "wizard");

    this.playerObject.body.setSize(32, 45);
    this.playerObject.body.setOffset(32 / 2, 64 - 45);
    const playerRef = this;
    this.currentRoom = this.scene.dungeonLoader.getPlayerRoom(this);

    // update dir
    scene.input.on(
      "pointermove",
      function(pointer) {
        playerRef.updateDirection(pointer);
      },
      this
    );
  }

  /**
   * Update the player watch direction according to the cursor position
   * @param pointer
   */
  updateDirection(pointer) {
    // retrieve angle between cursor and player

    const angle = Phaser.Math.Angle.Between(
      screen.width / 2,
      screen.height / 2,
      pointer.position.x,
      pointer.position.y
    );

    if (angle > -0.9 && angle < 0.45) {
      this.direction = "right";
      return;
    }
    if (angle > 0.45 && angle < 3) {
      this.direction = "down";
      return;
    }
    if (angle > -3 && angle < -2) {
      this.direction = "left";
      return;
    }
    if (angle > -2 && angle < -0.45) {
      this.direction = "up";
      return;
    }
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
  decreaseCastTime(amount: number) {
    if (this.castTime > amount) {
      this.castTime -= amount;
    } else {
      this.castTime = 0;
    }
  }
  /**
   * Increase a specific stat
   * @param stat propertie name
   * @param value increase value
   */
  giveStat(stat: string, value: number) {
    if (typeof this[stat] !== "undefined") {
      //can't have more than 5
      if (this[stat] >= 5) {
        return;
      }
      this[stat] = this[stat] + value;
      this.scene.uiManager.updateStat(stat, this[stat]);
    }
  }

  update(time: number, delta: number) {
    if (this.isDead) {
      return;
    }
    if (this.checkCD()) {
      if (this.cd > 0) {
        this.cd -= delta;
      } else {
        this.cd = this.castTime;
        this.setonCd();
      }
    }
    this.inputsManager.update(time, delta, this, this.scene);
  }
  setonCd() {
    this.onCd = !this.onCd;
  }

  /**
   * Reset a stat, low the sanity and add a score bonus
   * @param stat
   */
  sacrifical(stat) {
    //reset player stat
    if (typeof this[stat] !== "undefined") {
      if (this[stat] >= 5) {
        this[stat] = 0;
        this.scene.uiManager.updateStat(stat, 0);
      }
    }
  }

  checkCD() {
    return this.onCd;
  }

  castSpell() {}
}
