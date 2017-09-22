/**
 * MIT License
 * 
 * Copyright (c) 2017 ORLANDO P RODRIGUES.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
**/
/////////////////////////
draw=Main;setup=false; //
////GLOBAL VARIABLES/////
sliders_made = false;
mouseWasMoved = false;
countdown=1;
started=false;
//
/////////////////ARRAYS/////////////////////
sparkles=[]; stars=[];showingStars=false; //
/////////////////ARRAYS/////////////////////
var speed = 1;

bg_sfx_playing = false;
twinkle_sfx_playing = false;

var sfx = ['./audio/','Twinkle - Dust.mp3',

'Blonde Redhead - For The Damaged Coda.mp3',

'Balada para Adelina Harp.mp3',

'Ballade pour Adeline - Richard Clayderman Piano.mp3'

];

var song;

function preload(){
  for(i=1; i<sfx.length; i++){
    sfx[i] = loadSound(sfx[0] + sfx[i]);
  }
}

/////////Main//////////////
function Main () { 
if(!setup){setup=true;
/////////SETUP////////////
  makeCanvas();noStroke();rectMode(CENTER);
  xdir = speed; ydir = speed;
  x=random(100,width-100); y=random(100,height-100);  //= width/2; y = 50;
  xturn = random(300); yturn = -random(200);

  song = Math.floor(random(2,sfx.length));

}////////SETUP////////////
//
/////////Main loop//////////////

  if(!bg_sfx_playing){bg_sfx_playing = true;
    sfx[song].loop(); 
  }

  startScreen();

  if(started){showSparkles();}

}////////Main loop///////////////


//function mousePressed(){}


/////////////StartScreen/////////////////////

function controlCenter(){fill(255);

  rccx = 0; rccy = 0;

  ccX = width/2 + rccx; ccY = height +rccy;

  rect(ccX,ccY-75, 150,100);
  //ellipse(width/2,height-80, 150,150);
  if(!sliders_made){sliders_made=true;

    spark_size = createSlider(3,6,3,0.1);
    spark_size.position(ccX-66, ccY-80);

  }
  spark_size_value = spark_size.value();
  fill(0);
  text("Spark Size : "+spark_size_value, ccX-65, ccY- 90);

}



function startScreen(){
  if(!started){background(0,0,40); showStars(); fill(255);

//////////MAKE START SCREEN TEXT////////////////

/////////DISPLAY COUNTDOWN////////////////////
    textSize(200);
    var padding = 110;
    if(countdown<10){ padding = 40; }
    text(countdown,width/2-padding,height/2+65); 
/////////DISPLAY COUNTDOWN////////////////////

///////////USAGE GUIDE TEXT//////////////
    textSize(30);msgX=width/2-270;msgY=80;
    text("Move your mouse to guide the Sparkles,", msgX,msgY);
    text("Or do nothing and watch what happends.", msgX,msgY+30);
///////////USAGE GUIDE TEXT//////////////

////////////////SUGGESTIONS TEXT/////////////////////

    textSize(19);

    text("All improvement suggestions appreciated.",
      width/2 -240,height -120);

    text("The Developer Can Be Contacted @ djcoper.github.io@gmail.com",
      width/2 -240,height -90);

/////////Copyright Notice TEXT///////////
    text("Sparkles Copyright (c) 2017 ORLANDO P RODRIGUES.",
      width/2 -240,height -50);
/////////Copyright Notice TEXT///////////

  }/////////MAKE START SCREEN TEXT////////////////

  if(countdown>0&&frameCount%65===0){countdown--}
  if(countdown<1){ started=true; }
}

/////////////StartScreen/////////////////////


/////////CHECK IF MOUSE WAS MOVED/////////
function mouseMoved(){mouseWasMoved=true;}
/////////CHECK IF MOUSE WAS MOVED/////////

///////////SHOW SPARKLES////////////
function showSparkles(n){controlCenter();

  sfxPlay();

  if( n === undefined ) {sparkle(x,y);}
  if( n > 0 ){ sparkle(x,y);}
  if( n > 1){ sparkle(x,y);}
  if( n > 2){sparkle(x,y);}

  x+=xdir; y+=ydir;
  if(frameCount%50===0){
  xturn = random(300); yturn = -random(300);
  }padding = 5;
  if(x > width-padding+ -xturn ||x <padding+xturn){xdir*= -1}
  if(y > height/2+padding + -yturn ||y <150+padding+yturn){ydir*=-1}
//
  sec=60*5;
  if(frameCount%sec===0){sfx[song].setVolume(1); mouseWasMoved = false; }

  if(mouseWasMoved){
    sfx[song].setVolume(0);
    x=mouseX; y=mouseY;
  }else{
   x = x; y = y;
   }
}///////////SHOW SPARKLES///////////

/**

  trinkle_sfx_speed = random(0.7,1.2);
  if(!bg_sfx_playing){
    bg_sfx_playing = true; sfx[2].loop(0,trinkle_sfx_speed);
  }

**/


function sfxPlay(){

  if( !mouseWasMoved ){
    twinkle_sfx_playing =false; sfx[1].stop();
  }

  if(!twinkle_sfx_playing &&mouseWasMoved){
    twinkle_sfx_playing=true;
    trinkle_sfx_speed = random(0.7,1.2);
    sfx[1].loop(0,trinkle_sfx_speed);
  }
}


////////DEFINE THE STAR////////
function Star(){
this.x = random(width);
this.y = random(height);
this.twinkle = 0;
this.size = random(1,2);

  this.show = function(){
    if(frameCount%10===0){
      this.twinkle = random(155,255);
    }
    fill(this.twinkle);
    ellipse(this.x,this.y,this.size);
  }
}////////DEFINE THE STAR////////

////////MAKE 300 STARS AND SHOW THEM////////
function showStars(){background(
  0,0,40,130);

  ////moon///
  if(started){
   fill(255);
   ellipse(100,100,100,100);
   fill(0,0,40);
   ellipse(130,90,90,90);
  }////moon///

  if(!showingStars){showingStars=true;
   for(i=0;i<300;i++){stars[i] =new Star;}
  }
  for(i=0;i<stars.length;i++){
    stars[i].show();
  }
}////////MAKE 300 STARS AND SHOW THEM////////

////////MAKE all the SPARKS////////
function sparkle(x,y){showStars();
  spark =new Spark(x,y);
  sparkles.push(spark);
  for(i=0;i<sparkles.length;i++){
    sparkles[i].show();
   }
  if(sparkles.length > 200){
    sparkles.splice(0,1); 
  }
}////////MAKE all the SPARKS////////

////////DEFINE THE SPARK////////
function Spark(x,y){
this.x = x; this.y = y;
this.speed = random(0.5);
this.xdir = random(-this.speed, this.speed);
this.ydir = random(-this.speed, this.speed +2);

this.size = random(spark_size.value()) //random(2,3.8);
this.c = [249, 206, 29, 150]; // = [random(100,255),random(100,255),random(100,255)];
this.shape = [ellipse,rect];
this.pickshape = Math.floor(random(2));

  this.show=function(){
    //if(frameCount%1===0){ this.size = random(2.8);} 
    if(frameCount%15===0){ 
      this.c = [random(100,255),random(100,255),random(100,255)];
      //this.pickshape = Math.floor(random(2));
    }
    fill(this.c);this.shape[this.pickshape](
      this.x+=this.xdir,
      this.y+=this.ydir,
      this.size,this.size
    );
  }
}///////////DEFINE THE SPARK///////////

////////MAKE AND UPDATE CANVAS///////
function windowResized(){
  resizeCanvas(window.innerWidth,window.innerHeight);
  showingStars=false;
  spark_size.position(width/2 -70,height -80);
}
function makeCanvas(){
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
}////////MAKE AND UPDATE CANVAS///////

