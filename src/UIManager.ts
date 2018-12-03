import * as $ from "jquery";
import DungeonScene from "./scenes/DungeonScene";
const maxSanity = 100;
export default class UIManager {
  private scene: DungeonScene;
  itemsCard = {
    hand: null,
    foot: null,
    eye: null,
    hearth: null
  };
  constructor(scene: DungeonScene) {
    this.scene = scene;
    const sceneRef = this.scene;
    this.generateItemsCards();
    $(".play-btn").click(function() {
      $("#main-menu").fadeOut();
    });
    $(".how-to-btn").click(function() {
      $(".how-to-card").show();
    });
    $(".close-how-to-btn").click(function() {
      $(".how-to-card").hide();
    });
    // relaunch a game
    $(".retry-btn").click(function() {
      $("#death-screen").removeClass("active");
      sceneRef.restart();
    });
  }

  updateSanity(value: number) {
    if (value > 100) {
      value = 100;
    }
    $(".sanity-bar .sanity-progress").css("width", value + "%");
    if (value >= 70) {
      $(".sanity-container").addClass("critical");
    } else {
      $(".sanity-container").removeClass("critical");
    }
  }
  /**
   * Update a stat on the UI
   * @param stat propertie to update
   * @param value value to add or remove
   */
  updateStat(stat, value) {
    console.log(stat, "+", value);
    let statItem = $("." + stat);

    statItem.removeClass("active");
    statItem.find(".item-progress").text(value + "/5");
    statItem.attr("value", value);
    if (value >= 5) {
      statItem.addClass("active");
    }
  }
  generateItemsCards() {}
  /**
   * UI event when the player die
   */
  startDeathScreen() {
    //flash red
    const cameraRef = this.scene.scene.cameras.main;
    cameraRef.flash(1000, 255, 0, 0, 10);

    setTimeout(function() {
      cameraRef.fadeOut(1000);
      $("#death-screen").addClass("active");
      $("#game-ui").addClass("isDead");
    }, 1500);
  }
  setScore(score: number) {
    $(".score-value").text(score);
  }
}
