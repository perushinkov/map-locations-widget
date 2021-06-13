export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vec: Vector2): Vector2 {
    return new Vector2(vec.x + this.x, vec.y + this.y);
  }
  subtract(vec: Vector2): Vector2 {
    return new Vector2(this.x - vec.x, this.y - vec.y);
  }
  times(vec: Vector2): Vector2 {
    return new Vector2(this.x * vec.x, this.y * vec.y);
  }
  timesNum(num: number): Vector2 {
    return new Vector2(this.x * num, this.y * num);
  }
  divide(vec: Vector2): Vector2 {
    return new Vector2(this.x / vec.x, this.y / vec.y);
  }
  copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }
}
