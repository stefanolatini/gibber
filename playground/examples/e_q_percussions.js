/*--md
# Percussioni

# Kick, Hat, Snare, Cowbell, Clap
--*/

k = Kick().trigger.seq( 1,1/4 )
 
h = Hat().connect( verb, .15 )
h.trigger.tidal( '<.5 .35*3 [.5 .25] [.75 .25 .5 .25]>' )
 
h.decay = gen( .05 + cycle(2) * .025 )

/*--md
## EDrums
*/

drums = EDrums()
drums.tidal( 'kd <sd cp> kd*3 <oh [sd kd]>')

drums.fx.add( Distortion({ pregain:1.5, postgain:1 }) )
 
drums.tidal('kd [kd, sd] kd [kd, sd]')

/*--md
## Steps con EDrums
*/
Gibber.clear()
drums = EDrums()
s = Steps({
  kd: 'x..xx.x.',                
  cp: 'x.x...',                    
  ch: 'xxx.x.x.',                 
  oh: '.x.x.',         
  sd: '.x.x'         
}, drums )