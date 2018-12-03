import DungeonScene from "../scenes/DungeonScene";
import Ennemie from "./Ennemie";

import Player from "../Player";

export default class Children extends Ennemie {
  spriteName = "children";
  sanityGiven: number = 5;
  speed : number = 80;

  constructor(scene: DungeonScene, x?: number, y?: number) {
    super(scene, x, y);
    const ennemiRef = this;
    this.health = 1;
    this.ennemieObject = this.scene.add.sprite(x, y, "child");
    this.reduceCoolDown = 1;
    scene.physics.add.collider(
      this.ennemieObject,
      scene.player.playerObject,
      function() {
        ennemiRef.giveDamageToPlayer(scene.player);
      },
      function() {},
      function() {}
    );
  }

  /**
   * Flee the player
   */
  applyPattern(player: Player, time: number, delta: number) {
    this.fleePlayer(player);
  }
  buff() {
    this.speed = this.speed + 20;
  }

  /**
   * Move the ennemie to the player
   * @param player
   */
  fleePlayer(player: Player) {
    const velocityVal = 100;
    switch (player.direction) {
      case "up":
        this.ennemieObject.body.setVelocity(0, -velocityVal);
        break;
      case "down":
        this.ennemieObject.body.setVelocity(0, velocityVal);
        break;
      case "left":
        this.ennemieObject.body.setVelocity(-velocityVal, 0);
        break;
      case "right":
        this.ennemieObject.body.setVelocity(velocityVal, 0);
        break;
    }
  }

  kill() {
    this.scene.player.giveStat("speed", 1);
    super.kill();
  }
}
