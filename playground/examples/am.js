
use('hy5_local')


H.hide() // hide hydra
noize().out()

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
	angleMode(DEGREES)
}

function draw() {
	clear()
	orbitControl(3)
	rotateY(frameCount/3)
	rotateX(frameCount/4)
	
	noStroke()
	texture(H.get())
	sphere(height/3)
}

function keyPressed(){
	if(key == 'S'){
		H2.save() // save 2nd hydra
	}
}

// 2nd instance of hydra
var H2 = HY5.hydra('h2', 'synth')

H2.pixelDensity(2)
H2.zIndex(2)

s0.initP5()

src(s0)
	.modulateScale(src(o0), .3)
	.out()