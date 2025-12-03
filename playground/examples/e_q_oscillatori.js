
Clock.bpm = 130

Theory.mode = 'dorian'
verb = Bus2().fx.add( Reverb() )
Theory.root.seq(['c4','eb4','d4','b3'],1/2)

s = PolySynth('blank', { waveform:'pwm' }).note.seq( 2, 1/4 )
s.pulsewidth = gen( .2 + cycle(4.35) * .2 )

bass = Monosynth('bass')
bass.note.seq( [0], [1/8,1/4,1/8] )
bass.decay = .2
bass.gain = .5
bass.fx.add(Distortion())

bass.fx.remove(0)
bass.fx[0].inspect()


s.note.seq( 
    gen( cycle(2) * 7 ), 
    Hex(0x8036) 
)

s.note.seq( 
    gen( 7 + cycle(2.25) * 4 ), 
    Hex(0x4541), 
    1 
)

perc.voices.forEach( (v,i) => v.pan = i * .25 )

// cambiamo anche altre proprietà della
// nostra prima voce.

perc.voices[0].cutoff = .35
perc.voices[0].Q = .75
perc.voices[0].glide = 500
s.inspect()


s = Synth('blank', { waveform:'saw' }).note.seq( 14, 1 )

// suona piuttosto aspro vero? ora prova questo:
s.antialias = true

// L'impostazione predefinita per Gibber è di usare oscillatori
// antialias, ma per certi tipi di musica (come chiptune / stili 8-bit)
// potresti voler disattivare questa opzione nei tuoi preset. Nota che per
// note più basse l'effetto è molto meno percettibile:

s = Synth('blank', { waveform:'saw' }).note.seq( -14, 1 )

// suona solo un po' più morbido dopo aver fatto questo:
s.antialias = true