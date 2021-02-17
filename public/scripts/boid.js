import { Vec2 } from './math.js'
import { INFLUENCE_RADIUS } from './constants.js'

class Boid {
  constructor(ctx, pos = new Vec2(), vel = new Vec2(0,0), acc = new Vec2(0,0)) {
    this.ctx = ctx
    this.position = pos
    this.velocity = vel
    this.acceleration = acc
    this.maxSpeed = 5
    this.maxAcceleration = 0.5
  }
  draw() {
    const { ctx } = this
    const [ x, y ] = this.position.coordinates
    const [ vx, vy ] = this.velocity.coordinates
    const [ ax, ay ] = this.acceleration.coordinates
    // ctx.beginPath()
    // ctx.arc(x,y,INFLUENCE_RADIUS,0,Math.PI * 2)
    // ctx.stroke()
    // ctx.closePath()
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.moveTo(x,y)
    const [vVecX, vVecY ] = [x + 10*vx, y + 10* vy]
    ctx.lineTo(vVecX, vVecY)
    ctx.lineTo(vVecX + ax * 10, vVecY + ay * 10)
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

  getBoidsInInfluenceRadius(flock) {
    return flock.filter(boid => {
      return boid !== this && this.position.subtract(boid.position).magnitude < INFLUENCE_RADIUS
    })
  }

  turnRight(){
    const acceleration = new Vec2(...this.velocity.coordinates)
    acceleration.rotate(Math.PI / 2)
    acceleration.magnitude = 1
    this.setAcceleration(...acceleration.coordinates)
  }

  turnLeft(){
    const acceleration = new Vec2(...this.velocity.coordinates)
    acceleration.rotate(-Math.PI / 2)
    acceleration.magnitude = 1
    this.setAcceleration(...acceleration.coordinates)
  }

  flockDirection(boids) {
    const allBoids = [...boids, this]
    const direction = allBoids.reduce((total, boid) => {
      return boid.velocity.add(total)
    }, new Vec2(0,0))
    direction.magnitude = this.maxSpeed
    return direction
  }

  align(boids) {
    if (boids.length) {
      const targetDirection = this.flockDirection(boids)
      const steering = targetDirection.subtract(this.velocity)
      steering.magnitude = this.maxAcceleration
      this.setAcceleration(...steering.coordinates)
    } else {
      this.setAcceleration(0,0)
    }
  }

  update(dt, flock) {
    // separation
    // turn towards center of mass
    // turn torards average direction
    const [ x, y ] = this.position.coordinates
    const [ vx, vy ] = this.velocity.coordinates
    const [ ax, ay ] = this.acceleration.coordinates
    this.setPosition(x + vx * dt, y + vy * dt)
    this.setVelocity(vx + ax * dt, vy + ay * dt)

    const closeBoids = this.getBoidsInInfluenceRadius(flock)
    this.align(closeBoids)
    this.velocity.magnitude = this.maxSpeed
    // this.setAcceleration(
    //   ax + (Math.random() - 0.5) * .1,
    //   ay + (Math.random() - 0.5) * .1
    // )
    // if (this.velocity.magnitude > 5) {
    //   this.velocity.magnitude = 5
    // }
    // if (this.acceleration.magnitude > .2) {
    //   this.acceleration.magnitude = .2
    // }
  }
}

export default Boid
