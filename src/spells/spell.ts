export default class Spell {
    damage: number;
    castTime: number;
    speed: number;
    scene: Phaser.Scene;
    sprite: Phaser.Scene.sprite
    constructor(damage : number, castTime : number, speed: number, scene){
        this.castTime = castTime;
        this.damage = damage;
        this.speed = speed;
        this.scene = scene;

    }

    cast(x: number, y: number) {
        var config = {
            key: 'cast',
            frames: this.scene.anims.generateFrameNumbers('elecBall'),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        };
        let anim = this.scene.anims.create(config);
        this.sprite = this.scene.add.sprite(x+64,y,"elecBall");
        this.sprite.anims.load('cast');
        this.sprite.anims.play('cast');
    }
    setActive(value) {
        this.sprite.setActive(value);
    }
}