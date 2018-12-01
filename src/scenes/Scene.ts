let player: any;
import DungeonMap from "../dungeon/DungeonMap";

class MainScene extends Phaser.Scene {
  gridUnit: 8;
  cursors: any;
  groundCollider: any;
  DungeonRandom: DungeonMap;
  map: Phaser.Tilemaps.Tilemap;
  groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  maxCoordinates = {
    x: 500,
    y: window.innerHeight
  };

  constructor() {
    super({
      key: "MainScene"
    });
    this.DungeonRandom = new DungeonMap();
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/tilemaps/map.json");
    this.load.image("tiles", "/assets/tilemaps/dungeon_tiles.png");
    this.load.image("groundCollider", "/assets/sprites/groundCollider.png");
    this.load.image("player", "/assets/sprites/player.png");
  }

  create() {
    player = this.physics.add.sprite(0, -100, "player");
    player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(player, false);
    this.cameras.main.setBounds(0, window.innerHeight, 500, 500);

    this.createMap();
  }

  update(time: number, delta: number) {
    if (this.cursors.left.isDown) {
      player.x -= 5;
    }
    if (this.cursors.right.isDown) {
      player.x += 5;
    }
    if (this.cursors.down.isDown) {
      player.y += 5;
    }
    if (this.cursors.up.isDown) {
      player.y -= 5;
    }
    this.generate();
    this.setGroundCollider();

    this.physics.add.collider(player, this.groundCollider, null, null, null);
  }

  /**
   * create the initial map
   */
  createMap() {
    let dungeon = this.DungeonRandom.map;
    this.map = this.make.tilemap({
      tileWidth: 48,

      tileHeight: 48,

      width: dungeon.width,

      height: dungeon.height
    });

    const tileset = this.map.addTilesetImage("tiles", null, 48, 48, 1, 2);

    this.groundLayer = this.map.createBlankDynamicLayer(
      "layer",
      tileset,
      null,
      null,
      null,
      null
    );
    console.log(this.groundLayer);
  }

  /**
   * Generate blocs when camera move
   */

  generate() {
    if (!this.map) {
      return;
    }

    // Turn the dungeon into a 2D array of tiles where each of the four types of tiles is mapped to a

    // tile index within our tileset. Note: using -1 for empty tiles means they won't render.

    const mappedTiles = this.DungeonRandom.getMapTiles({
      empty: -1,
      floor: 6,
      door: 6,
      wall: 20
    });
    const camera = this.cameras.main;
    let coordinates = {
      x: camera.width + camera.x,
      y: camera.height + camera.y
    };

    //update the values
    while (this.maxCoordinates.x < coordinates.x) {
      const tile = this.groundLayer.putTileAt(
        mappedTiles,
        this.maxCoordinates.x,
        window.innerHeight + 58
      );
      this.maxCoordinates.x++;

      // this.physics.world.setBounds(
      //   0,
      //   window.innerHeight,
      //   this.maxCoordinates.x + 50,
      //   500
      // );
    }
  }

  /**
   * update ground collider
   */
  setGroundCollider() {
    if (!this.groundCollider) {
      this.groundCollider = this.physics.add.sprite(0, 0, "groundCollider");

      this.groundCollider.collideWorldBounds = true;
      this.groundCollider.allowGravity = false;
    }
    this.groundCollider.x = player.x;
    this.groundCollider.y = window.innerHeight + 50;
  }
}

export default MainScene;
