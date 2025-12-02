/* __--__--__--__--__--__--__--____

sound design: audio fx e bus
   
Questo tutorial illustra come aggiungere
effetti ai synth e analizza anche
strategie per il routing del suono.
  
** __--__--__--__--__--__--__--__*/

// prima, creiamo un effetto delay.
// i due parametri importanti
// del delay sono "time" e "feedback".
// "feedback" controlla il numero di
// echi e time controlla lo spazio
// tra di essi.

delay = Delay({ time:1/6, feedback:.75 })

// Ora creeremo un synth. Ogni synth
// in Gibber ha una catena di effetti a cui
// possiamo aggiungere effetti.

syn = Synth( 'bleep' )
syn.fx.add( delay )
syn.note(0)

// quando aggiungiamo un effetto alla catena
// di effetti, Gibber assegna il synth alla
// proprietà input dell'effetto, e poi
// connette l'effetto all'output principale.
// Potremmo anche farlo manualmente:

syn  = Synth('bleep')
verb = Reverb({ input:syn }).connect()
syn.note(0)

// ... ma la catena fx è forse più
// conveniente e rende facile concatenare
// multipli fx:

syn = Synth()
  .fx.add(
  Distortion('earshred'),
  Delay({ time:1/8, feedback:.8 }),
  Reverb()
  )

syn.note(0)

// creare questa catena manualmente sarebbe
// noioso, poiché dovresti impostare l'input
// di ogni effetto come output dell'effetto
// precedente. La catena fx ti risparmia
// di doverci pensare.

// Tuttavia, in alcuni casi probabilmente
// vorrai avere più dispositivi
// connessi allo stesso effetto; per gli
// esperti audio, questo sarebbe un effetto "send".
// Possiamo farlo usando un Bus, o Bus2 per
// fx stereo e input:

verb = Bus2().fx.add( Reverb() )
syn  = Synth('square.perc', { pan:0 })
syn2 = Synth('square.perc', { pan:1 })
syn.connect( verb, .5 )
syn2.connect( verb, .5 )

syn.note(0)
syn2.note(7)

// questo è particolarmente comune per i reverb,
// dove vuoi avere il segnale dry
// connesso al bus master ma anche averlo
// inviato attraverso il reverb fx per l'elaborazione.
// ci sono numerosi preset per Bus2 che
// fondamentalmente aggiungono solo fx al bus così puoi
// usarli come effetti send. Per esempio,
// 'spaceverb' è usato in molte delle demo
// di gibber. Puoi vedere una lista di questi preset
// aprendo la console degli strumenti per sviluppatori del
// tuo browser e inserendo:
// Gibber.Audio.Presets.misc.Bus2

// oltre ad avere le proprie catene
// fx, i bus hanno anche i propri controlli
// pan e gain. In effetti, possono
// essere usati per raggruppare suoni insieme e
// farli sfumare in/out o pannarli. Tuttavia,
// la maggior parte dei synth si connette al bus master
// in Gibber per impostazione predefinita; perché questo tipo di
// raggruppamento funzioni devi prima
// disconnetterli. *questo è davvero importante
// da cercare di ricordare*

bus   = Bus2().connect()
drums = Drums().disconnect()
drums.connect( bus )
bass  = Monosynth('bass').disconnect()
bass.connect( bus )
drums.tidal( 'kd [ch kd] [kd sd] <sd ch*3>' )
bass.note.seq( [0,7], 1/4 )
bus.gain.fade( 0, 1, 8 )

// aggiungi un effetto al bus
bus.fx.add( BitCrusher({ sampleRate:.5, bitDepth:.5}) )

// sequenza l'effetto
bus.fx[0].sampleRate.seq( [.25,.35,.5], 1/2 )

// abbiamo sperimentato solo con alcuni effetti qui,
// ma ce ne sono altri da esplorare nella
// reference (collegata nel menu).

