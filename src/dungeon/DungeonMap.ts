import * as $ from "jquery";
import * as Dungeon from "@mikewesthad/dungeon";
export default class DungeonMap {
  map: Dungeon;
  html: any;
  constructor() {
    this.map = this.generateMap();
    this.html = this.generateMapHtml();
    this.map.rooms; // Array of Room instances
    this.map.tiles; // 2D array of tile IDs - see Tile.js for types
    
  }
  private generateMap() {
    return new Dungeon({
      width: 32,
      height: 32,
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
  }
    // Helper method for debugging by dumping the map into an HTML fragment (<pre><table>)
  private generateMapHtml() {
    return this.map.drawToHtml({
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
  }

  public addDungeonToHtml () {
    $(document.body).append(this.html);
  }
  // Get a 2D array of tiles where each tile type is remapped to a custom value. Useful if you are
  // using this in a tilemap, or if you want to map the tiles to something else, e.g. this is used
  // internally to convert a dungeon to an HTML string.
  public getMapTiles(config) {
    return this.map.getMappedTiles(config);
  }
}
  

