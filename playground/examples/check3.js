// check 3


use('hy5_local')
s0.initP5() // send p5 to hydra
P5.toggle(0) // optionally hide p5
H.pixelDensity(1) // 2x re

function draw() {
	H.get()
	image(h0, 0, 0)
	// image(h0, 0, 0, h0.width*1.01, h0.height*1.01)
	circle(mouseX, mouseY, frameCount%150)
  H.zIndex(-1)
}
voronoi(350,0.15)
  	.modulateScale(osc(80).rotate(Math.sin(time)),.5)
  	.thresh(.8)
	.modulateRotate(osc(2),.4)
	.thresh(.7)
  	.diff(src(o0).scale(1.8))
	.modulateScale(osc(1).modulateRotate(o0,.74))
	.diff(src(o0).rotate([-.012,.01,-.002,0]).scrollY(0,[-1/199800,0].fast(0.7)))
	.brightness([-.02,-.17].smooth().fast(.5))
	.out(o2)
osc(60,-0.015,0.3).diff(osc(6,0.08).rotate(Math.PI/2))
	.modulateScale(noise(3.5,0.25).modulateScale(osc(15).rotate(()=>Math.sin(time/2))),0.6)
	.color(1,2,0.5,0.4).contrast(0.8)
	.add(src(o0).modulate(o1,.4),.6)
	.invert().brightness(0.1).contrast(1.2)
	.modulateScale(osc(2),-0.2)
  .out(o1)
src(o0).diff(o1).out(o2)
render(o2)
