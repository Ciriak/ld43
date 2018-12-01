export default class PlayerInputs {
  update(time: number, delta: number, player: any, scene: any) {
    if (scene.cursors.left.isDown) {
      player.x -= 5;
    }
    if (scene.cursors.right.isDown) {
      player.x += 5;
    }
    if (scene.cursors.down.isDown) {
      player.y += 5;
    }
    if (scene.cursors.up.isDown) {
      player.y -= 5;
    }
  }
}
