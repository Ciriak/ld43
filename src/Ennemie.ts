export default class Ennemie {
  private scene: Phaser.Scene;
  public ennemieObject: any;
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    if (!x) {
      x = 0;
    }
    if (!y) {
      y = 0;
    }
    this.scene = scene;
    this.ennemieObject = scene.physics.add.sprite(x, y, "ennemie");
  }
  refreshAttack(player: Phaser.Physics.Arcade.Sprite) {
    debugger;
    this.scene.physics.moveToObject(
      this.ennemieObject,
      player.playerObject,
      50
    );
  }
}
