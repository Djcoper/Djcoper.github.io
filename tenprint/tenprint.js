function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  stroke( 255 );
  strokeWeight(10);
  background(74, 154, 239);


}

area = 30;
x = 0;
y = 0;
time = 60 * 1;
function draw() {



  if ( frameCount % time === 0 ) {
   background(74, 154, 239);
   y = 0; 

  }

  while ( y < height ) {

  if ( random ( 1 ) < 0.5 ) {
    line( x,y, x+area,y+area );
  } else {
   line( x+area,y, x,y+area );
  }

  if ( x > width ) { x = -area; y += area; }

  x += area;

 }

}