STARS = [ 2000 ];
function setup() {
	createCanvas( window.innerWidth, window.innerHeight );
	for( let i = 1 ; i < STARS[0]; i ++ ) {
		STARS[i] = new Star_Constructor;
	} noStroke();	fill( 255 );
	if( mouseX < 1 ){ mouseX = width /2; mouseY = height /2; }
}

function draw() {
	if(!started){startScreen();}
//////////Main loop////////////
	//if(started){
	background( 0 , 100 );
	translate( width / 2 , height / 2 );
	for( let i = 1 ; i < STARS.length; i ++ ) {
		STARS[i].Render();
	}
}//}//////////Main loop////////////

function Star_Constructor() {
	this.x = random( - width * 2 , width * 2 );
	this.y = random( - height * 3, height + height * 3 );
	this.range = width * 3;
	this.z = random ( this.range );
	this.maxSize = random(2,8);

	//this.starColor = [ random( 100, 200 ) ,random( 100, 200 ) ,random( 100, 200 ) ];
	//fill( this.starColor );

	this.Render = function() { this.update();
		rect( this.xVelocity, this.yVelocity, this.size,this.size)
	}

	this.update = function() {
		this.size = map( this.z , this.range, 0 , 0 , this.maxSize );
		this.xVelocity = map(
			( this.x / this.z ) , 0 , 1 , 0 , width
		);
		this.yVelocity = map(
			( this.y / this.z ) , 0 , 1 , 0 , height
		);
		if( this.z < 1 ) {
			this.z = this.range;
			this.x = random( - width * 2 , width * 2 );
			//random ( - this.range , this.range );//
			this.y = random( - height * 3, height + height * 3 );
			//random ( - this.range , this.range );//
		}

		this.Velocity = 5;
		if( mouseIsPressed ) { this.Velocity *= 4; }

		this.z = this.z - random( this.Velocity , this.Velocity * 3 );
		this.scale = 550;
		this.xVelocity += map( mouseX, 0 , width , this.scale, -this.scale );
		this.yVelocity += map( mouseY, 0 , height , this.scale, -this.scale );
	}
}

/////////////StartScreen/////////////////////
started = false;
countdown = 1;
function startScreen(){

	//if(!bg_sfx_playing){bg_sfx_playing  =  true;
		//sfx[song].loop();
		//}

  if(!started){
		background(0);
		// showStars();
		//fill(0);

//////////MAKE START SCREEN TEXT////////////////

/////////DISPLAY COUNTDOWN////////////////////
	textSize(200);
	let padding  =  110;
	if(countdown<10){ padding  =  40; }
	text(countdown,width/2-padding,height/2+65);
/////////DISPLAY COUNTDOWN////////////////////

///////////USAGE GUIDE TEXT//////////////
	textSize(30);msgX = width/2-270;msgY = 80;
	text("Move your mouse to look around,", msgX,msgY);
	text("Or just press mouse left click to go faster.", msgX,msgY+30);
///////////USAGE GUIDE TEXT//////////////

////////////////SUGGESTIONS TEXT/////////////////////
	textSize(19);
	text("All improvement suggestions appreciated.",
	width/2 -240,height -120);
	text("The Developer Can Be Contacted @ djcoper.github.io@gmail.com",
	width/2 -240,height -90);

/////////Copyright Notice TEXT///////////
	text("Starfield Copyright (c) 2017 ORLANDO P RODRIGUES.",
	width/2 -240,height -50);
/////////Copyright Notice TEXT///////////

	}/////////MAKE START SCREEN TEXT////////////////

	if(countdown>0&&frameCount%65 === 0){countdown--}
	if(countdown<1){ started = true; }
}
/////////////StartScreen/////////////////////

function windowResized() {
	WIDTH = window.innerWidth,
	HEIGHT = window.innerHeight,
	resizeCanvas(WIDTH, HEIGHT);
	for( let i = 1 ; i < STARS[0]; i ++ ) {
		STARS[i].z = random ( width * 3 );
		//STARS[i].x = random( - width * 2 , width * 2 );
		//STARS[i].y = random( - height * 3, height + height * 3 );
	}
	mouseX = width /2; mouseY = height /2;
}
