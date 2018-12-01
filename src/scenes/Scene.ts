let player: any;
import DungeonMap from "../dungeon/DungeonMap";
import PlayerInputs from "../PlayerInputs";
import ennemie from "../Ennemie";
import Ennemie from "../Ennemie";
let playerInputs = new PlayerInputs();
let testEnnemie: Ennemie;
class MainScene extends Phaser.Scene {
  gridUnit: 8;
  cursors: any;
  groundCollider: any;
  DungeonRandom: DungeonMap;
  map: Phaser.Tilemaps.Tilemap;
  groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  ennemies: Ennemie[] = [];
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
    this.load.image("ennemie", "/assets/sprites/ennemie.png");
    this.load.image("grid", "/assets/bgtest.png");
  }

  create() {
    this.add.image(0, 0, "grid").setOrigin(0);
    player = this.physics.add.sprite(0, 0, "player");

    player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();
    //camera follow player

    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    this.cameras.main.setZoom(1);

    //camera bounds
    //this.cameras.main.setBounds(0, window.innerHeight, 500, 500);

    this.createMap();
    // add a test ennemie
    for (let i = 0; i < 10; i++) {
      this.ennemies.push(new ennemie(this, player, 10 * i, 10 * i));
    }
  }

  update(time: number, delta: number) {
    playerInputs.update(time, delta, player, this);
    for (let index = 0; index < this.ennemies.length; index++) {
      const ennemie = this.ennemies[index];
      ennemie.refreshAttack(player);
    }
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
  }
}

export default MainScene;
