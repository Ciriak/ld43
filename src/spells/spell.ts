export default class Spell {
  castTime: number;
  spellInfo: any;
  scene: Phaser.Scene;
  sprite: Phaser.Scene.sprite;
  constructor(damage: number, castTime: number, speed: number, scene) {
    this.castTime = castTime;
    this.spellInfo = { damage: damage, speed: speed };
    this.scene = scene;
  }

  cast(x: number, y: number, direction: string) {
    if (!direction) {
      return;
    }
    var config = {
      key: "SpellsCasted",
      frames: this.scene.anims.generateFrameNumbers("elecBall"),
      frameRate: 6,
      yoyo: true,
      repeat: -1
    };
    let anim = this.scene.anims.create(config);
    switch (direction) {
      case "left":
        this.sprite = this.scene.physics.add.sprite(x - 32, y, "elecBall");
        break;
      case "right":
        this.sprite = this.scene.physics.add.sprite(x + 32, y, "elecBall");
        break;
      case "up":
        this.sprite = this.scene.physics.add.sprite(x, y - 32, "elecBall");
        break;
      case "down":
        this.sprite = this.scene.physics.add.sprite(x, y + 32, "elecBall");
        break;
      default:
        break;
    }
    this.spellInfo.direction = direction;

    this.sprite.spellInfo = this.spellInfo;

    this.sprite.setScale(0.5, 0.5);
    this.scene.spellsCasted.add(this.sprite);
    this.scene.physics.add.collider(this.sprite, this.scene.groundLayer);
    this.scene.physics.moveTo(
      this.sprite,
      this.scene.input.x + this.scene.cameras.main.scrollX,
      this.scene.input.y + this.scene.cameras.main.scrollY,
      150
    );
    this.sprite.anims.load("SpellsCasted");
    this.sprite.anims.play("SpellsCasted");
  }
}
