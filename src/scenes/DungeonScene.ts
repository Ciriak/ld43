
import * as Dungeon from "@mikewesthad/dungeon";

import DungeonLoader from "../dungeon/DungeonMap";
export default class DungeonScene extends Phaser.Scene {
    dungeon : Dungeon;
    dungeonLoader : DungeonLoader;
    groundLayer : any;
    stuffLayer: any;
    // ... preload omitted for brevity
  
    preload() {
        //this.load.tilemapTiledJSON("map", "/assets/tilemaps/map.json");
        this.load.image("dungeon_tiles", "../assets/tilemaps/dungeon_tiles.png");
        this.load.image("groundCollider", "/assets/sprites/groundCollider.png");
        this.load.image("player", "/assets/sprites/player.png");
      }
  
    create() {
        this.dungeonLoader = new DungeonLoader(this);
    }

    update(time, delta) {
        
      }
  
  }