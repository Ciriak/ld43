const velocity = 50;
export default class PlayerInputs {
  update(
    time: number,
    delta: number,
    player: Phaser.Physics.Arcade.Sprite,
    scene: any
  ) {
    //console.log("Player coordinates : " + player.x + ":" + player.y);
    player.setVelocity(0, 0);
    if (scene.cursors.left.isDown) {
      player.setVelocityX(-velocity);
    }
    if (scene.cursors.right.isDown) {
      player.setVelocityX(velocity);
    }
    if (scene.cursors.down.isDown) {
      player.setVelocityY(velocity);
    }
    if (scene.cursors.up.isDown) {
      player.setVelocityY(-velocity);
    }
  }
}
