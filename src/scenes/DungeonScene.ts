
import * as Dungeon from "@mikewesthad/dungeon";
import TILES from "../helpers/tiledMap";
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
  
      // Generate a random world with a few extra options:
  
      //  - Rooms should only have odd dimensions so that they have a center tile.
  
      //  - Doors should be at least 2 tiles away from corners, to leave enough room for the tiles
  
      //    that we're going to put on either side of the door opening.
  
      this.dungeon = new Dungeon({
        width: 50,
        height: 50,
        doorPadding: 2,
        rooms: {
          width: { min: 9, max: 15, onlyOdd: true },
          height: { min: 9, max: 15, onlyOdd: true }
        }
      });
  
  
  
          // Creating a blank tilemap with dimensions matching the dungeon
    const map = this.make.tilemap({
        tileWidth: 16,
        tileHeight: 16,
        width: this.dungeon.width,
        height: this.dungeon.height
      });
      const tileset = map.addTilesetImage("dungeon_tiles", null, 16, 16, 0, 0); // 1px margin, 2px spacing
      this.groundLayer = map.createBlankDynamicLayer("Ground", tileset, 16, 16, 16, 16);
      this.stuffLayer = map.createBlankDynamicLayer("Stuff", tileset, 16, 16, 16, 16);
  
      this.groundLayer.fill(TILES.BLANK);



      // Use the array of rooms generated to place tiles in the map
  
      // Note: using an arrow function here so that "this" still refers to our scene
  
   // Use the array of rooms generated to place tiles in the map
    // Note: using an arrow function here so that "this" still refers to our scene
    this.dungeon.rooms.forEach(room => {
        const { x, y, width, height, left, right, top, bottom } = room;
  
        // Fill the floor with mostly clean tiles
        this.groundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, TILES.FLOOR);
  
        // Place the room corners tiles
        this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
        this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
        this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
        this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);
  
        // Fill the walls with mostly clean tiles
        this.groundLayer.weightedRandomize(left + 1, top, width - 2, 1, TILES.WALL.TOP);
        this.groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, TILES.WALL.BOTTOM);
        this.groundLayer.weightedRandomize(left, top + 1, 1, height - 2, TILES.WALL.LEFT);
        this.groundLayer.weightedRandomize(right, top + 1, 1, height - 2, TILES.WALL.RIGHT);
  
        // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
        // room's location. Each direction has a different door to tile mapping.
        var doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
        for (var i = 0; i < doors.length; i++) {
          if (doors[i].y === 0) {
            this.groundLayer.putTilesAt(TILES.DOOR.TOP, x + doors[i].x - 1, y + doors[i].y);
          } else if (doors[i].y === room.height - 1) {
            this.groundLayer.putTilesAt(TILES.DOOR.BOTTOM, x + doors[i].x - 1, y + doors[i].y);
          } else if (doors[i].x === 0) {
            this.groundLayer.putTilesAt(TILES.DOOR.LEFT, x + doors[i].x, y + doors[i].y - 1);
          } else if (doors[i].x === room.width - 1) {
            this.groundLayer.putTilesAt(TILES.DOOR.RIGHT, x + doors[i].x, y + doors[i].y - 1);
          }
        }
      });
  
    }

    update(time, delta) {
        
      }
  
  }