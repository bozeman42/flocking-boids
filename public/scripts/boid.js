import { Vec2 } from './math.js'

class Boid {
  constructor(ctx, pos = new Vec2(), vel = new Vec2(), acc = new Vec2()) {
    this.ctx = ctx
    this.position = pos
    this.velocity = vel
    this.acceleration = acc
  }
  draw() {
    const { ctx } = this
    const [ x, y ] = this.position.coords
    const [ vx, vy ] = this.velocity.direction(10)
    const [ ax, ay ] = this.acceleration.coords
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.moveTo(x,y)
    ctx.lineTo(x + vx, y + vy)
    ctx.lineTo(x + vx + ax * 10, y + vy + ay * 10)
    ctx.stroke()
  }

  setPosition(x,y) {
    this.position.setVec(x,y)
  }

  setVelocity(x,y) {
    this.velocity.setVec(x,y)
  }
  setAcceleration(x,y) {
    this.acceleration.setVec(x,y)
  }

  update(dt) {
    const [ x, y ] = this.position.coords
    const [ vx, vy ] = this.velocity.coords
    const [ ax, ay ] = this.acceleration.coords
    this.setPosition(x + vx * dt, y + vy * dt)
    this.setVelocity(vx + ax * dt, vy + ay * dt)
    this.setAcceleration(
      ax + (Math.random() - 0.5),
      ay + (Math.random() - 0.5)
    )
    if (this.velocity.magnitude > 5) {
      this.velocity.magnitude = 5
    }
    if (this.acceleration.magnitude > 2) {
      this.acceleration.magnitude = 2
    }

  }

}

export default Boid
