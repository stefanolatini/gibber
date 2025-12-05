/*--md
# Sound Design: Il Synth

avendo precedentemente coperto le caratteristiche comuni 
alla maggior parte dei synth in gibber (oscillatori,
inviluppi e filtri) questo tutorial discuterà
le caratteristiche/proprietà che rendono il Monosynth
unico.
--*/

m = Monosynth({ 
  detune2:-.5, detune3:1, antialias:true, octave:-1
}).note.seq( 0, 1/4 )

/*--md

## il Monosynth
iniziamo con il Monosynth, che ha
forse le proprietà extra più semplici da
capire. Il nome "monosynth" prende spunto
dai sintetizzatori analogici classici che
creavano suoni enormi sovrapponendo oscillatori,
ma solo per una singola nota (pensa a quasi
tutti i Moog degli anni '70). In gibber, ogni
Monosynth ha tre oscillatori che possono
essere detonati per creare effetti diversi.

detune2 intona il secondo oscillatore, mentre
detune3 intona il terzo. La frequenza degli
oscillatori 2 e 3 è determinata dalla
seguente formula:

frequency = oscillator1.frequency + (oscillator1.frequency * detuneValue)

Quindi se il nostro oscillatore principale ha una frequenza di
220, il nostro valore detune2 è 1 e il nostro valore detune3
è -.5, otterremo oscillatori che funzionano a frequenze
di 110, 220 e 440. Quando raddoppi la frequenza
di un oscillatore lo alzi percettivamente di un'ottava,
quindi queste tre frequenze sono tutte separate da un'ottava.

forse contro-intuitivamente, se cambiamo detune2 a
-.75 finiamo per ottenere un calo di due ottave:
--*/

m = Monosynth({ 
  detune2:-.75, detune3:1, antialias:true, octave:-1
}).note.seq( 0, 1/4 )

// ... ma se fai i conti (220 + -.75 * 220) vediamo
// che il valore finale è 55, che è la metà di 110,
// e quindi un'ottava più bassa. Mentre spaziare gli oscillatori
// di un'ottava è bello, possiamo anche usare valori molto più piccoli
// per 'ispessire' un suono.

m = Monosynth({ 
  detune2:-.005, detune3:.005, antialias:true, octave:-1
}).note.seq( 0, 1/4 )

// prova a cambiare i valori detune sopra a 0 e ri-eseguire
// per sentire l'effetto. Gli oscillatori che sono leggermente detonati
// l'uno dall'altro creano un effetto simile al chorus, sfasato. Possiamo
// accoppiare questo con la nostra precedente detonazione di ottava:

m = Monosynth({ 
  detune2:-.7525, detune3:-.5025, antialias:true, octave:-1, decay:1/8
}).note.seq( sine(btof(3.5),5) , Euclid(5,8)  )

// possiamo usare la detonazione per suonare più note alla volta.
// Per esempio, il preset 'bass.stab' ha un valore detune2
// di 1.5 e un valore detune3 di .5.

bass = Monosynth('bass.stab')
  .note.seq( 
    gen( beats(8) * 4 ), 
    Euclid(5,16) 
  )

// ultimo ma non meno importante, è importante menzionare che
// anche se il nome è 'monosynth', puoi ancora
// fare versioni polifoniche di esso. questo permette di creare
// accordi spessi di molti oscillatori, al potenziale
// costo di qualche CPU... specialmente se stai usando
// oscillatori antialiased. la versione polifonica
// è chiamata PolyMono, un riferimento ironico al
// classico synth analogico Korg MonoPoly.

verb = Bus2().fx.add( Reverb() )
pad = PolyMono('lead').connect( verb, .15 )
pad.chord.seq( Rndi(-7,7,4), 1 )

// prova a cambiare il preset in 'lead.saw' o
// 'lead.pwm' per sentire come suona con
// diversi tipi di onde.

/*--md
## Polifonia & voci
    
La maggior parte dei synth in Gibber può suonare
solo una nota alla volta; sono 
monofonici. Questo tutorial descrive
le caratteristiche speciali / considerazioni
per i synth polifonici di Gibber,
attualmente PolySynth, PolyFM, PolyComplex,
PolyConga, PolyMono e il Multisampler.

** __--__--__--__--__--__--__--__

--*/

// Iniziamo usando il PolySynth
// dalla demo iniziale, con alcune 
// piccole modifiche.
Clock.bpm = 140
  
verb = Reverb.space.bus()
 
perc = PolySynth('square.perc').connect( verb, .5 )
 
perc.note.seq( 
  gen( cycle(2) * 7 ), 
  Hex(0x8036) 
)

perc.note.seq( 
  gen( 7 + cycle(2.25) * 4 ), 
  Hex(0x4541), 
  1 
)

// Un polysynth è composto da più strumenti
// regolari instradati in un unico bus audio;
// puoi trovare questi strumenti nella proprietà
// .voices del polysynth. Hanno anche un algoritmo
// di allocazione delle voci che determina quale 
// voce suona ogni nota.

// Per impostazione predefinita, tutte le voci sono panpottate al centro,
// e instradate al bus. Quando cambi il pan
// del bus principale, cambi il pan relativo
// di tutte le voci:

perc.pan = 0 // pan a sinistra
perc.pan = 1 // pan a destra
perc.pan = .5 // pan al centro

// ...ma puoi anche panpottare (e più in generale modificare)
// le singole voci del polysynth. In questo
// caso panpotteremo ciascuna delle quattro voci del nostro synth
// polifonico lungo lo spettro stereo.

perc.voices.forEach( (v,i) => v.pan = i * .25 )

// cambiamo anche altre proprietà della nostra
// prima voce.

perc.voices[0].cutoff = .35
perc.voices[0].Q = .75
perc.voices[0].glide = 500

