export default class Spell {
    damage: number;
    castTime: number;
    speed: number;
    scene: Phaser.Scene;
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
        let sprite = this.scene.add.sprite(x+64,y,"elecBall");
        sprite.anims.load('cast');
        sprite.anims.play('cast');
    }
}