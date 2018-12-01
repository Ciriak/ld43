import * as $ from "jquery";
export default class UIManager {
  constructor() {
    $(".play-btn").click(function() {
      $("#main-menu").fadeOut();
    });
  }
}
