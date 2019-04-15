export class Vec2 {
  constructor(x = 0, y = 0) {
    this._x = x
    this._y = y
  }

  get x() {
    return this._x
  }
  get y() {
    return this._y
  }

  setVec (x, y) {
    this._x = x,
    this._y = y
  }

  get coords () {
    return [ this.x, this.y ]
  }

  get magnitude() {
    const { x, y } = this
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y,2))
  }

  set magnitude(length) {
    this.setVec(length * (this._x / this.magnitude), length * (this._y / this.magnitude))
  }

  direction (length = 1) {
    return [
      length * (this._x / this.magnitude),
      length * (this._y / this.magnitude)
    ]
  }
}