use('hy5_local') // or use('hy5') for the CDN version

delay = Delay({ time:1/2, feedback:.05 })

// Next we'll make a synth. Every synth
// in Gibber has an effects chain that
// we can add effects to.

syn = Synth( 'bleep' )

syn.fx.add( delay )

syn.fx[0].time = 1
syn.fx[0].feedback = .0007
syn.note.seq([-16,0,-8],[1/4,1/2])
syn2 =  Synth( 'bleep' )
syn.attack.seq([1/4,1,1/4],[1/4,1/2])
syn.fx[0].time = 1/16
syn.fx[0].feedback = .08
syn.fx[0].time = .0018
syn.glide = 1

console.log(syn.fx)

syn2.note.seq([-15,-15,-15,-15.5,-15.5,-15.5],[1/8,1/4,1/8])
syn2.decay = .2
syn.octave = 1

syn.gain = .8

syn2.gain = 0

syn2.loudness = .0

syn.fx.add(
    Distortion('earshred'),
    Delay({ time:1/8, feedback:.08 }),
    Reverb()
  )


m = Monosynth({ 
  detune2:-.5, detune3:1.2, antialias:true, octave:-3
})

m.fx.add(delay)
m.fx[0].time = 1/8
m.fx[0].feedback = .1

m.gain = .3
m.loudness = .9

m.octave = -3

m.detune3 = 1.02

m.detune2 = -.3

m.detune2.seq(gen( cycle(3) * 1 ), 
    Hex(0x8))

m.note.seq( [2,1,2,9], [1/8,1/8,(3/4)] )

m.decay.seq( [.7,.7,2], [1/8,1/8,(3/4)] )

drums = EDrums()
drums.gain = 0


s = Steps({
  kd: 'X...X...X...X...',                           
  ch: 'xx.xxx.x',             
  sd: '.x.x'                     ,      
}, drums )


drums.gain = .5

drums.kick.loudness = .9
drums.kick.decay = .9
drums.kick.gain = 1
drums.openHat.gain = .1
drums.closedHat.gain = .3
drums.snare.gain = .3



s0.initP5()
P5.toggle(0)
H.pixelDensity(1)

osc(drums.out(1,20)).kaleid(drums.out(1,20)).out(o1)

src(o1).modulatePixelate(o1,m.__out*10).blend(o2).out()

src(s0)
.modulate(noize(12)).modulateScale(osc(1)).out(o2)
circles = []
X = 200 // ms prima che il cerchio scompaia
function setup() {
createCanvas(windowWidth, windowHeight)
}
X = 1  // secondi prima che il cerchio scompaia
function draw() {
  clear()
  const now = millis()
  circles.push({ x: mouseX, y: mouseY, t: now })
  circles = circles.filter(c => now - c.t < X * 100)
  for (let c of circles) {
    const age = (now - c.t) / (X * 1000)
    fill(255, 255 * (1 - age))
    noStroke()
    circle(c.x, c.y, 100)
  }
  background( 0 + drums.kick.out() *230 )
  translate( width/2, height/2 )
  const b = m.out(1000,0,smooth)
  rect( b*-.5, b*-.5, b, b )
}