/*--md
# Teoria musicale in Gibber

Gibber include un sistema di teoria musicale
che ti permette di suonare facilmente scale
e accordi, cambiare modi, note fondamentali,
e intonazioni
--*/

// Iniziamo creando un synth e sequenziando
// una serie di note ascendenti.

// Di default Gibber suona scale in La minore,
// iniziando dalla quarta ottava.

s = Synth('square.perc')
s.note.seq( [0,1,2,3,4,5,6,7,8,9,10,11,12], 1/16 )

// L'oggetto globale Theory ci permette di cambiare
// modi, note fondamentali e intonazioni. Con
// il codice sopra in esecuzione, esegui le righe
// qui sotto una alla volta

// attualmente usa solo #.
Theory.root = 'c4'

// eolio, dorico, frigio, ionico, misolidio, lidio ecc.
Theory.mode = 'lydian'
Theory.mode = 'phrygian'

// Possiamo facilmente creare progressioni di accordi
// cambiando la proprietà 'degree', che sceglie
// quale grado della scala corrente utilizzare.
// Ad esempio, dato il seguente:

Theory.root = 'c4'
Theory.mode = 'ionian'
s = Synth('square.perc')
s.note.seq( [0,1,2,3,4,5,6,7], 1/16 )

// ... cambiare il grado in IV passerà a
// Fa maggiore, o iv per Fa minore:

Theory.degree = 'IV'
Theory.degree = 'iv'

// possiamo anche cambiare le ottave aggiungendo i simboli + o -.

Theory.degree = '-IV'
Theory.degree = '--IV'
Theory.degree = '+IV'
Theory.degree = '++IV'

// e possiamo anche cambiare i modi con altri
// indicatori tradizionali degli accordi:

// locrio
Theory.degree = 'ivo'
// misolidio
Theory.degree = 'IV7'

// sequenziarli
Theory.tuning = 'ji_12'
// intonazione pitagorica, 12 passi
Theory.tuning = 'pyth_12'
// intonazione ben temperata, 12 passi
Theory.tuning = 'bach2'

// nota che in molti casi le intonazioni contengono scale
// che hanno più o meno di 12 note. Queste
// scale non funzionano con i modi occidentali standard, quindi
// probabilmente vorrai impostare il modo a null quando
// le usi.

Theory.tuning = 'slendro'
Theory.mode = null

// detto ciò, ci sono momenti in cui potresti
// voler bypassare il sistema di teoria musicale in
// gibber completamente, e fornire direttamente valori di frequenza
// agli strumenti. Puoi farlo usando il
// metodo .notef.

s = Synth('bleep').notef.seq( [100,200,300,400], 1/4 )

// di default, note() arrotonda qualsiasi argomento che gli passi
// così che possa essere usato per cercare note nella
// scala corrente di gibber. Tuttavia, il metodo notec
// (per "nota continua") ti permette di interpolare tra
// indici della scala per una gamma continua di altezze.

s = Synth('square.perc')
s.notec.seq( [0,.25,.5,.75,1,1.25,1.5,1.75,2], 1/8 )
