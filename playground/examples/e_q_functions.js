/*--md
# Funzioni
   
Una funzione descrive l'esecuzione di una o più istruzioni
In javascript possiamo avere una funzione semplicemente definita come segue:

Una funzione può prendere parametri d'ingrasso (argomenti)
e può restituire un valore (il return)
--*/

function createSynth() {
 return Synth()
}

function playSynthithFade(synth){
    synth.note.seq([1,2,3,4,5,6],[1/8,1/4,1/8])
    synth.gain.fade( 0, 1, 8 )
}

function assegnaPan(synth, valore) {
    synth.pan = valore
}

miosynth = createSynth()
