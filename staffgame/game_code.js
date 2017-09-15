//////////////////////////////////
var staff_game_setup=false; //
var setup=display;          //   
//////////////////////////////////

var mode = 1;

var mouseWasClicked=false;
var background_color=[255];
var distance;var x;var y;var speed=4;
var Xspeed=speed; var Yspeed=speed -1;
var game_score=0; var time=1;
var GameOver=true;var go=0;
var said_gameOver=false;var o=false;
var pick_image;
//var bg_speed = 1;
//var bg = 255;
//var prfix = "game_assets/";
var img=[
"game_assets/",
"milon","kamal","leo",
"mike","panos","radek",
"ray","wazir"];
var sfx=[];
var draw=staff_game;
function preload(){
   sfx[0]=loadSound(img[0]+"click.mp3")
   sfx[9]=loadSound(img[0]+"new_game.mp3")
   sfx[10]=loadSound(img[0]+"start_game.mp3")

   for(i=1;i<img.length;i++)
     {sfx[i]=loadSound(img[0]+img[i]+".mp3");
      img[i]=loadImage(img[0]+img[i]+".png");}
/**
  sfx[0] = loadSound("game_assets/milon.mp3");
  sfx[1] = loadSound("game_assets/kamal.mp3");
  sfx[2] = loadSound("game_assets/leo.mp3");
  sfx[3] = loadSound("game_assets/mike.mp3");
  sfx[4] = loadSound("game_assets/panos.mp3");
  sfx[5] = loadSound("game_assets/radek.mp3");
  sfx[6] = loadSound("game_assets/ray.mp3");
  sfx[7] = loadSound("game_assets/wazir.mp3");
**/
  //for( i = 0 ; i < img.length ; i++){}
/**
  img[0] = loadImage("game_assets/milon.png");
  img[1] = loadImage("game_assets/kamal.png");
  img[2] = loadImage("game_assets/leo.png");
  img[3] = loadImage("game_assets/mike.png");
  img[4] = loadImage("game_assets/panos.png");
  img[5] = loadImage("game_assets/radek.png");
  img[6] = loadImage("game_assets/ray.png");
  img[7] = loadImage("game_assets/wazir.png");
**/
}
function display(){
  createCanvas(window.innerWidth,window.innerHeight); 
  sfx[10].play();
}
function staff_game(){
if(!staff_game_setup){
  x=width/2;
  y=height/2
  imageMode(CENTER);rectMode(CENTER);noStroke();
  pick_image=Math.floor(random(1,img.length));
  //mode_slider = createSlider(1,3,2);
  //mode_slider.position(width/2-67,height-150);
////////////////////////////////
  staff_game_setup=true;  //
////////////////////////////////
//console.log(staff_game_setup);
}
background(background_color);
//ellipse(width/2,height-135,150,150);
//bg-=bg_speed
//console.log(bg);
if(GameOver&&time>0){

   
/////////////GAME MODE//////////
  ellipse(width/2 -200,height,50,50);
   ellipse(width/2,height -100,50,50);
   ellipse(width/2 +200,height -100,50,50);
   
   if( mode === 1 ){ 
      speed = 1;
   }else if( mode === 2 ){ 
      speed = 4 ; 
   } else if ( mode === 3 ){
      speed = 6 ; 
   }
   
   /////////////GAME MODE//////////
   
 if(frameCount%40===0){ fill(random(200),random(200),random(200)); }
   textSize(80);textStyle(BOLD);
   text("Orlando's Staff Game!",width/2-430,height/2-50);
   textSize(23); push();
   fill(0);
   text("PUSH SPACEBAR TO START NEW GAME",width/2-230,height/2+50);
   pop();}
if(!GameOver){
//console.log(speed);
//mode_slider.position(10,-100);
//rect(x,y,130,190)
    if(!GameOver){
      //ellipse(x,y, 190,190);
      image(img[pick_image],x,y,130,190);
     }
if(mouseX>0&&mouseY>0&&dist(width/2,height-135,mouseX,mouseY)>75)
{ fill(255,0,0);ellipse(mouseX+3,mouseY+5,30,30);}
    x+=Xspeed;
    y+=Yspeed;
   if(x>width-50||x<50){ 
     Xspeed*=-1;newStaff();
    //pick_image = Math.floor(random(1,img.length));
     //speed = Math.floor(random(20,60));
     //console.log(speed);
    //console.log(pick_image);
    //sfx[pick_image].play();
   }
   if(y>height-90||y<90){
     Yspeed*=-1;newStaff();
     //pick_image=Math.floor(random(1,img.length));
     //console.log(pick_image);
     //sfx[pick_image].play();
     //speed=null;
   }
    distance=dist(mouseX,mouseY, x,y);
    if (distance<0) { 
      fill(255,0,0,100);
    }else{
     fill(0,100);} push();
 fill(0);
 textSize(30);
 text("Score : "+game_score,10,30);
 text("Time : "+time,width-130,30);pop();
 if(!GameOver&&frameCount%60==0){time--}
 }
  if(time<1){GameOver=true;
   background_color=[255] 
   fill(0);
   textSize(200);
   text(game_score,width/2-90,height/2-100);
   textSize(60);
   text("GAME OVER !",width/2-200,height/2);
   textSize(23);
   text("PUSH SPACEBAR TO START NEW GAME",width/2-230,height/2+50);
     if(!said_gameOver){
     //console.log(said_gameOver);
     sfx[9].play();
     said_gameOver=true;
     //console.log(said_gameOver);
     }
   }
}

//sfx[9].play();

function newStaff(){
  pick_image=Math.floor(random(1,img.length));
 if(pick_image==1){
    sfx[pick_image].setVolume(2.0);
  }else{
    sfx[pick_image].setVolume(3.0);
  }
  if(pick_image==5){
    sfx[pick_image].setVolume(9.0);
  }
  if(pick_image==2){
    sfx[pick_image].setVolume(0.0);
  }
  //else{sfx[pick_image].setVolume(5.0);}
  sfx[pick_image].play();
}
function keyPressed(){
    //if(key = null;){;game_score = 0; GameOver=false; time=20;}
  if(key==" " && GameOver){
    game_score = 0; GameOver=false; time=20;
    x = width/2;
    y = height/2
    said_gameOver=false;
    o=false;
  }
}
function mousePressed(){
   
   
  if ( ellipse1 < 25 ) {
    console.log( "ellipse1" );
}else if ( ellipse2 < 25 ) {
   console.log( "ellipse2" );
 }else if ( ellipse3 < 25 ) {
   console.log( "ellipse3" );
}
   
var ellipse1 = dist(width/2 -200,height,mouseX,mouseY);


var ellipse2 = dist(width/2,height -100,mouseX,mouseY);


var ellipse3 = dist(width/2 +200,height -100,mouseX,mouseY);
  


   //var mode = mode_slider.value()
   //if(mode == 3){speed=50;}

   //console.log(width/2);



/**   if(x>width/2+1||x<width/2-1&&said_gameOver<2){sfx[9].setVolume(0.5);
   sfx[9].play();said_gameOver++; o=true;
   console.log(said_gameOver);
   }
**/
    //if(said_gameOver>1){said_gameOver=1;console.log(said_gameOver);}

  if(dist(width/2,height-135,mouseX,mouseY)>75){
  background_color=[random(200,250),random(200,250),random(200,250)];
    if(GameOver){keyPressed(1);}
  if (distance<90){game_score++;
  //tint(img[pick_image],0);
  }else{
    if(distance>90){
      //sfx[9].play();
      GameOver=true;time=0 
    }     
    //background_color = [255]
  }
   if(!mouseWasClicked){mouseWasClicked=true;}
   else
   if(mouseWasClicked){mouseWasClicked=false;}
  }
}
function windowResized(){
resizeCanvas(window.innerWidth,window.innerHeight);
}
