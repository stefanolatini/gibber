/*--MD
usare le grafiche in gibber

principalmente gibber usa marching.js per le grafiche 3D
ma possiamo anche usare hydra per la grafica 2D
basata su shader.

in questo tutorial vedremo entrambe le opzioni


Marching.js è una libreria di ray-marching
che consente di creare facilmente geometrie
solide costruttive (CSG) e altri effetti volumetrici.
Per maggiori informazioni su marching.js, visita:

https://charlieroberts.github.io/marching/playground/

--*/

Graphics.quality = 'low' // 'med' o 'high
b = Box().render()

// possiamo renderizzare una sfera...

s = Sphere().render()

// e possiamo renderizzare la sfera sottratta dalla scatola:
b = Box()
s = Sphere(1.25)
Difference( b,s ).render()

/*--md

# Hydra in Gibber
   
hydra è un sistema fantastico per la grafica
(principalmente) 2D, ispirato principalmente ai
sintetizzatori video analogici, e creato da 
Olivia Jack. Puoi provarlo su:

https://hydra.ojack.xyz

possiamo "iniettare" hydra in gibber usando
la funzione use(), che scaricherà hydra e lo
eseguirà all'interno di gibber.
questo tutorial fornisce i dettagli su come
farlo e alcuni trucchi per "ascoltare" gli
strumenti musicali di gibber. Per maggiori info
su hydra stesso, vedi il sito web di hydra.

per caricare hydra dobbiamo dire a gibber di
usare il file esterno. la funzione use()
restituisce una promise JavaScript che produce
il costruttore di hydra. Non hai davvero
bisogno di sapere cosa significa... esegui
semplicemente la seguente riga di codice per avviare hydra
in gibber:
--*/

use( 'hydra' ).then( init => init() )

// potrebbe volerci un secondo o due per scaricare
// hydra, ma una volta fatto possiamo eseguire
// comandi hydra proprio come nel sito web
// di hydra:

osc().out()

/*--md
noterai che gibber mette uno sfondo nero
dietro il codice in modo che rimanga
(almeno in parte) leggibile. potresti
anche voler premere la piccola freccia verso l'alto
nell'angolo in alto a destra, che nasconderà
la barra dei menu di gibber così la grafica può
essere visualizzata meglio.

in hydra, qualsiasi argomento di funzione può essere
a sua volta una funzione, che verrà valutata una
volta per frame video. il seguente codice
creerà un numero casuale che determinerà
la frequenza orizzontale del nostro oscillatore:
--*/

osc( ()=> Math.random() * 50 ).out()

// pulire gibber (con ctrl+punto) fermerà
// hydra. Puoi anche chiamare hush() per
// farlo senza pulire audio/musica.

hush()

// ora che sappiamo di poter passare una funzione
// come qualsiasi parametro di hydra, tutto ciò che dobbiamo
// fare è passare funzioni che forniscono l'output
// degli strumenti gibber per ottenere la
// sincronizzazione a/v. La proprietà __out degli
// strumenti fornirà il loro valore attuale.

k = Kick('long').trigger.seq( [.125,.5,2], 1/2 )
 
osc(100,.1,1)
  .kaleid( ()=> 2 + k.__out * 25 )
  .out()

// per rendere questi tipi di mappatura più
// semplici, gibber aggiunge una funzione .out()
// ad ogni strumento che a sua volta restituisce
// una funzione che fornisce il suo valore. Puoi
// anche passare un argomento per scalare l'output
// e per spostarlo. Questo significa che il codice
// sopra può essere abbreviato in:

k = Kick('long').trigger.seq( [.125,.5,2], 1/4 )
 
osc(100,.1,1)
  .kaleid( k.out(25,2) )
  .out()

// licenziato con CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @naoto_hieda

osc(20, 0.1, 0).color(0, 1, 2).rotate(1.57/2).out(o1)

osc(30, 0.01, 0).color(9, 0.7, 1).modulate(o1, 0).add(o1,1).modulatePixelate(o1,2,13).out(o0)


render(o1)
//render(o1)

