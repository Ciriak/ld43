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

  // Any key down, check event

  update(time: number, delta: number, player: Player, scene: any) {
    player.playerObject.setVelocity(0, 0);

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
  castSpell() {
    let newSpell = new Spell(2, 3, 2, this.scene);
    newSpell.cast(
      this.player.playerObject.x,
      this.player.playerObject.y,
      this.player.direction
    );
  }
}
