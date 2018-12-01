export default class ResourcesLoader {
  constructor(scene: Phaser.Scene) {
    //this.load.tilemapTiledJSON("map", "/assets/tilemaps/map.json");
    scene.load.image("dungeon_tiles", "/assets/tilemaps/dungeon/dungeon_tiles.png");
    scene.load.image("player", "/assets/sprites/player.png");
    scene.load.image("ennemie", "/assets/sprites/ennemie.png");
    scene.load.spritesheet("elecBall", "/assets/sprites/skills/elec_ball.png",  { frameWidth: 64, frameHeight: 64 })
  }
}
