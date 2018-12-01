import * as $ from "jquery";
export default class UIManager {
  private scene: Phaser.Scene;
  itemsCard = {
    hand: null,
    foot: null,
    eye: null,
    hearth: null
  };
  constructor(scene: Phaser.Scene) {
    this.scene = scene;

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
  }
  generateItemsCards() {}
}
