export default class Entitie {
  public direction: string;
  public update(time: number, delta: number) {}
  /**
   * Update the entitie direction according to its velocity
   * @param velocity
   */
  public setDirectionFromVelocity(velocity) {
    if (velocity.x > 0) {
      this.direction = "right";
    }
    if (velocity.x < 0) {
      this.direction = "left";
    }
    if (velocity.y > 0) {
      this.direction = "top";
    }
    if (velocity.y < 0) {
      this.direction = "bottom";
    }
  }
}
