const streams = [];

window.oncontextmenu = function () {
  return false;
}

function windowResized() {
  streams.splice(0);
  setup();
}

function setup() {
  createCanvas(innerWidth,innerHeight);
  textFont ("Arial Unicode MS", 15);
  textAlign (CENTER, TOP); 
  for (let x = 15; x < width; x += 30) {
   streams.push (new Stream (x));
  }
}
function draw() {
  background (0);
  for (stream of streams) {
   stream.update ();
  }
  infoText(width/2,height/2-20);
}
infoText =(x,y)=> {
   push();
   // textSize(90);
   // text("M a t r i x  R a i n",width/2,height/2-60);
   textSize(width/16);
   stroke(0,255,0);
   text("M a t r i x  R a i n",x,y-60);
   pop();
   push();
   //textSize(30);
   //text("Copyright (c) 2018 Copyright Orlando Rodrigues All Rights Reserved.",width/2,height/2+50);   
   textSize(width/40);
   stroke(0,145,0);
   text("Copyright (c) 2018 Copyright Orlando Rodrigues All Rights Reserved.",x,y+50);
   pop();
}
class Char {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.Px = x;
    this.py = y;
    
    this.getRandomChar ();
  }
  render () {
    if( (this.y > -1) && (this.y < height))
      text (this.char, this.x, this.y);
   
   // if((mouseIsPressed)&&dist(mouseX,mouseY,this.x, this.y)<150){
   //   if(this.x > mouseX) this.x+=.5;
   //   if(this.x < mouseX) this.x-=.5;
   //   // if(this.y > mouseY) this.y+=.5;
   //   // if(this.y < mouseY) this.y-=.5;
   // }
  }
  // getRandomChar () {
  //   this.char = String.fromCodePoint(0x30A0+round(random(95)));
  // }
  getRandomChar () {
   this.charType =  random (1);
   if (this.charType > .6) {
    this.rndChar = round (random (48, 90));
    this.char = char (this.rndChar);
  }else if (this.charType < .9) {
    this.rndChar = round (random (12449, 12615));
    this.char = char (this.rndChar);
   }
  }
}
class Stream {
  constructor (x) {
    this.chars = [];
    this.numChar = round (random (30, 40));
    this.speed = round (random (2,10));
    this.offset = 0;//round (random (-15, 15));
    this.yOffset = round (random (-height/2, height/2));
    for (let y = this.yOffset; y < this.yOffset+this.numChar*25; y+=25) {
     this.chars.push (new Char (x + this.offset, y));
    }
  }
  update () {
    for (let i = 0; i < this.chars.length; i++) {
     this.alpha = map (i, 0, this.chars.length-1, 0, 455);
     fill (100, 255, 20, this.alpha);
     if ( (this.numChar > 20) && (i == this.chars.length-1)) fill (240, 255, 240);
     this.chars[i].render ();
     //move cHARS //
     if (frameCount % this.speed == 0) {
      this.chars[i].y += 25;
      //chars stays in place if 0 new char
      if (i == this.chars.length-1) {
       this.chars[i].getRandomChar ();
      } else {
       this.chars[i].char = this.chars[i+1].char;
      }
     }
     if (random (1)< 0.003) {
      this.chars[i].getRandomChar ();
     }
    }
    if (this.chars[0].y > height) {
      for (let i = 0; i < this.chars.length; i++) {
        this.chars[i].y = ( (this.chars.length-1)-i)*-25;
      }
    }
  }
}