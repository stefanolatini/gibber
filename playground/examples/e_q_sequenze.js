
/*--md
# Sequenziamento di base

Questo tutorial fornirà un'introduzione al 
sequenziamento in gibber. Gibber ti permette di sequenziare 
le chiamate alla maggior parte dei metodi degli oggetti audiovisivi 
così come le modifiche a qualsiasi loro proprietà, 
semplicemente aggiungendo .seq al nome del metodo o della proprietà,
e specificando *tempi* per quando la sequenza
deve essere eseguita.
--*/

// invia un messaggio di nota con valore 0
syn = Synth( 'bleep' )
syn.note( 0 )

// ora sequenzialo per inviare il valore ogni quarto
syn.note.seq( 0, 1/4 )


/*--md
Puoi fermare tutte le sequenze in gibber con la scorciatoia Ctrl+. 
(Ctrl + punto) oppure eseguendo il comando Gibber.clear(), ma
questo elimina anche gli strumenti. Per questo tutorial, useremo invece il comando .stop()
per fermare le sequenze su uno strumento specifico:
--*/

syn.stop()


/*--md
La maggior parte delle sequenze in gibber contiene valori (0 nell'esempio sopra) 
e tempi (1/4 sopra). Per sequenziare più valori passiamo un array,
che è una lista separata da virgole racchiusa tra parentesi `[]`:
--*/

syn.note.seq( [0,1,2], 1/4 )

// ... e possiamo fare lo stesso con più tempi:
syn.note.seq( [0,1,2], [1/4,1/8] )


/*--md
Possiamo anche sequenziare il volume del nostro synth 
e il decadimento dell'inviluppo del synth. Nota che
nell'esempio sotto, stiamo sequenziando una funzione (note)
così come due proprietà (loudness e decay).
--*/

syn.stop()
syn.note.seq( 0, 1/2 )
syn.loudness.seq( [.1,.5,1], 1/2 )
syn.decay.seq( [1/16,1/4,1/2], 1/2 )

/*--md
Tutte le idee sopra in questo tutorial funzionano identicamente 
per gli oggetti visivi. Nell'esempio sotto, sequenzieremo
la proprietà fold del frattale Julia, e la proprietà scale
della texture del frattale.
--*/

fractal = Julia().texture('dots', { scale:50 }).render('fractal.low')
camera.pos.z = 3
fractal.fold.seq( [1,2,3,5], 1/2 )
fractal.texture.scale.seq( [2,20,50,100], 1/4 )

// ferma le sequenze del frattale e cancella tutta la grafica dallo schermo
fractal.stop()
Graphics.clear()


/*--md
Se hai sperimentato eseguendo più variazioni delle sequenze di note 
potresti aver notato che solo una viene eseguita alla volta.
Ad esempio, se esegui queste righe:
--*/

syn.stop()
syn.note.seq( 7, 1/4 )
syn.note.seq( 0, 1/4 )


/*--md
...noterai che solo la seconda sequenza viene effettivamente attivata. 
Di default, Gibber sostituirà una sequenza esistente con una nuova. 
Per evitare questo, puoi passare un numero ID come terzo argomento alle 
chiamate di `.seq()`. Negli esempi di sequenziamento visti finora,
non è stato fornito alcun ID, il che significa che gibber assume un ID di default 0
per ogni sequenza. Quando avvii una sequenza su un metodo/proprietà
che ha lo stesso ID di un'altra sequenza attiva, la sequenza più vecchia
viene fermata. Ma se le sequenze hanno ID diversi, vengono eseguite 
contemporaneamente. Questo rende facile creare poliritmie.
--*/

// crea un PolySynth che può suonare più note contemporaneamente

syn = Conga[4]()
syn.note.seq( 0, 1 ) // assume ID 0
syn.note.seq( 2, 1/2, 1 ) // id 1 
syn.note.seq( 3, 1/3, 2 ) // id 2 
syn.note.seq( 5, 1/7, 3 ) // id 2


/*--md
Possiamo anche sequenziare le chiamate a chord. Potresti ricordare dal 
primo tutorial che passiamo a chord un array di valori, dove ogni 
valore rappresenta una nota. Questo significa che dobbiamo passare un *array di 
array* per passare tra diversi accordi.
--*/

syn.stop()
syn.chord.seq( [[0,2,4], [1,5,7]], 1/2 )

// IMPORTANTE: Anche se stiamo sequenziando un solo accordo, 
// dobbiamo comunque passare un array 2D.

