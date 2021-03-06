// Create canvas
document.body.style.margin = '0px'
var canvas = document.createElement('canvas')
var context = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
document.body.appendChild(canvas)

var perm = []
while (perm.length < 255) {
  while (perm.includes((val = Math.floor(Math.random() * 255))));
  perm.push(val)
}

var lerp = (a, b, t) => a + ((b - a) * (1 - Math.cos(t * Math.PI))) / 2
var noise = (x) => {
  originalX = x
  x = (x * 0.01) % 254

  return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x))
}

var player = new (function () {
  this.x = canvas.width / 2
  this.y = 0
  this.ySpeed = 0
  this.rot = 0
  this.rSpeed = 0

  this.img = new Image()
  this.img.src = 'moto.png'
  this.draw = function () {
    var p1 = canvas.height - noise(t + this.x) * 0.25
    var p2 = canvas.height - noise(t + 15 + this.x) * 0.25

    var grounded = 0
    if (this.y < p1) {
      this.ySpeed += 0.1
    } else {
      this.ySpeed -= this.y - p1
      this.y = p1

      grounded = 1
    }

    if (!playing || (grounded && Math.abs(this.rot) > Math.PI * 0.5)) {
      playing = false
      this.rSpeed = 5
      k.ArrowUp = 1
      this.x -= speed * 2.5
    }
    // var angle = Math.atan2(p2 - 31 - this.y, this.x + 15 - this.x)
    // var angle = calcAngleDegrees(p2 - p1, 15)

    var angle = Math.atan2(p2 - p1, 15)
    this.y += this.ySpeed

    if (grounded && playing) {
      this.rot -= (this.rot - angle) * 0.5
      this.rSpeed = this.rSpeed - (angle - this.rot)
    }

    this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05
    this.rot -= this.rSpeed * 0.1

    if (this.rot > Math.PI) this.rot = -Math.PI
    if (this.rot < -Math.PI) this.rot = Math.PI

    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.rot)
    context.drawImage(this.img, -15, -46, 50, 50)
    context.restore()
  }
})()

// Draw on canvas
var t = 0
var speed = 0
var k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 }
var playing = true
function draw() {
  speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.01

  // console.log({ t })
  t += 10 * speed

  context.fillStyle = 'green'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'black'
  context.beginPath()
  context.moveTo(0, canvas.height)

  for (let i = 0; i <= canvas.width; i++) {
    context.lineTo(i, canvas.height - noise(t + i) * 0.25)
  }

  context.lineTo(canvas.width, canvas.height)
  context.fill()

  player.draw()
  requestAnimationFrame(draw)
}

onkeydown = (d) => (k[d.key] = 1)
onkeyup = (d) => (k[d.key] = 0)

draw()
// function draw() {
//   context.fillStyle = 'rgb(200, 0, 0)'

//   context.fillRect(0, 0, context.width, context.height)
//   requestAnimationFrame(draw)
// }

// draw()
