// YNES 2

use( 'hydra' ).then( init => init() )

voronoi(2,0.3,0.2).shift(0.5)
.modulatePixelate(voronoi(4,0.2),32,2)
.scale(()=>1+(Math.sin(time*2.5)*0.05))
.diff(voronoi(7).shift(.6))
.diff(osc(2,0.15,1.3).rotate())
.brightness(0.0001).contrast(1.1).saturate(.93)
	.out()
speed = 0.7
