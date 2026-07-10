
use('hy5_local')

// p5 » hydra - typo cos/sin
// pass p5 typography into hydra
// cc teddavis.org 2024

s0.initP5() // send p5 to hydra
P5.toggle(0) // hide p5

H.pixelDensity(2) // set res

src(s0)
.add(src(o0).scale(()=>1-cos(time/4)/2), .4)
.add(src(o0).scale(()=>1+sin(time/4)/2), .48)
.modulateScale(noize(100), .03)
.out()




function setup() {
	createCanvas(windowWidth, windowHeight)
	textAlign(CENTER, CENTER)
}

function draw() {
	clear()
	fill(0)
	stroke(255)
	blendMode(DIFFERENCE)
	// circle(mouseX, mouseY, height/2)
	textSize(height/3)
	translate(noise(frameCount*.51)*width, noise(frameCount*.005)*height)
	text('BAD HONKO',500, 400)
}