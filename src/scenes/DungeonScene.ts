
import * as Dungeon from "@mikewesthad/dungeon";

import * as DungeonLoader from "../dungeon/DungeonMap";
export default class DungeonScene extends Phaser.Scene {
    dungeon : Dungeon;
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
        // Use the array of rooms generated to place tiles in the map
  
      // Note: using an arrow function here so that "this" still refers to our scene
   
  
    }

    update(time, delta) {
        
      }
  
  }