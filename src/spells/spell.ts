export default class Spell {
    castTime: number;
    spellInfo: any;
    scene: Phaser.Scene;
    sprite: Phaser.Scene.sprite
    constructor(damage : number, castTime : number, speed: number, scene){
        this.castTime = castTime;
        this.spellInfo = {damage: damage, speed: speed};
        this.scene = scene;

    }

    cast(x: number, y: number) {
        var config = {
            key: 'SpellsCasted',
            frames: this.scene.anims.generateFrameNumbers('elecBall'),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        };
        let anim = this.scene.anims.create(config);
        this.sprite = this.scene.add.sprite(x+64,y,"elecBall");
        this.sprite.spellInfo = this.spellInfo;
        this.scene.spellsCasted.add(this.sprite);
        this.scene.physics.add.collider(this.sprite, this.scene.groundLayer);
        this.sprite.anims.load('SpellsCasted');
        this.sprite.anims.play('SpellsCasted');
    }
}