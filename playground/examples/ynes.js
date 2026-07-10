
use('hy5_local')

// p5 » hydra - typo cos/sin
// pass p5 typography into hydra
// cc teddavis.org 2024

s0.initP5() // send p5 to hydra
P5.toggle(0) // optionally hide p5

H.pixelDensity(.25) // 2x re

src(o0)
 .saturate(1.01)
 .scale(.999)
 .color(1.01,1.01,1.01)
 .hue(.01)
 .modulateHue(src(o1).hue(.3).posterize(-1).contrast(.7),2)
  .layer(src(o1)
         .luma()
         .mult(gradient(1)
               .saturate(.9)))
  .out(o0)

noise(1, .2)
  .rotate(2,.5)
  .layer(src(o0)
  .scrollX(.2))
  .out(o1)

render(o0)

function setup() {
	createCanvas(windowWidth, windowHeight)
}

function draw() {
	H.get()
	image(h0, 0, 0)
	// image(h0, 0, 0, h0.width*1.01, h0.height*1.01)
	circle(mouseX, mouseY, frameCount%150)
}