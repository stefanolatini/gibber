/*--md

sound design: Oscillaori
   
I tutorial di sound design spiegano come creare
i tuoi suoni, o "preset", in gibber. Questo
primo tutorial tratta gli oscillatori, la materia prima
di tutti gli strumenti non basati su campioni in gibber.


Lo strumento più semplice in gibber è il Synth.
Se esegui la riga qui sotto e poi scrivi s.
(s seguito da un punto) dovresti vedere una lista di tutte
le varie proprietà/funzioni associate al synth.
--*/

// Prova ora.
s = Synth()

/*--md
Una bella lista! Speriamo che dopo questa serie di tutorial capiremo
a cosa serve ciascuna di queste proprietà. Gli strumenti/preset
sono fondamentalmente una raccolta di impostazioni per queste proprietà.
Ad esempio, il Synth predefinito in gibber ha un filtro passa basso
attivo, un oscillatore a dente di sega e un inviluppo di mezzo secondo
tra le altre caratteristiche. Puoi sentire come suona:
---*/
Synth().note(0)

// Ecco un synth molto diverso con un oscillatore sinusoidale,
// un inviluppo molto più corto e un effetto delay applicato:

Gibber.clear()
Synth('bleep.echo').note(0)

// Nell'esempio sopra, 'bleep.echo' è il nome di un preset.
// L'oggetto Synth ha un preset chiamato 'blank' che useremo
// come punto di partenza per i nostri esperimenti. Questo preset non ha
// nessun filtro applicato e usa un oscillatore sinusoidale.

Synth('blank').note(0)
// La prima proprietà
// da capire è la proprietà "waveform". Ci sono cinque
// opzioni possibili: 'sine', 'saw', 'triangle', 'square',
// e 'pwm'.

s = Synth('blank').note.seq(0, 1)

// prova a eseguire queste una alla volta
s.waveform = 'triangle'
s.waveform = 'square'
s.waveform = 'saw'

// noterai che ogni suono è progressivamente più brillante.
// La morbidezza dell'onda determina la brillantezza (la presenza di
// armoniche) nell'oscillatore. Le onde sinusoidali sono le più morbide,
// seguite dalle onde triangolari. Le onde quadre hanno sezioni completamente
// piatte seguite da salti improvvisi. Le onde a dente di sega salgono gradualmente
// e poi scendono bruscamente. Nella sintesi sottrattiva, che è quella usata dalla
// maggior parte degli strumenti in Gibber, di solito si parte da una forma d'onda
// "brillante" (come saw o square) e poi si filtrano (sottraggono) le frequenze
// per creare caratteri diversi.

// c'è un altro tipo di forma d'onda che purtroppo non può essere assegnata
// dopo la creazione di un synth (a causa di un bug): pwm, che sta per "pulsewidth modulation".
// Puoi pensarlo come un valore alto (il pulse) seguito da un valore basso.
// La proprietà pulsewidth determina la relazione
// (larghezza) tra il segnale alto e quello basso. Un valore di .5 genera un'onda quadra.
 
Gibber.clear()
s = Synth('blank', { waveform:'pwm' }).note.seq( 0, 1 )

s.pulsewidth = .05
s.pulsewidth = .1
s.pulsewidth = .2
s.pulsewidth = .3
s.pulsewidth = .5

s.decay = 1
s.pulsewidth = gen( .25 + cycle(.25) * .24 )

  // puoi sentire che l'oscillatore pulsewidth può creare una grande varietà di suoni.
// Divertente da sperimentare!

// un ultimo aspetto importante degli oscillatori... se sono
// "anti-aliased" oppure no. Una spiegazione completa dell'anti-aliasing
// va oltre lo scopo di questo tutorial; se ti interessa ti consiglio
// questo saggio interattivo di Jack Shaedler:
// https://jackschaedler.github.io/circles-sines-signals/index.html

// tldr: a causa delle limitazioni dell'audio digitale, gli oscillatori di base
// introducono distorsioni che diventano particolarmente evidenti con le note alte.
// confrontiamo:

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

// questo perché nella maggior parte delle forme d'onda gli armonici diventano
// progressivamente più deboli rispetto alla frequenza fondamentale. Quando
// suoni note basse, quando gli armonici raggiungono frequenze dove
// si verifica aliasing, le alte frequenze sono così deboli che
// l'effetto è difficile da sentire.

// Nel prossimo tutorial parleremo degli inviluppi, che non solo modellano
// il volume degli strumenti gibber, ma controllano anche le impostazioni del filtro,
// FM e altro ancora.




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