export default class ResourcesLoader {
  constructor(scene: Phaser.Scene) {
    //this.load.tilemapTiledJSON("map", "/assets/tilemaps/map.json");
    scene.load.image(
      "dungeon_tiles",
      "/assets/tilemaps/dungeon/dungeon_tiles.png"
    );
    scene.load.image("collisionWall", "/assets/sprites/collision.png");
    scene.load.image("player", "/assets/sprites/player.png");
    scene.load.image("ennemie", "/assets/sprites/ennemie.png");
    scene.load.spritesheet("elecBall", "/assets/sprites/skills/elec_ball.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    scene.load.spritesheet("fireball", "assets/sprites/fireball.png", {
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 3
    });
    scene.load.spritesheet("knight", "assets/sprites/knight.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    scene.load.spritesheet("wizard", "assets/sprites/wizard.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    scene.load.audio("fireball", "assets/sounds/fireball.ogg");
    scene.load.audio("playerDead", "assets/sounds/ded.ogg");
  }
}
