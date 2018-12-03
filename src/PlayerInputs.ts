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

    switch (player.direction) {
      case "left":
        player.playerObject.anims.play("pleft", true);
        break;
      case "right":
        player.playerObject.anims.play("pright", true);
        break;
      case "up":
        player.playerObject.anims.play("ptop", true);
        break;
      case "down":
        player.playerObject.anims.play("pdown", true);
        break;
      default:
        player.playerObject.anims.play("pidle", true);
        break;
    }

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
    console.log(this.player.cd);
    if (!this.player.checkCD()) {
      newSpell.cast(
        this.player.playerObject.x,
        this.player.playerObject.y,
        this.player.direction
      );
      this.player.setonCd();
    }
  }
}
