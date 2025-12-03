
Clock.bpm = 130

Theory.mode = 'dorian'
verb = Bus2().fx.add( Reverb() )
root = Theory.root.seq(['c4','eb4','d4','b3'],1/2)

s = PolySynth('blank', { waveform:'pwm' })
s.pulsewidth = gen( .41 + cycle(8.35) * .2 )
s.note.seq( 2, 1/4,0)

console.log(s.voices)

bass = Monosynth('bass')

bass.note.seq( [0], [1/8,1/4,1/8])
bass.decay = .2
bass.gain = .2

verb.inspect()
verb.gain = .9



bass.fx.add(Reverb())
bass.fx.add(Distortion())

bass.fx.remove(1)
bass.fx[0].gain = 1
bass.fx[0].inspect()
bass.fx[0].dry = .9

s.note.seq( 
    gen( cycle(2) * 7 ), 
    Hex(0x8036), 1 
)

s.note.seq( 
    gen( 7 + cycle(2.25) * 4 ), 
    Hex(0x4541), 
    2
)

s.voices.forEach( (v,i) => v.pan = i * .25 )

// cambiamo anche altre proprietà della
// nostra prima voce.

perc.voices[0].cutoff = .35
perc.voices[0].Q = .75
perc.voices[0].glide = 500
s.inspect()

s.antialias = false

s = Synth('blank', { waveform:'saw' }).note.seq( 14, 1/8 )

s.note.seq( 0, 1/16, 1).decay = .1

solo(s,root)


s.fx.add(BitCrusher())

s.fx[0].bitDepth = .18
s.fx[0].inspect()
s.fx[0].sampleRate = .5
// suona piuttosto aspro vero? ora prova questo:


// L'impostazione predefinita per Gibber è di usare oscillatori
// antialias, ma per certi tipi di musica (come chiptune / stili 8-bit)
// potresti voler disattivare questa opzione nei tuoi preset. Nota che per
// note più basse l'effetto è molto meno percettibile:

s = Synth('blank', { waveform:'saw' }).note.seq( -14, 1/2 )

// suona solo un po' più morbido dopo aver fatto questo:
s.antialias = true