/*--md
# Sampler

Un Sampler è uno strumento che riproduce file audio
(caricati localmente o da un server web) invece di
generare suoni tramite oscillatori come fanno gli altri
strumenti in gibber.

Puoi creare un Sampler semplicemente passando
l'URL di un file audio al costruttore Sampler:

--*/

s = Sampler('http://127.0.0.1:8080/kick.wav')

// show all samples
Sampler.list()

// playback at normal rate
s.note(1)

// playback at 3x speed
s.note(3)

// playback in reverse
s.note(-1)

// sequence
s.note.seq( [3,3,-1],[1/4,1/4,1/2] )

// we can also call .trigger and then
// control the rate property separately

Gibber.clear()

s.rate = gen( 1 + cycle(1) * .75 )

// or sequence
s.rate.seq( [-1,1,2,-2,4,-4], Euclid(3,8) )

// samplers also have start and end properties,
// which let you control how much of the
// sample is played (range 0–1).

s = Sampler({
  files:[
    'kick.wav',
    'hat.wav',
    'snare.wav',
    'openhat.wav'
  ]
})

s.trigger.seq( 1,1/16 )
// pick lets you choose which file is triggered
// make sure you don't pick a number higher than
// then number of samples you've loaded!
s.pick.seq( Rndi(0,3) )

// You can also easily load a directory of sounds.
// Each sampler has a length property that will tell you how
// many samples it contains. So, for example, if
// we want to loop through all the kicks:

Gibber.clear()