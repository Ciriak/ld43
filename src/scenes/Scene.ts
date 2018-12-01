let player: any;
import DungeonMap from "../dungeon/DungeonMap";

class TestScene extends Phaser.Scene {
  gridUnit: 8;
  cursors: any;
  groundCollider: any;
  map: Phaser.Tilemaps.Tilemap;
  groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  maxCoordinates = {
    x: 500,
    y: window.innerHeight
  };

  constructor() {
    super({
      key: "TestScene"
    });
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/tilemaps/map.json");
    this.load.image("tiles", "/assets/tilemaps/tiles.png");
    this.load.image("groundCollider", "/assets/sprites/groundCollider.png");
    this.load.image("player", "/assets/sprites/player.png");
  }

  create() {
    //player = this.physics.add.sprite(0, -100, "player");
    //player.setCollideWorldBounds(true);
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
    this.map = this.make.tilemap({
      key: "map"
    });

    const tileset = this.map.addTilesetImage("tiles", "tiles");

    this.groundLayer = this.map.createDynamicLayer("ground", tileset, 0, 0);
  }

  /**
   * Generate blocs when camera move
   */

  generate() {
    if (!this.map) {
      return;
    }
    const camera = this.cameras.main;
    let coordinates = {
      x: camera.width + camera.x,
      y: camera.height + camera.y
    };

    //update the values
    while (this.maxCoordinates.x < coordinates.x) {
      const tile = this.groundLayer.putTileAt(
        1,
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

export default TestScene;
