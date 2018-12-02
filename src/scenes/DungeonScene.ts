import * as Dungeon from "@mikewesthad/dungeon";
import Player from "../Player";
import UIManager from "../UIManager";
import DungeonLoader from "../dungeon/DungeonMap";
import Ennemie from "../Ennemies/Ennemie";
import ResourcesLoader from "../ResourcesLoader";

import Spell from "../spells/Spell";
export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({
      key: "DungeonScene"
    });
  }

  dungeon: Dungeon;
  dungeonLoader: DungeonLoader;
  groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  stuffLayer: any;
  cursors: any;
  player: Player;
  uiManager: UIManager;
  ennemies: Ennemie[] = [];
  tilemapVisibility: any;
  spellsCasted: any;
  wallGroup: any;
  ennemisGroup: any;
  childGroup: any;
  knightGroup: any;
  witchGroup: any;

  preload() {
    new ResourcesLoader(this);
  }

  create() {
    this.ennemies = [];
    this.player = null;
    this.cursors = null;
    this.dungeonLoader = new DungeonLoader(this);
    this.createAnims();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.spellsCasted = this.physics.add.group();
    this.ennemisGroup = this.physics.add.group();
    this.childGroup = this.physics.add.group();
    this.knightGroup = this.physics.add.group();
    this.witchGroup = this.physics.add.group();

    const xPlayer = this.dungeonLoader
      .getMap()
      .tileToWorldX(this.dungeonLoader.getstartingRoom().centerX);
    const yPlayer = this.dungeonLoader
      .getMap()
      .tileToWorldY(this.dungeonLoader.getstartingRoom().centerY);

    this.player = new Player(this, xPlayer, yPlayer);
    this.cameras.main.startFollow(this.player.playerObject, true, 0.05, 0.05);
    this.cameras.main.setZoom(1);
    this.cameras.main.fadeIn();
    this.dungeonLoader.watchCollision(this.player);

    this.uiManager = new UIManager(this);

    this.ennemies = this.dungeonLoader.spawnEnnemy();
    //this.ennemisGroup.playAnimation("idle");
    this.childGroup.playAnimation("cdown");
    this.knightGroup.playAnimation("kdown");
    this.witchGroup.playAnimation("widle");

    this.physics.add.collider(
      this.spellsCasted,
      this.wallGroup,
      this.checkHitWall,
      null,
      this
    );
  }

  //camera bounds

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.updateEnnemies(time, delta);
    const currentPlayerRoom = this.dungeonLoader.getPlayerRoom(this.player);
    this.tilemapVisibility.setActiveRoom(currentPlayerRoom);

    this.player.currentRoom = currentPlayerRoom;
  }

  checkHitWall(sprite) {
    sprite.destroy();
  }

  /**
   * Update all ennemies attack pattern, called each frame
   */

  updateEnnemies(time: number, delta: number) {
    for (let i = 0; i < this.ennemies.length; i++) {
      const ennemie = this.ennemies[i];
      ennemie.update(time, delta);
      if (ennemie.isDead) {
        ennemie.kill();
        this.ennemies.splice(i, 1);
      } else {
        ennemie.refreshAttack(this.player.playerObject, time, delta);
      }
    }
  }

  createAnims() {
    this.anims.create({
      key: "widle",
      frames: this.anims.generateFrameNumbers("wizard"),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: "cdown",
      frames: this.anims.generateFrameNumbers("child"),
      frameRate: 3,
      repeat: -1
    });

    this.anims.create({
      key: "kright",
      frames: this.anims.generateFrameNumbers("knight", { start: 11, end: 14 }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("knight"),
      frameRate: 100,
      yoyo: true,
      repeat: -1
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("knight"),
      frameRate: 100,
      yoyo: true,
      repeat: -1
    });
    this.anims.create({
      key: "kdown",
      frames: this.anims.generateFrameNumbers("knight", { start: 0, end: 2 }),
      frameRate: 5,
      yoyo: true,
      repeat: -1
    });
  }

  /**
   * Restart the scene
   */
  restart() {
    //fuck this shit
    location.reload();
  }
}
