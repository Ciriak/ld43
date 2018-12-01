import * as $ from "jquery";
export default class UIManager {
  constructor() {
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
}
