import * as Dungeon from "@mikewesthad/dungeon";
import Player from "../Player";
import UIManager from "../UIManager";
import DungeonLoader from "../dungeon/DungeonMap";
import Ennemie from "../Ennemie";
import ResourcesLoader from "../ResourcesLoader";
export default class DungeonScene extends Phaser.Scene {
  dungeon: Dungeon;
  dungeonLoader: DungeonLoader;
  groundLayer: any;
  stuffLayer: any;
  cursors: any;
  player: any;
  ennemies: Ennemie[] = [];
  tilemapVisibility: any;
  // ... preload omitted for brevity

  preload() {
    new ResourcesLoader(this);
  }

  create() {
    this.dungeonLoader = new DungeonLoader(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    const xPlayer = this.dungeonLoader
      .getMap()
      .tileToWorldX(this.dungeonLoader.getstartingRoom().centerX);
    const yPlayer = this.dungeonLoader
      .getMap()
      .tileToWorldY(this.dungeonLoader.getstartingRoom().centerY);
    this.player = new Player(this, xPlayer, yPlayer);
    this.cameras.main.startFollow(this.player.playerObject, true, 0.05, 0.05);
    this.cameras.main.setZoom(4);
    this.dungeonLoader.watchCollision(this.player);

    new UIManager(this);
    //uncomment to  enable a test ennemie
    this.ennemies.push(new Ennemie(this));
  }

  //camera bounds

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.updateEnnemies();
    
    this.tilemapVisibility.setActiveRoom(this.dungeonLoader.getPlayerRoom(this.player));
  }

  /**
   * Update all ennemies attack pattern, called each frame
   */

  updateEnnemies() {
    for (let i = 0; i < this.ennemies.length; i++) {
      const ennemie = this.ennemies[i];
      ennemie.refreshAttack(this.player.playerObject);
    }
  }
}
