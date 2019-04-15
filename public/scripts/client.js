import { ctx, canvas } from './canvas.js'
import { Vec2 } from './math.js'
import Boid from './boid.js'
import { WIDTH, HEIGHT } from './constants.js'

const flock = []

// setInterval(() => flock.push(createBoid()), 1000)

let prevTime = 0
function animate(time) {
  const dt = (time - prevTime) / 50
  ctx.clearRect(0,0,canvas.width, canvas.height)
  flock.forEach(boid => {
    boid.draw()
    boid.update(dt)
    let [x, y] = boid.position.coords
    if (x > WIDTH || x < 0) {
      x = x > WIDTH ? 0 : WIDTH
    } else 
    if (y > HEIGHT || y < 0) {
      y = y > HEIGHT ? 0 : HEIGHT
    }
    boid.position.setVec(x,y)
  })
  prevTime = time
  requestAnimationFrame(animate)
}

canvas.onclick = (e) => {
  const { offsetX: x, offsetY: y } = e
    flock.push(
      new Boid(
        ctx,
        new Vec2(x, y),
        new Vec2(0,0),
        new Vec2(0, 0)
      )
    )
}

function createBoid() {
  return new Boid(
      ctx,
      new Vec2(canvas.width * Math.random(), canvas.height * Math.random()),
      new Vec2(0,0),
      new Vec2(0, 0)
    )
}

function createBoids(n) {
  let boids = []
  for(let i = 0; i < n; i++) {
    boids = [
      ...boids,
      createBoid()
    ]
  }
  return boids
}

animate(0)