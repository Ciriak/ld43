import "phaser";

import MainScene from "./scenes/Scene";
import * as Dungeon from "@mikewesthad/dungeon";
const scale = 2;

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: "content",
  width: document.body.offsetWidth / scale,
  height: window.innerHeight / scale,
  pixelArt: true,
  zoom: scale,
  backgroundColor: "#EDEEC9",
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 20 }
    }
  }
};

const map = new Dungeon({
  width: 50,
  height: 50,
  doorPadding: 1, // Experimental, minimum number of tiles between a door and a room corner (>= 1)
  randomSeed: 0, // Leave undefined if you don't want to control the seed
  rooms: {
    width: {
      min: 5,
      max: 10,
      onlyOdd: true // Or onlyEven: true
    },
    height: {
      min: 8,
      max: 20,
      onlyOdd: true // Or onlyEven: true
    },
    maxArea: 150,
    maxRooms: 50
  }
});

// Helper method for debugging by dumping the map into an HTML fragment (<pre><table>)
const html = map.drawToHtml({
  empty: " ",
  emptyAttributes: { class: "dungeon__empty", style: "color: rgb(0, 0, 0)" },
  wall: "#",
  wallAttributes: { class: "dungeon__wall", style: "color: rgb(255, 0, 0)" },
  floor: "0",
  floorAttributes: { class: "dungeon__floor", style: "color: rgb(210, 210, 210)" },
  door: "x",
  doorAttributes: { class: "dungeon__door", style: "color: rgb(0, 0, 255)" },
  containerAttributes: { class: "dungeon", style: "font-size: 15px" }
});
document.body.appendChild(html);

map.rooms; // Array of Room instances
map.tiles; // 2D array of tile IDs - see Tile.js for types

// Get a 2D array of tiles where each tile type is remapped to a custom value. Useful if you are
// using this in a tilemap, or if you want to map the tiles to something else, e.g. this is used
// internally to convert a dungeon to an HTML string.
var mappedTiles = map.getMappedTiles({
  empty: 0,
  floor: 1,
  door: 2,
  wall: 3
});

new Phaser.Game(config);
