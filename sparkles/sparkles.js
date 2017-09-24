/**
 * MIT License
 * 
 * Copyright (c) 2017 ORLANDO P RODRIGUES ( djcoper ).
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
///////////////////////////////////
var setup = false,draw = Main,//
////GLOBAL VARIABLES///////////////
countdown = 10,
started = false,
showingStars = false,
rote = 1.3,
/////////sparkle variables/////////////////
mouseWasMoved = false,
sparkles_movement_speed  =  3,
sparkle_trail = 100,
sparkle_weight = 0,
/////////sparkle variables/////////////////

///////////controlCenter////////////////////
mouseWasPressed = false,
show_controls = false,
show_controls_done = false,
sliders_made = false,
rccx = 1, rccy = 1,
///////////controlCenter////////////////////


////GLOBAL VARIABLES//////////


////////ARRAYS///////////////
sparkles = [],stars = [],//
////////ARRAYS///////////////


//////////////SFX VARIABLES///////////////////
song,bg_sfx_playing  =  false,
twinkle_sfx_playing,
////////////////SOUNDS ARRAY//////////////////
sfx = ['./audio/','Blonde Redhead - For The Damaged Coda AFTER INTRO.mp3',

'Blonde Redhead - For The Damaged Coda INTRO.mp3',

//'Balada para Adelina Harp.mp3',
//'Ballade pour Adeline - Richard Clayderman Piano.mp3'
];
////////////////SOUNDS ARRAY//////////////////
//////////////SFX VARIABLES///////////////////


////////////LOAD SOUNDS INTO ARRAY/////////////
function preload(){
  for(i = 1; i<sfx.length; i++){
    sfx[i]  =  loadSound(sfx[0] + sfx[i]);
  }
}///////////LOAD SOUNDS INTO ARRAY/////////////


/////////Main//////////////
function Main () { 
if(!setup){setup = true;
/////////SETUP////////////
  makeCanvas();noStroke();rectMode(CENTER);
  xdir  =  sparkles_movement_speed; ydir  =  sparkles_movement_speed;
  x = width/2; y = height/2;//random(100,width-100); y = random(100,height-100);  // =  width/2; y  =  50;
  xturn  =  random(300); yturn  =  -random(200);
  song  =  Math.floor(random(2,sfx.length));
}////////SETUP////////////
//
/////////Main loop//////////////

  startScreen();
  if(started){showSparkles(sparkle_weight);}

}////////Main loop///////////////



function mousePressed(){mouseWasPressed = true;}

/////////////////PICK NEW SONG ON MOUSE CLICK////////////////////
//  sfx[song].stop();
//  song  =  Math.floor(random(2,sfx.length));
//  bg_sfx_playing  =  false;
/////////////////PICK NEW SONG ON MOUSE CLICK////////////////////


/////////////////////MAKE CONTROL CENTER//////////////////////////
function controlCenter(){fill(255);
  ccX  =  width/2 + rccx; ccY  =  height+123 +rccy;

  if(mouseWasPressed && dist(mouseX,mouseY,ccX,ccY-137)<15){
    mouseWasPressed = false;

    if(!show_controls){
      show_controls = true;
    }else 
    if(show_controls){
     show_controls = false;
    }
  }

  let open_speed = 15;

  if(show_controls && rccy > -200) { rccy-=open_speed }

  //if(rccy < -100){ show_controls = false;}

  if(rccy < 1 && !show_controls){ rccy+=open_speed -10;}

  if(rccy === 1){offset = 30; txt = "SHOW" } else {
    offset = 23; txt = "HIDE"
  }

//show_controls_done = true

  //if(show_controls && rccy < 1){rccy++}

 // if( rccy < -100  ){ console.log(rccy); }

  //rccx  =  0; rccy  =  0;

  rect(ccX,ccY -25, 190,200);

  rect(ccX,ccY-137, 60,25);

  //fill(0);
  //ellipse(ccX,ccY-137, 60,25);

  fill(0);
  text(txt, ccX -offset,ccY-132)

/**ellipse(width/2,height-80, 150,150);
  ellipse(ccX,ccY-80, 153,153);
  fill(0,0,40);
  ellipse(ccX,ccY-150, 30,30);
**/


  if(!sliders_made){sliders_made = true;

    spark_size  =  createSlider(3,10,6.5,0.1);

    trail_length =  createSlider(0,10,0,1);

    spark_mass =  createSlider(0,3,0,0.1);
  }

  sparkle_weight = spark_mass.value();

  sparkle_trail = map( trail_length.value(),0,10 ,100,40 )

  let slidersX, slidersY;

  if(show_controls){
  slidersX = 66, slidersY = 80
  }else{ slidersX = width, slidersY = 0 }

  text("Spark Size : "+spark_size.value(), ccX -65, ccY -95);
  spark_size.position(ccX -slidersX, ccY -slidersY -10);

  text("Spark Trail : "+trail_length.value(), ccX -65, ccY -45);
  trail_length.position(ccX -slidersX, ccY -slidersY +40);

  text("Spark Mass : "+spark_mass.value(), ccX -65, ccY +5);
  spark_mass.position(ccX -slidersX, ccY -slidersY +90);

}

/////////////////////MAKE CONTROL CENTER//////////////////////////


/////////////StartScreen/////////////////////
function startScreen(){

  if(!bg_sfx_playing){bg_sfx_playing  =  true;
    sfx[song].loop(); 
  }

  if(!started){background(0,0,40); showStars(); fill(255);

//////////MAKE START SCREEN TEXT////////////////

/////////DISPLAY COUNTDOWN////////////////////
    textSize(200);
    let padding  =  110;
    if(countdown<10){ padding  =  40; }
    text(countdown,width/2-padding,height/2+65); 
/////////DISPLAY COUNTDOWN////////////////////

///////////USAGE GUIDE TEXT//////////////
    textSize(30);msgX = width/2-270;msgY = 80;
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

  if(countdown>0&&frameCount%65 === 0){countdown--}
  if(countdown<1){ started = true; }
}
/////////////StartScreen/////////////////////


/////////CHECK IF MOUSE WAS MOVED/////////////////
function mouseMoved(){mouseWasMoved = true;}//
/////////CHECK IF MOUSE WAS MOVED/////////////////

///////////////////SHOW SPARKLES////////////////
function showSparkles(n){sfxPlay();
  controlCenter();

  //if( n  ===  undefined ) {sparkle(x,y);}
  if( n > -1 ){ sparkle(x,y);}
  if( n > 1){ sparkle(x,y);}
  if( n > 2){sparkle(x,y);}
  if( n > 3){sparkle(x,y);}

  x += xdir; y += ydir;
  if(frameCount%50 === 0){
  xturn  =  random(300); yturn  =  -random(300);
  }padding  =  5;
  if(x > width-padding+ -xturn ||x <padding+xturn){xdir*=  -1}
  if(y > height/2+padding + -yturn ||y <150+padding+yturn){ydir*= -1}
//
  sec = 60*5;
  if(frameCount%sec === 0){sfx[song].setVolume(1); mouseWasMoved  =  false; }

  if(mouseWasMoved){
    sfx[song].setVolume(0);
    x = mouseX; y = mouseY;
  }else{
   x  =  x; y  =  y;
   }

////////////////MAKE SPARKLES STAR/////////////////
  push();
  translate(x,y);
  rotate(rote);
  for(i=0 ; i < 5; i++){
    ellipse(0,5,15,50);
    rotate(1.3);
  }
  pop();
  rote+=map(xturn, 0,300, -0.02,0.02) //0.01;
////////////////MAKE SPARKLES STAR/////////////////

}///////////SHOW SPARKLES///////////

/**

  trinkle_sfx_speed  =  random(0.7,1.2);
  if(!bg_sfx_playing){
    bg_sfx_playing  =  true; sfx[2].loop(0,trinkle_sfx_speed);
  }

**/


function sfxPlay(){

  if( !mouseWasMoved ){
    twinkle_sfx_playing  = false; sfx[1].stop();
  }

  if(!twinkle_sfx_playing &&mouseWasMoved){
    twinkle_sfx_playing = true;
    trinkle_sfx_speed  =  1//random(0.7,1.2);
    sfx[1].loop(0,trinkle_sfx_speed);
  }
}


////////DEFINE THE STAR////////
function Star(){
this.x  =  random(width);
this.y  =  random(height);
this.twinkle  =  0;
this.size  =  random(1.5,3);

  this.show  =  function(){
    if(frameCount%10 === 0){
      this.twinkle  =  random(100,255);
    }
    fill(this.twinkle);
    ellipse(this.x,this.y,this.size);
  }
}////////DEFINE THE STAR////////

////////MAKE 300 STARS AND SHOW THEM////////
function showStars(){background(
  0,0,40,sparkle_trail);

  ////moon///
  if(started){
   fill(255);
   ellipse(100,100,150,150);
   fill(0,0,40);
   ellipse(130,90,130,130);
  }////moon///

  if(!showingStars){showingStars = true;
   for(i = 0;i<300;i++){stars[i]  = new Star;}
  }
  for(i = 0;i<stars.length;i++){
    stars[i].show();
  }
}////////MAKE 300 STARS AND SHOW THEM////////

////////MAKE all the SPARKS////////
function sparkle(x,y){showStars();
  spark  = new Spark(x,y);
  sparkles.push(spark);
  for(i = 0;i<sparkles.length;i++){
    sparkles[i].show();
   }
  if(sparkles.length > 200){
    sparkles.splice(0,1); 
  }
}////////MAKE all the SPARKS////////

////////DEFINE THE SPARK////////
function Spark(x,y){
this.x  =  x; this.y  =  y;
this.speed  =  random(0.5);
this.xdir  =  random(-this.speed, this.speed);
this.ydir  =  random(-this.speed, this.speed +2);

this.size  =  random(spark_size.value()) //random(2,3.8);
this.c  =  [249, 206, 29, 150]; //  =  [random(100,255),random(100,255),random(100,255)];
this.shape  =  [ellipse,rect];
this.pickshape  =  Math.floor(random(2));

  this.show = function(){
    //if(frameCount%1 =  =  = 0){ this.size  =  random(2.8);} 
    if(frameCount%15 === 0){ 
      this.c  =  [random(100,255),random(100,255),random(100,255)];

      //this.pickshape  =  Math.floor(random(2));

    }
    fill(this.c);this.shape[this.pickshape](
      this.x += this.xdir,
      this.y += this.ydir,
      this.size,this.size
    );
  }
}///////////DEFINE THE SPARK///////////

////////MAKE AND UPDATE CANVAS///////
function windowResized(){
  resizeCanvas(window.innerWidth,window.innerHeight);
  showingStars = false;
  spark_size.position(width/2 -70,height -80);
}
function makeCanvas(){
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
}////////MAKE AND UPDATE CANVAS///////txt = "HIDE";
