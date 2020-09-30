// Create canvas
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
context.height = 350
context.width = 500
document.body.appendChild(canvas)

// Draw on canvas
function draw() {
  context.fillStyle = 'green'
  context.fillRect(20, 20, 20, 20)

  requestAnimationFrame(draw)
}

draw()
// function draw() {
//   context.fillStyle = 'rgb(200, 0, 0)'

//   context.fillRect(0, 0, context.width, context.height)
//   requestAnimationFrame(draw)
// }

// draw()
