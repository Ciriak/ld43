import * as Dungeon from "@mikewesthad/dungeon";
import Player from "../Player";
import UIManager from "../UIManager";
import DungeonLoader from "../dungeon/DungeonMap";
import Ennemie from "../Ennemie";
export default class DungeonScene extends Phaser.Scene {
  dungeon: Dungeon;
  dungeonLoader: DungeonLoader;
  groundLayer: any;
  stuffLayer: any;
  cursors: any;
  player: any;
  ennemies: Ennemie[] = [];
  // ... preload omitted for brevity

  preload() {
    //this.load.tilemapTiledJSON("map", "/assets/tilemaps/map.json");
    this.load.image("dungeon_tiles", "../assets/tilemaps/dungeon_tiles.png");
    this.load.image("player", "/assets/sprites/player.png");
    this.load.image("ennemie", "/assets/sprites/ennemie.png");
  }

  create() {
    this.dungeonLoader = new DungeonLoader(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, 100, 50);
    this.cameras.main.startFollow(this.player.playerObject, true, 0.05, 0.05);
    this.cameras.main.setZoom(4);
    this.dungeonLoader.watchCollision(this.player);

    new UIManager(this);
    //uncomment to  enable a test ennemie
    //this.ennemies.push(new Ennemie(this));
  }

  //camera bounds

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.updateEnnemies();
    
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
