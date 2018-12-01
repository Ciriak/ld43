const velocity = 200;
export default class PlayerInputs {
  update(
    time: number,
    delta: number,
    player: Phaser.Physics.Arcade.Sprite,
    scene: any
  ) {
    //console.log("Player coordinates : " + player.x + ":" + player.y);
    player.setVelocity(0, 0);

  // Fire fire bullet
    if (scene.cursors.space.isDown) {
        // let bullet = this.bullets.get();

        // if (bullet) {
          // bullet.fire(this.gun.x, this.gun.y);
        // }
    }
    
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
