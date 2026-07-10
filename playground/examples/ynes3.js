use('hy5_local')

H.hide()
H.audio(false)
noize().out()
P5.toggle(1)
P5.zIndex(0)// hide p5

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL)
	angleMode(DEGREES)
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
.out(o0)

var H2 = HY5.hydra('h2', 'synth')

H2.pixelDensity(.02)
H2.zIndex(-1)

synth.s0.initP5()

synth.src(synth.s0)
	.modulateScale(synth.src(synth.o0).scale(1.01), .5)
	.out()


// ── RESET ───────────────────────────────────────────────────────────────────
// Chiama reset() dal REPL per azzerare tutto e ripartire da zero.
// Dopo averla eseguita scrivi: use('hy5_local').then(init => init())
function reset() {
  // 1. ferma timer liveset (pattern scenes/nextScene)
  if (typeof _sceneTimer !== 'undefined' && _sceneTimer) {
    clearTimeout(_sceneTimer)
    _sceneTimer = null
  }

  // 2. svuota tutti gli output Hydra (nero solido)
  ;[o0, o1, o2, o3].forEach(out => {
    try { solid().out(out) } catch(_) {}
  })

  // 3. ferma il loop p5 e rimuove eventuali layer grafici
  try { noLoop() } catch(_) {}
  ;['lay1', 'lay2'].forEach(name => {
    try { if (window[name]) { window[name].remove(); window[name] = null } } catch(_) {}
  })

  // 4. rimuove istanze HY5 extra (H2, ecc.)
  ;['H2', 'H3'].forEach(name => {
    try {
      if (window[name]) {
        if (window[name].canvas) window[name].canvas.remove()
        window[name] = null
      }
    } catch(_) {}
  })

  // 5. nasconde il canvas Hydra principale
  try { H.hide() } catch(_) {}

  console.log("reset ✓ — ora esegui: use('hy5_local').then(init => init())")
}
