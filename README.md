# Gibber (errore_quadrato) #

Fork di Gibber per il workshop di livecoding
della prima edizione di "errore_quadrato"

## Requisiti di sistema
- [`node`](https://nodejs.org/en): **v20.19.6**
- [`couchdb`](https://couchdb.org): **2.3.1**

## Playground ##

Per eseguire il playrground localmente avrete bisogno di un [web server](https://en.wikipedia.org/wiki/Web_server)
Potete farlo usando anche Visual Studio Code o node.js

### Startare il Server con Visual Studio Code
1. Installa [Visual Studio Code](https://code.visualstudio.com/)
2. Installa l'[estensione Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
3. Apri la cartella `playground` in VS Code, usando la voce di menu "Apri Cartella..."
4. Clicca sul link "Go Live" nella barra di stato in basso - un server si avvierà e il browser si aprirà automaticamente al playground!

### Startare il  Server con node.js
1. Installa [Node.js](https://nodejs.org/en/) se non lo hai già.
2. Dopo aver clonato questa repo di gibber (o averla installata via npm), installa tutti i moduli richiesti eseguendo `npm i` all'interno della repo.
3. Dalla cartella principale della repo, esegui `npm start`.
4. Ora puoi caricare gibber all'indirizzo http://127.0.0.1:9080


## Usare Gabber

Gabber è la modalità collaborativa di Gibber per consentire a più utenti di fare livecoding insieme.
Il principio è lo stesso delle chat di gruppo, si crea una room e un utenza, si entra e Gibber riproporrà in locale tutto quello che viene eseguito dagli utenti nella room e distribuirà agli altri utenti quello che viene eseguito in locale.

**NOTA: per Gabber è necessario non andare in CORS**
Poiché la tecnologia WebSocket (usata per scambiare messaggi col server) non consente di avere server e client sullo stesso hostname, consigliamo vivamente l'uso di [`ngrok`]().
Se abbiamo il server locale su localhost:9080 ci basta eseguire:

1. `ngrok http 9080`
```shell
Session Status                online                                                                                       
Account                       Stefano Latini (Plan: Free)                                                                  
Update                        update available (version 3.33.1, Ctrl-U to update)                                          
Version                       3.9.0                                                                                        
Region                        Europe (eu)                                                                                  
Latency                       37ms                                                                                         
Web Interface                 http://127.0.0.1:4040                                                                        
Forwarding                    https://15281b45fc47.ngrok-free.app -> http://localhost:9080                                 
                                                                                                                           
Connections                   ttl     opn     rt1     rt5     p50     p90                                                  
                              280     0       0.00    0.00    1.67    8.11                   
```

## Buildare Gibber ##
Ci sono tre componenti principali che questa repo racchiude, oltre a fornire l'interfaccia di editing.

1. [gibber.audio.lib](https://github.com/charlieroberts/gibber.audio.lib)
2. [gibber.graphics.lib](https://github.com/charlieroberts/gibber.graphics.lib)
3. [gibber.core.lib](https://github.com/charlieroberts/gibber.core.lib)

Supponendo che tu abbia node/npm installato, puoi eseguire `npm i` al livello superiore di questa repo per ottenere tutti i moduli necessari per compilare l'editor; puoi quindi compilare la libreria / editor eseguendo `npm run build`. Questo ricostruirà il file `playground/bundle.js` che è incluso in un tag script all'interno della pagina `index.html` del playground.

Se vuoi modificare le singole librerie elencate sopra, clona quelle che ti interessano sul tuo computer (invece di installarle via npm) e poi esegui `npm link` all'interno di ciascuna. Quindi esegui `npm run link` all'interno del livello superiore della repo principale (questa). Questo collegherà le copie locali delle librerie che hai clonato nella pipeline di build.
