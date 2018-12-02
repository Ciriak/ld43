import * as Dungeon from "@mikewesthad/dungeon";
import Player from "../Player";
import UIManager from "../UIManager";
import DungeonLoader from "../dungeon/DungeonMap";
import Ennemie from "../Ennemies/Ennemie";
import ResourcesLoader from "../ResourcesLoader";
import Witchcraft from "../Ennemies/Witchcraft";
import Spell from "../spells/Spell";
export default class DungeonScene extends Phaser.Scene {
  constructor() {
    super({
      key: "DungeonScene"
    });
  }

  dungeon: Dungeon;
  dungeonLoader: DungeonLoader;
  groundLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  stuffLayer: any;
  cursors: any;
  player: Player;
  uiManager: UIManager;
  ennemies: Ennemie[] = [];
  tilemapVisibility: any;
  spellsCasted :any;
  wallGroup :any;
  ennemisGroup : any;

  preload() {
    new ResourcesLoader(this);
  }

  create() {
    this.ennemies = [];
    this.player = null;
    this.cursors = null;
    this.dungeonLoader = new DungeonLoader(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spellsCasted = this.physics.add.group();
    this.ennemisGroup = this.physics.add.group();

    const xPlayer = this.dungeonLoader
      .getMap()
      .tileToWorldX(this.dungeonLoader.getstartingRoom().centerX);
    const yPlayer = this.dungeonLoader
      .getMap()
      .tileToWorldY(this.dungeonLoader.getstartingRoom().centerY);

    this.player = new Player(this, xPlayer, yPlayer);
    this.cameras.main.startFollow(this.player.playerObject, true, 0.05, 0.05);
    this.cameras.main.setZoom(1);
    this.cameras.main.fadeIn();
    this.dungeonLoader.watchCollision(this.player);

    this.uiManager = new UIManager(this);
    this.ennemies = this.dungeonLoader.spawnEnnemy();
    this.physics.add.collider(this.spellsCasted, this.wallGroup, this.checkHitWall, null, this);

  }

  //camera bounds

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.updateEnnemies(time, delta);
    const currentPlayerRoom = this.dungeonLoader.getPlayerRoom(this.player);
    this.tilemapVisibility.setActiveRoom(currentPlayerRoom);

    this.player.currentRoom = currentPlayerRoom;

    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)))
    {
        let newSpell = new Spell(2,3,2,this);
        newSpell.cast(this.player.playerObject.x, this.player.playerObject.y, this.player.direction);
    }
      this.spellsCasted.getChildren().forEach(sprite => {
        switch (sprite.spellInfo.direction) {
          case 'left':
            sprite.x -= sprite.spellInfo.speed;
              break;
          case 'right':
            sprite.x += sprite.spellInfo.speed;
              break;
          case 'up':
            sprite.y -= sprite.spellInfo.speed;
              break;
          case 'down':
            sprite.y += sprite.spellInfo.speed;
              break;
          default:
              break;
      }
        
    });
  }

  checkHitWall(sprite){
    console.log(sprite.spellInfo.damage);
    sprite.destroy();
  }

  /**
   * Update all ennemies attack pattern, called each frame
   */

  updateEnnemies(time: number, delta: number) {
    for (let i = 0; i < this.ennemies.length; i++) {
      const ennemie = this.ennemies[i];
      ennemie.refreshAttack(this.player.playerObject, time, delta);
    }
  }

  /**
   * Restart the scene
   */
  restart() {
    //fuck this shit
    location.reload();
  }
}
