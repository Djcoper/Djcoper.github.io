var rain = [];

var size_slider;

function setup(){
createCanvas(window.innerWidth, window.innerHeight );
noStroke();
rain_size_slider = createSlider( 0,6,0,1);
rain_size_slider.position( width/2-65,height/2 -10 );

for (i = 0 ; i < 500 ; i++ ) { rain[i] = new Rain(); }

}


function draw(){
background(175, 236, 255);

var size_slider = rain_size_slider.value();

for (i = 0 ; i < rain.length ; i++ ) {

// if (mouseIsPressed) {rain[i].clicked();}else{
//   rain[i].speed = rain[i].speed;
// }

//rain[i].speed = rain[i].speed + 1

rain[i].show();
rain[i].fall();

//textSize(50);
//text(size_slider,10,50);
noStroke();
fill(255,10);
ellipse(width/2,height/2,200,200);
}

}



function  Rain(){

this.y = random(-height,-100);
this.x = random(-width,width*2 );
this.speed = random( 5,15 );
this.size = random(-3,3);

this.r = random(0,255);
this.g = random(0,255);
this.b = random(0,255);

this.clicked = function () {
  this.speed+=1;
}

this.show = function(){
this.move = map(mouseX,0,width,-3,3);

fill(this.r,this.g,this.b);

//fill(255,150)

noStroke();
//stroke(255);

//fill(0,255,0);
ellipse(this.x, this.y, 2+this.size, 18+this.size);
//fill(255,0,0);
ellipse(this.x+this.move, this.y+10, 5+this.size, 15+this.size);
}

this.fall = function(){

//this.speed+=map( mouseY, 0 , height, 0,0.5);

this.y+=this.speed
this.x+=map(mouseX,0,width,-this.speed,this.speed);

if ( this.y > height ) {
 this.y = -100
 this.y = random(-height,-100);
 this.x = random(-width,width*2 );
 //this.speed = random( 4,6 );
 this.size = rain_size_slider.value() + random(-3,3);
}

}

}
