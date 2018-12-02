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
  groundLayer: any;
  stuffLayer: any;
  cursors: any;
  player: Player;
  uiManager: UIManager;
  ennemies: Ennemie[] = [];
  tilemapVisibility: any;
  spellsCasted :any;

  preload() {
    new ResourcesLoader(this);
  }

  create() {
    this.ennemies = [];
    this.player = null;
    this.cursors = null;
    this.dungeonLoader = new DungeonLoader(this);
    this.cursors = this.input.keyboard.createCursorKeys();

    
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
    //uncomment to  enable a test ennemie
    let ennemie = new Witchcraft(this, 0, 0);
    this.ennemies = this.dungeonLoader.spawnEnnemy();
  }

  //camera bounds

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.updateEnnemies(time, delta);

    this.tilemapVisibility.setActiveRoom(
      this.dungeonLoader.getPlayerRoom(this.player)
    );

    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)))
    {
        if(typeof this.spellsCasted !== 'undefined') {
            var spell = this.spellsCasted.get();
        }
        

        if (spell)
        {
            
        } else {
            let currentSpell = new Spell(2,3,300, this);
            currentSpell.cast(this.player.playerObject.x, this.player.playerObject.y);
            this.spellsCasted = this.add.group({
                classType: Spell,
                maxSize: 30
            });
        }
        
    }
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
