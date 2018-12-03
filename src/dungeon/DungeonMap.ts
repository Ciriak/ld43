import * as Dungeon from "@mikewesthad/dungeon";
import TILES from "../helpers/tiledDungeonMap";
import DungeonScene from "../scenes/DungeonScene";
import TilemapVisibility from "../helpers/tiledMapVisibility";
import CloseCombat from "../Ennemies/CloseCombat";
import Witchcraft from "../Ennemies/Witchcraft";
import Children from "../Ennemies/Children";
import Ennemie from "../Ennemies/Ennemie";
import Player from "../Player";
export default class DungeonLoader {
  dungeon: Dungeon;
  startRoom: any;
  dungeonRooms: any;
  endingRoom:any;
  groundLayer: any;
  stuffLayer: any;
  map: any;
  tileset: any;
  spawn: any;
  spawn2: any;
  protected scene: DungeonScene;
  constructor(scene: DungeonScene) {
    this.scene = scene;
    this.spawn2 = [];
    // Generate a random world with a few extra options:
    //  - Rooms should only have odd dimensions so that they have a center tile.
    //  - Doors should be at least 2 tiles away from corners, to leave enough room for the tiles
    //    that we're going to put on either side of the door opening.
    this.dungeon = new Dungeon({
      width: 60,
      height: 60,
      doorPadding: 2,
      rooms: {
        width: { min: 8, max: 10, onlyOdd: true },
        height: { min: 10, max: 12, onlyOdd: true }
      }
    });
    // Creating a blank tilemap with dimensions matching the dungeon
    this.map = scene.make.tilemap({
      tileWidth: 64,
      tileHeight: 64,
      width: this.dungeon.width,
      height: this.dungeon.height
    });
    this.startRoom = this.getDungeonRooms().shift();
    this.dungeonRooms = Phaser.Utils.Array.Shuffle(this.getDungeonRooms()).slice(
      0,
      this.getDungeonRooms().length * 0.99
    );
    this.endingRoom = Phaser.Utils.Array.RemoveRandomElement(this.getDungeonRooms());

    const tileset = this.map.addTilesetImage(
      "dungeon_tiles",
      null,
      64,
      64,
      0,
      0
    ); // 1px margin, 2px spacing
    this.scene.groundLayer = this.map.createBlankDynamicLayer(
      "Ground",
      tileset
    );
    this.stuffLayer = this.map.createBlankDynamicLayer("Stuff", tileset);
    this.generateFogOfWar(tileset);
    this.renderRooms();
    this.renderOtherRooms();
    this.generateSpawn();
    this.scene.groundLayer.setCollisionByExclusion([
      52,53,54,55,56,57,58,59,26,27,28,29
    ]);
  }

  private renderRooms() {
    this.scene.wallGroup = this.scene.physics.add.staticGroup();
    // Use the array of rooms generated to place tiles in the map
    // Note: using an arrow function here so that "this" still refers to our scene
    this.dungeon.rooms.forEach(room => {
      const { x, y, width, height, left, right, top, bottom } = room;

      // Fill the floor with mostly clean tiles
      this.scene.groundLayer.weightedRandomize(
        x + 1,
        y + 1,
        width - 2,
        height - 2,
        TILES.FLOOR
      );

      // Place the room corners tiles
      this.scene.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
      this.scene.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
      this.scene.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
      this.scene.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

      // Fill the walls with mostly clean tiles
      let topWall = this.scene.groundLayer.weightedRandomize(
        left + 1,
        top,
        width - 2,
        1,
        TILES.WALL.TOP
      );
      this.scene.groundLayer.weightedRandomize(
        left + 1,
        bottom,
        width - 2,
        1,
        TILES.WALL.BOTTOM
      );
      this.scene.groundLayer.weightedRandomize(
        left,
        top + 1,
        1,
        height - 2,
        TILES.WALL.LEFT
      );
      this.scene.groundLayer.weightedRandomize(
        right,
        top + 1,
        1,
        height - 2,
        TILES.WALL.RIGHT
      );

      // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
      // room's location. Each direction has a different door to tile mapping.
      var doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
      for (var i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
          this.scene.groundLayer.putTilesAt(
            TILES.DOOR.TOP,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].y === room.height - 1) {
          this.scene.groundLayer.putTilesAt(
            TILES.DOOR.BOTTOM,
            x + doors[i].x - 1,
            y + doors[i].y
          );
        } else if (doors[i].x === 0) {
          this.scene.groundLayer.putTilesAt(
            TILES.DOOR.LEFT,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        } else if (doors[i].x === room.width - 1) {
          this.scene.groundLayer.putTilesAt(
            TILES.DOOR.RIGHT,
            x + doors[i].x,
            y + doors[i].y - 1
          );
        }
      }
    });
    let wallIndex = [65,66,67,68,69,70,71,72,73,74,75,76,77];
    this.scene.groundLayer.forEachTile(tile => {
      if (wallIndex.includes(tile.index)) {
        // A sprite has its origin at the center, so place the sprite at the center of the tile
        const x = tile.getCenterX();
        const y = tile.getCenterY();
        this.scene.wallGroup.create(x, y, "collisionWall");
      }
    });
  }

  public spawnRelic(x, y) {
    console.log('relic spawn');
    var rand = Math.random();
    if(rand <= 0.25) {
      let spriteName = 'eye_relic';
    }else if(rand <=0.50) {
      let spriteName = 'foot_relic';
    }else if(rand <= 0.75){
      let spriteName = 'hand_relic';
    }else{
      let spriteName = 'heart_relic';

    }
    let relic = this.scene.physics.add.sprite(x, y, spriteName);
    relic.name = spriteName;
    this.scene.relicGroup.add(relic);
  }
//This = Scene
  collectRelic(player, relic){
    console.log("relic collected");
    console.log(relic.name);
    switch (relic.name) {
      case "eye_relic":
      this.player.decreaseCastTime(5000);
        break;
      case "foot_relic":
        this.player.giveStat('speed', 5);
        break;
      case "hand_relic":
      this.player.giveStat('damage', 5);
        break;
      case "heart_relic":
      this.player.kill();
        break;
      default:
        break;
    }
    this.buffMonsters();
    relic.destroy();
  }

  private renderOtherRooms() {
    // Place stuff in the 90% "otherRooms"
    this.getOtherRooms().forEach(room => {
      const { x, y, width, height, left, right, top, bottom } = room;
      var rand = Math.random();
      if (rand <= 0.15) {
        const tx = Phaser.Math.Between(left + 1, right - 1);
        const ty = Phaser.Math.Between(top + 1, bottom - 1);
        this.stuffLayer.weightedRandomize(tx, ty, 1, 1, TILES.POT);
        this.spawnRelic(tx, ty)
        // 25% chance of chest
        // this.stuffLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
      } else if (rand <= 0.8) {
        
        // 50% chance of a pot anywhere in the room... except don't block a door!

      } else {
        // 25% of either 2 or 4 towers, depending on the room size
      }
    });
  }

  private generateSpawn() {
    // Place stuff in the 90% "otherRooms"
    this.getOtherRooms().forEach(room => {
      let { x, y, width, height, left, right, top, bottom } = room;
      var rand = Math.random();
      if (rand <= 0.25) {
        for (let i =0; i < 5; i++) {
          const tx = Phaser.Math.Between(left + 2, right - 2);
          const ty = Phaser.Math.Between(top + 2, bottom - 2);
          this.spawn2.push({ x: tx, y: ty });
        }

      } else if (rand <= 0.5) {
        for (let i =0; i < 2; i++) {
          const tx = Phaser.Math.Between(left + 2, right - 2);
          const ty = Phaser.Math.Between(top + 2, bottom - 2);
          this.spawn2.push({ x: tx, y: ty });
        }
      } else {
        for (let i =0; i < 1; i++) {
          const tx = Phaser.Math.Between(left + 2, right - 2);
          const ty = Phaser.Math.Between(top + 2, bottom - 2);
          this.spawn2.push({ x: tx, y: ty });
        }
      }
    });
  }

  public spawnEnnemy() {
    let tabEnnemy = [];
    let mapRef = this;
    console.log(this.spawn2);
    this.spawn2.forEach(spawn => {
      const possibleEnnemiesList = ["Witchcraft", "CloseCombat", "Children"];
      const pickedEnnemieClassName =
        possibleEnnemiesList[
          Math.floor(Math.random() * possibleEnnemiesList.length)
        ];
        let pRoom = this.scene.dungeonLoader.getPlayerRoom(this.scene.player);
      
        const playerTileX = this.scene.groundLayer.tileToWorldX(spawn.x);
        const playerTileY = this.scene.groundLayer.tileToWorldY(spawn.y);
        const x = this.scene.groundLayer.worldToTileX(playerTileX);
        const y = this.scene.groundLayer.worldToTileY(playerTileY);
        const eRoom = this.dungeon.getRoomAt(x, y);
        //Check if the ennemy will spawn on the player and prevent it
        if (eRoom !== pRoom) {
        let badBoy: Ennemie;
        switch (pickedEnnemieClassName) {
          case "Witchcraft":
            badBoy = new Witchcraft(this.scene, spawn.x *64 , spawn.y *64);
            badBoy.currentRoom = this.getEnnemieRoom(badBoy);
            this.scene.witchGroup.add(badBoy.ennemieObject);
            break;
          case "CloseCombat":
            badBoy = new CloseCombat(this.scene, spawn.x *64, spawn.y *64);
            badBoy.currentRoom = this.getEnnemieRoom(badBoy);
            this.scene.knightGroup.add(badBoy.ennemieObject);
            break;
          case "Children":
            badBoy = new Children(this.scene, spawn.x*64 , spawn.y *64);
            badBoy.currentRoom = this.getEnnemieRoom(badBoy);
            this.scene.childGroup.add(badBoy.ennemieObject);
            break;

          default:
            break;
        }
        this.scene.ennemisGroup.add(badBoy.ennemieObject);
        mapRef.watchCollisionEnnemy(badBoy);
        tabEnnemy.push(badBoy);
      }
    });
    return tabEnnemy;
  }

  public getMap() {
    return this.map;
  }

  private generateFogOfWar(tileset) {
    const shadowLayer = this.getMap().createBlankDynamicLayer(
      "Shadow",
      tileset
    );
    // Set the "z-index"
    shadowLayer.setDepth(50);
    shadowLayer.fill(TILES.BLANK);
    this.scene.tilemapVisibility = new TilemapVisibility(shadowLayer);
  }

  private getDungeonRooms() {
    // Separate out the rooms into:
    //  - The starting room (index = 0)
    //  - A random room to be designated as the end room (with stairs and nothing else)
    //  - An array of 90% of the remaining rooms, for placing random stuff (leaving 10% empty)
    return this.dungeon.rooms.slice();
  }

  public getstartingRoom() {
    return this.startRoom;
  }

  public getendingRoom() {
    return this.endingRoom;
  }

  public getOtherRooms() {
    return this.dungeonRooms;
  }

  public getPlayerRoom(player: Player) {
    let target = player.playerObject;
    if (player instanceof Player === false) {
      target = player;
    }
    // Find the player's room using another helper method from the dungeon that converts from
    // dungeon XY (in grid units) to the corresponding room object
    const playerTileX = this.scene.groundLayer.worldToTileX(target.x);
    const playerTileY = this.scene.groundLayer.worldToTileY(target.y);
    const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);
    return playerRoom;
  }

  public getEnnemieRoom(ennemie: Ennemie) {
    // Find the ennemie's room using another helper method from the dungeon that converts from
    // dungeon XY (in grid units) to the corresponding room object
    const ennemieTileX = this.scene.groundLayer.worldToTileX(
      ennemie.ennemieObject.x
    );
    const ennemieTileY = this.scene.groundLayer.worldToTileY(
      ennemie.ennemieObject.y
    );
    const ennemieRoom = this.dungeon.getRoomAt(ennemieTileX, ennemieTileY);
    return ennemieRoom;
  }

  public watchCollision(player) {
    // Watch the player and ground layer for collisions, for the duration of the scene:
    this.scene.physics.add.collider(
      player.playerObject,
      this.scene.groundLayer
    );
  }

  public watchCollisionEnnemy(ennemy) {
    // Watch the ennemy and ground layer for collisions, for the duration of the scene:
    this.scene.physics.add.collider(
      ennemy.ennemieObject,
      this.scene.groundLayer
    );
    this.scene.physics.add.collider(
      ennemy.ennemieObject,
      this.scene.spellsCasted,
      this.test,
      null,
      ennemy
    );
  }

  public test(target, spell) {
    this.takeDamage(spell.spellInfo.damage);
    if (this.isDead) {
      target.destroy();
    }
    spell.destroy();
  }
}
