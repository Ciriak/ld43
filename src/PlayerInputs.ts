const velocity = 500;
export default class PlayerInputs {
  update(time: number, delta: number, player: any, scene: any) {
    player.setVelocity(0);
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
