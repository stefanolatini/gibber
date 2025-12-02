
/*--md
# Eseguire / Stoppare codice
   
in questo tutorial non ci preoccuperemo ancora di cosa
fa il codice, ma solo di come eseguirlo 
e fermarlo. C'è un po' più di quello che potresti pensare...

Per eseguire una riga di codice, puoi fare una delle
seguenti cose:
1. Posiziona il cursore nella riga che desideri eseguire e
premi `Control+Enter`.
2. Seleziona l'intera riga di codice con il mouse o le
scorciatoie da tastiera e premi `Control+Enter`.

Prova una di queste opzioni con il codice qui sotto:
--*/

Box().render()


/*--md

Per stoppare qualsiasi audiovisivo in esecuzione, premi `Control+,` 
(control + punto). Fallo ora. Per alcune disposizioni della tastiera, 
questa combinazione non funzionerà; se ciò accade a te prova 
`Shift+Control+punto`. 

Puoi anche evidenziare più righe di codice per eseguirle tutte
insieme. Prova questo con il codice qui sotto:
--*/

d = Difference(
  j = Julia().scale(2),
  Sphere(2).texture( 'truchet', {scale:50})
).render()
  
onframe = t => d.rotate(t*20,0,1,0)
j.fold = gen( 5 + cycle(.05) )


/*--md

Usa `Ctrl+H` per nascondere/mostrare l'editor e concentrarti sulla grafica.

Puoi anche eseguire "blocchi" di codice posizionando il cursore
all'interno di un blocco e premendo `Alt+Enter` (`Option+Enter` 
in macOS). Un blocco è un pezzo di codice con una riga vuota
su entrambi i lati. L'esempio sopra è un blocco perché la
riga sopra la definizione di `onframe` ha effettivamente uno
spazio singolo, per trasformare l'intero pezzo in un blocco.
Pulisci la scena (`Ctrl+Punto`) e poi prova a eseguire il
blocco posizionando il cursore nel blocco e premendo Alt+Enter.
Molti tutorial e demo usano questo tipo di blocchi, quindi
abituati a premere `Alt+Enter`, che è molto più veloce che
selezionare il testo e premere `Ctrl+Enter` (anche se funzionalmente
è lo stesso).

Per impostazione predefinita Gibber aspetta l'inizio della
prossima misura musicale per eseguire il codice. Prova a
eseguire il codice qui sotto:
--*/

Clock.bpm = 140
drums = EDrums()
drums.tidal( 'kd <sd cp> kd*3 <oh [sd kd]>')

// ora esegui le righe sottostanti:
bass = Monosynth('bass')
bass.note.seq( [0,7], 1/4 )

/*--md
Prendi nota di come le sequenze di batteria e basso si allineano
su una griglia ritmica. Se esegui il codice selezionandolo
e premendo `Shift+Enter`, quel codice verrà eseguito
immediatamente e probabilmente sarà fuori tempo con le altre
sequenze in esecuzione. Prova a usare `Shift+Enter` con la
sequenza qui sotto, quindi riesegui il codice usando 
`Ctrl+Enter` per sentire la differenza.
--*/

hat = Hat()
hat.trigger.seq( .5, 1/4 )
