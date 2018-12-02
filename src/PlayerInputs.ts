import Player from "./Player";
import DungeonScene from "./scenes/DungeonScene";
import Spell from "./spells/spell";
const velocity = 100;
export default class PlayerInputs {
  private scene: DungeonScene;
  private player;
  constructor(scene: DungeonScene, player: Player) {
    this.scene = scene;
    this.player = player;
    const inputRef = this;

    this.scene.input.on(
      "pointerup",
      function() {
        inputRef.castSpell();
      },
      this
    );
  }
  update(time: number, delta: number, player: Player, scene: any) {
    player.playerObject.setVelocity(0, 0);

    // Fire fire bullet
    if (scene.cursors.space.isDown) {
      // let bullet = this.bullets.get();
      // if (bullet) {
      // bullet.fire(this.gun.x, this.gun.y);
      // }
    }
    player.playerObject.anims.play("widle");
    if (scene.cursors.left.isDown) {
      player.playerObject.setVelocityX(-velocity);

      
    }
    if (scene.cursors.right.isDown) {
      player.playerObject.setVelocityX(velocity);


    }
    if (scene.cursors.down.isDown) {
      player.playerObject.setVelocityY(velocity);

    }
    if (scene.cursors.up.isDown) {
      player.playerObject.setVelocityY(-velocity);

    }
  }
  castSpell() {
    let newSpell = new Spell(2, 3, 2, this.scene);
    newSpell.cast(
      this.player.playerObject.x,
      this.player.playerObject.y,
      this.player.direction
    );
  }
}
