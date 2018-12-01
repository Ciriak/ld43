export default class Ennemie {
  private scene: Phaser.Scene;
  private ennemieObj: any;
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    if (!x) {
      x = 0;
    }
    if (!y) {
      y = 0;
    }
    this.scene = scene;
    this.ennemieObj = scene.physics.add.sprite(x, y, "ennemie");
  }
  refreshAttack(player: Phaser.Physics.Arcade.Sprite) {
    this.scene.physics.moveToObject(this.ennemieObj, player, 50);
  }
}
