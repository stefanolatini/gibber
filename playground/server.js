const WebSocket         = require( 'ws' ),
      fs                = require( 'fs' ),
      cors              = require( 'cors' ),
      http              = require( 'http' ),
      utils             = require( 'y-websocket/bin/utils.js' ),
      express           = require( 'express' ),
      app               = express(),
      setupWSConnection = utils.setupWSConnection,
      production        = process.env.PRODUCTION  != null,
      port              = process.env.SERVER_PORT || 9080 

require( 'dotenv' ).config()

app.use( cors() )

app.use( express.static( './', { 
  setHeaders: function(res, path) {
    res.set("Cross-Origin-Embedder-Policy", "require-corp")
    res.set("Cross-Origin-Opener-Policy",   "same-origin")
  }  
}) )
   
app.use( function(req,res,next) {
  fs.readdir( __dirname + req.url, function(err,files) {
    res.json( files )
    next() 
  })
})

// Crea un server HTTP
const server = http.createServer(app)

// Configura WebSocket Server con controllo origine
const wss = new WebSocket.Server({ 
  server,
  verifyClient: (info) => {
    // Permetti connessioni da localhost e 127.0.0.1
    const origin = info.origin
    const allowedOrigins = [
      'http://localhost:9080',
      'http://127.0.0.1:9080',
      'http://localhost:8080',
      'http://127.0.0.1:8080',
    ]
    
    // Permetti domini ngrok (formato: https://xxxxx.ngrok-free.app o https://xxxxx.ngrok.io)
    const isNgrokDomain = origin && (
      origin.match(/https:\/\/[\w-]+\.ngrok-free\.app$/) || 
      origin.match(/https:\/\/[\w-]+\.ngrok\.io$/)
    )
    
    // Permetti anche richieste senza origin (per test locali)
    const allowedOrigin = !origin || allowedOrigins.includes(origin) || isNgrokDomain
    
    console.log('WebSocket connection attempt from origin:', origin)
    
    // Debug: permetti tutto temporaneamente
    console.log('Origin allowed:', true, '(debug mode)')
    return true
  }
})

const rooms = {}

wss.on('connection', (conn, req) => {
  console.log('WebSocket connection established:', req.url)
  setupWSConnection(conn, req, { gc: true })
  
  conn.on('close', () => {
    console.log('WebSocket connection closed')
  })
  
  conn.on('error', (err) => {
    console.log('WebSocket error:', err)
  })
  
  //console.log( conn )
  //const roomName = req.url.slice(1)
  //let   room = rooms[ roomName ]
  //if( room === undefined ) {
  //  room = rooms[ roomName ] = []
  //  room.name = roomName
  //  room.push( conn )
  //}else{
  //  room.push( conn )
  //  room.forEach( c => c.send( JSON.stringify({ cmd:'user', body:room.length }) ) ) 
  //}
})

server.listen( port )

//console.log(`Listening to http://0.0.0.0:${port} ${production ? '(production)' : ''}`)
console.log(`Listening to http://localhost:${port} ${production ? '(production)' : ''}`)
