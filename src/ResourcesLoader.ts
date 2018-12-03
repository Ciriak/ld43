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
    scene.load.image("eye_relic", "/assets/sprites/relics/eye_ball.png");
    scene.load.image("foot_relic", "/assets/sprites/relics/foot.png");
    scene.load.image("hand_relic", "/assets/sprites/relics/hand.png");
    scene.load.image("heart_relic", "/assets/sprites/relics/heart.png");
    scene.load.spritesheet("elecBall", "/assets/sprites/skills/elec_ball.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    scene.load.spritesheet("woman", "/assets/sprites/woman.png", {
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
    scene.load.spritesheet("child", "assets/sprites/child.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    scene.load.audio("fireball", "assets/sounds/fireball.ogg");
    scene.load.audio("playerDead", "assets/sounds/ded.ogg");
  }
}
