import * as $ from "jquery";
export default class UIManager {
  constructor(scene: Phaser.Scene) {
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
