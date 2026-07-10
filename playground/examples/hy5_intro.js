
use('hy5_local')
s0.initP5()
P5.toggle(0)
H.pixelDensity(1)

src(s0)
.modulate(noize(12)).modulateScale(voronoi(10)).pixelate(100,100).modulate(noise(() => a.fft[0]+5))
.color(1,0,0)
.out()

circles = []
X = 2 // ms prima che il cerchio scompaia

function setup() {
createCanvas(windowWidth, windowHeight)
}


function draw() {
  clear()
  const now = millis()
  circles.push({ x: mouseX, y: mouseY, t: now })
  circles = circles.filter(c => now - c.t < X * 1000)
  for (let c of circles){
    const age = (now - c.t) / (X * 1000)
    fill(255, 255 * (1 - age))
    noStroke()
    circle(c.x, c.y, 50)
  }
}

// then you can create a hydra-synth instance that also has access to p5.js
// (EXPERIMENTAL FEATURE)
//hy5 = HY5.hydra('h0', 's0') // pass in the hydra and synth variables you want to use
