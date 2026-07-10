use('hy5_local')

H.hide()
H.audio(false)   // disabilita richiesta microfono
noize().out()
s0.initP5() // send p5 to hydra
P5.toggle(1)
P5.zIndex(0)// hide p5
let lay1
let lay2

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  angleMode(DEGREES)
  lay1 = createGraphics(windowWidth, windowHeight)
  lay2 = createGraphics(windowWidth, windowHeight)
  s0.initP5()
  s1.initP5(lay1)
  s2.initP5(lay2)
}

function draw() {
  // --- sfera con texture hydra ---
  clear()
  orbitControl(10, 10, 0)
  rotateY(frameCount/2)
  rotateX(frameCount/4)
  noStroke()
  texture(H.get())
  sphere(height/7)
}

function keyPressed() {
  if(key == 'S') H2.save()
}

function mouseClicked() {
  // non aprire se un modale è aperto, o se ne è stato chiuso uno da meno di 350ms
  if (window.isModalOpen && window.isModalOpen()) return
  if (window._modalClosedAt && Date.now() - window._modalClosedAt < 350) return
  window.showPasswordPrompt()
}

// touchEnded copre gli in-app browser (Instagram, TikTok, ecc.) che su iOS
// non generano eventi 'click' sul canvas — solo eventi touch nativi
function touchEnded() {
  if (window.isModalOpen && window.isModalOpen()) return
  if (window._modalClosedAt && Date.now() - window._modalClosedAt < 350) return
  window.showPasswordPrompt()
  return false  // previene il click sintetico successivo (eviterebbe doppio trigger)
}


var H2 = HY5.hydra('h2', 'synth')
H2.pixelDensity(2)
H2.zIndex(-1)


synth.src(s0)
	.modulateScale(synth.src(synth.o0).scale(1.01), .5)
	.out(o0)


shape([4,5,6].fast(0.1).smooth(1),0.0001,[0.2,0.7].smooth(1))
.color(0.2,0.4,0.3)
.scrollX(()=>Math.sin(time*0.27))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.5,0.3].smooth(1))
  .color(0.6,0.2,0.5)
  .scrollY(0.35)
  .scrollX(()=>Math.sin(time*0.33)))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.00001,[0.2,0.7,1.3].smooth(1))
  .color(0.2,0.4,0.6)
  .scrollY(-0.35)
  .scrollX(()=>Math.sin(time*0.41)*-1))
.add(
  src(o0).shift(0.0001,0.01,0.001)
  .scrollX([0.05,-0.05].fast(0.1).smooth(1))
  .scale([1.05,0.9].fast(0.3).smooth(1),[1.01,0.8,1].fast(0.09).smooth(1))
  ,0.85)
.modulate(voronoi(20,2,1))
.luma(0)
.brightness([-.14,-.1].smooth().fast(.15))
.out(o1)

src(s1)
//.modulateScale(noize(5), .5)
//.modulateVoronoi(3,0.15)
//.modulateScale(src(o1),.01).modulateScale(noize(6).scale(1.1), .06)
.out(o1)

src(s2)
//.modulateScale(noize(5), .5)
//.modulateVoronoi(350,0.15)
//.modulateScale(src(o3).scale(1.01), .01).modulateScale(noize(4.4), .1)
//.modulate(voronoi(10,2,1))
//.modulate(voronoi(5,2,1))
.out(o3)

 
voronoi(350,0.15)
  	.modulateScale(osc(8).rotate(Math.sin(time)),5)
  	.thresh(.7)
	.modulateRotate(osc(10),.06)
	.thresh(.2)
  	.diff(src(o2).scale(20.8))
	.modulateScale(osc(1).modulateRotate(o2,.74))
	.diff(src(o2).rotate([-.012,.01,-.0002,0]).scrollY(0,[-1/199800,0].fast(0.7)))
	.brightness([-.42,-0.1].smooth().fast(10))
	.out(o2)


voronoi(350,0.15)
  	.modulateScale(osc(8).rotate(Math.sin(time)),.5)
  	.thresh(.8)
	.modulateRotate(osc(1),.04)
	.thresh(.1)
  	.diff(src(o2).scale(1.8))
	.modulateScale(osc(2).modulateRotate(o2,.74))
	.diff(src(o2).rotate([-.012,.01,-.00002,0]).scrollY(0,[-1/199800,0].fast(0.7)))
	.brightness([-.15,-.97].smooth().fast(.5))
	.out(o2)


shape([4,5,6].fast(0.9).smooth(.2),0.000001,[0.2,0.7].smooth(1))
.color(0.2,0.4,0.3)
.scrollX(()=>Math.sin(time*0.27))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.5,0.3].smooth(1))
  .color(0.6,0.2,0.5)
  .scrollY(0.35)
  .scrollX(()=>Math.sin(time*0.33)))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.0001,[0.2,0.7,0.3].smooth(1))
  .color(0.2,0.4,0.6)
  .scrollY(-0.35)
  .scrollX(()=>Math.sin(time*0.41)*-1))
.add(
      src(o0).shift(0.001,0.01,0.001)
      .scrollX([0.05,-0.05].fast(0.1).smooth(1))
      .scale([1.05,0.9].fast(0.3).smooth(1),[1.05,0.9,1].fast(0.29).smooth(1))
      ,0.85)
.modulate(voronoi(10,2,2))
.luma(.19)
.out(o2)

/*osc(5,.1).modulate(noise(6),.22).diff(o0)
  	.modulateScrollY(osc(.1).modulate(osc().rotate(2.2),.11))
	.scale(.72).color(0.99,1.014,1)
.modulateRotate(noise(10),1)
.saturate(0)
.brightness(-.1)
.luma(.2)*/
osc(5,.1).modulate(noise(6),.22).diff(o0)
  	.modulateScrollY(osc(.1).modulate(osc().rotate(2.2),.11))
	.scale(.72).color(0.99,1.014,1)
.modulateRotate(noise(11),1)
.brightness(-.7)
.contrast(.6)
.luma(.1)
.saturate(0)
.scale(0.6)
	.brightness([-.02,-.13].smooth().fast(.5))
.out(o2)


// sfera (s0) + testo sovrapposto (s1) + modulazione con forme (o0)
src(o2).blend(src(s0),.1)
//.diff(src(o2),1)
//
.layer(src(s0).color(1,1,1,() => fadeAlpha())).modulateScale(src(s0).scale(1.31), 2)
//
.layer(src(o3).color(1,1,1,() => fadeAlpha()))
.layer(src(o1).color(1,1,1,() => fadeAlpha())).modulateScale(src(s0).scale(1.01), 1)
//.diff(src(o1),1)
  .out()

