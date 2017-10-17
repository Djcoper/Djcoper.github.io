sparkles = [];

function setup() {
    createCanvas( window.innerWidth,window.innerHeight );
    for( let i = 0; i < 500; i ++ ) {
      sparkles[i] =new Spark;
    }
    noStroke();
}

function windowResized () {
  resizeCanvas( window.innerWidth,window.innerHeight );
}

function draw () {
    background( 61, 36, 68 );

        makeSparkles ();

        fill(244, 223, 66,150)
        noStroke();
         push();
       translate( width/2 , height/2 );
       for( let i = 0 ; i < 5; i ++ ){
          rotate( 1.3 );
          ellipse( 0,90,50,200 );
        }
        pop();



}

function makeSparkles () {
    for( let i = 0; i < sparkles.length; i ++ ) {
      sparkles[i].Display();
    }
}

function Spark() {
  this.x = random( width );
  this.y = random( -height );
  this.velocity = random( 2,4 );
  this.bottom = random( height/2-50, height/2+200 );
  this.size = random ( 2,8 );

  this.Render = function () {
  strokeWeight(2);
   this.alpha = map( this.y, -height/2,this.bottom, 555,0);
   fill(244, 223, 66 ,this.alpha);
   stroke(237, 82, 30 , this.alpha);
   ellipse( this.x,this.y, this.size );
  }

  this.Display = function () {
   this.Render ();this.Update();
   }

   this.Update = function () {
    this.x += random( -0.7,0.7 );
    this.y += this.velocity;
    if( this.y > this.bottom ) {
      this.x = random( width );
      this.y = - height /2; }
   }

}
