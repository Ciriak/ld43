import Player from "./Player";

const velocity = 100;
export default class PlayerInputs {
  update(time: number, delta: number, player: Player, scene: any) {
    //console.log("Player coordinates : " + player.x + ":" + player.y);
    player.playerObject.setVelocity(0, 0);

    // Fire fire bullet
    if (scene.cursors.space.isDown) {
      // let bullet = this.bullets.get();
      // if (bullet) {
      // bullet.fire(this.gun.x, this.gun.y);
      // }
    }

    if (scene.cursors.left.isDown) {
      player.playerObject.setVelocityX(-velocity);

      player.playerObject.anims.play("idle");
    }
    if (scene.cursors.right.isDown) {
      player.playerObject.setVelocityX(velocity);

      player.playerObject.anims.play("idle");
    }
    if (scene.cursors.down.isDown) {
      player.playerObject.setVelocityY(velocity);
      player.playerObject.anims.play("idle");
    }
    if (scene.cursors.up.isDown) {
      player.playerObject.setVelocityY(-velocity);
      player.playerObject.anims.play("idle");
    }
  }
}
