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
      up: Phaser.Input.Keyboard.KeyCodes.Z,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.Q,
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

    const xRlic = this.dungeonLoader
      .getMap()
      .tileToWorldX(this.dungeonLoader.getendingRoom().centerX);
    const YRlic = this.dungeonLoader
      .getMap()
      .tileToWorldY(this.dungeonLoader.getendingRoom().centerY);

    this.player = new Player(this, xPlayer, yPlayer);
    this.dungeonLoader.spawnRelic(xRlic, YRlic);
    this.dungeonLoader.spawnRelic(xPlayer, yPlayer);

    this.cameras.main.startFollow(this.player.playerObject, true, 0.05, 0.05);
    this.cameras.main.setZoom(1);
    this.cameras.main.fadeIn();
    this.dungeonLoader.watchCollision(this.player);

    this.uiManager = new UIManager(this);

    this.ennemies = this.dungeonLoader.spawnEnnemy();
    //this.ennemisGroup.playAnimation("idle");
    this.childGroup.playAnimation("cidle");
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
      if (!ennemie.isDead) {
        ennemie.refreshAttack(this.player.playerObject, time, delta);
      }
    }
  }

  createAnims() {
    //PLAYER ANIMS
    this.anims.create({
      key: "pidle",
      frames: this.anims.generateFrameNumbers("wizard", {start: 8, end: 9}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: "pleft",
      frames: this.anims.generateFrameNumbers("wizard", {start: 0, end: 1}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: "pright",
      frames: this.anims.generateFrameNumbers("wizard", {start: 2, end: 5}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: "ptop",
      frames: this.anims.generateFrameNumbers("wizard", {start: 6, end: 7}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: "pdown",
      frames: this.anims.generateFrameNumbers("wizard", {start: 8, end: 9}),
      frameRate: 3,
      repeat: -1
    });
    //PLAYER ANIMS END
//CHILD ANIMS
    this.anims.create({
      key: "cidle",
      frames: this.anims.generateFrameNumbers("child", {start: 17, end: 23}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: "cleft",
      frames: this.anims.generateFrameNumbers("child", {start: 5, end: 8}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: "cright",
      frames: this.anims.generateFrameNumbers("child", {start: 9, end: 12}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: "cdown",
      frames: this.anims.generateFrameNumbers("child", {start: 24, end: 27}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: "ctop",
      frames: this.anims.generateFrameNumbers("child", {start: 13, end: 16}),
      frameRate: 3,
      repeat: -1
    });
    //CHILD ANIMS END
    //Witch ANIMS
    this.anims.create({
      key: "wdown",
      frames: this.anims.generateFrameNumbers("woman", {start: 17, end:28}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: "wleft",
      frames: this.anims.generateFrameNumbers("woman", {start: 13, end:16}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: "wright",
      frames: this.anims.generateFrameNumbers("woman", {start: 9, end:12}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: "wtop",
      frames: this.anims.generateFrameNumbers("woman", {start: 0, end:8}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: "widle",
      frames: this.anims.generateFrameNumbers("woman", {start: 17, end:19}),
      frameRate: 6,
      repeat: -1
    });
//Witch ANIMS END
//knight ANIMS
    this.anims.create({
      key: "kright",
      frames: this.anims.generateFrameNumbers("knight", { start: 11, end: 14 }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: "kleft",
      frames: this.anims.generateFrameNumbers("knight", {start: 4, end: 6}),
      frameRate: 100,
      yoyo: true,
      repeat: -1
    });
    this.anims.create({
      key: "ktop",
      frames: this.anims.generateFrameNumbers("knight", {start: 7, end: 10}),
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
    this.anims.create({
      key: "kidle",
      frames: this.anims.generateFrameNumbers("knight", { start: 0, end: 2 }),
      frameRate: 5,
      yoyo: true,
      repeat: -1
    });

    //knight ANIMS END
  }

  /**
   * Restart the scene
   */
  restart() {
    //fuck this shit
    location.reload();
  }
}
