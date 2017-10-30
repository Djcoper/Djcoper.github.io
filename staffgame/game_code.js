//////////////////////////////////
varstaff_game_setup = false;//
varsetup = display;//
//////////////////////////////////

varmode = 1;

varmouseWasClicked = false;
varbackground_color = [255];
vardistance;varx;vary;varspeed = 4;
varXspeed = speed;varYspeed = speed-1;
vargame_score = 0;vartime = 1;
varGameOver = true;vargo = 0;
varsaid_gameOver = false;varo = false;
varpick_image;
//varbg_speed = 1;
//varbg = 255;
//varprfix = "game_assets/";

vardraw = staff_game;

varimg = [
"game_assets/",
"milon","kamal","leo",
"mike","panos","radek",
"ray","wazir",
];
varsfx = [];
functionpreload() {
	sfx[0] = loadSound(img[0]+"click.mp3")
	sfx[9] = loadSound(img[0]+"new_game.mp3")
	sfx[10] = loadSound(img[0]+"start_game.mp3")

	for(leti = 1;i<img.length;i++) {
		sfx[i] = loadSound(img[0]+img[i]+".mp3");
		img[i] = loadImage(img[0]+img[i]+".png");
	}
}
functiondisplay() {
	createCanvas(window.innerWidth,window.innerHeight);
	sfx[10].play();
}
functionstaff_game() {
if (!staff_game_setup) {
	x = width/2;
	y = height/2
	imageMode(CENTER);rectMode(CENTER);noStroke();
	pick_image = Math.floor(random(1,img.length));
	//mode_slider = createSlider(1,3,2);
	//mode_slider.position(width/2-67,height-150);
////////////////////////////////
	staff_game_setup = true;//
////////////////////////////////
//console.log(staff_game_setup);
}
background(background_color);
//ellipse(width/2,height-135,150,150);
//bg- = bg_speed
//console.log(bg);
if (GameOver&&time>0) {

/////////////GAMEMODE//////////
	ellipse(width/2-200,height-100,50,50);
	ellipse(width/2,height-100,50,50);
	ellipse(width/2+200,height-100,50,50);

	if (mode =  =  = 1) {
		speed = 1;
}elseif (mode =  =  = 2) {
speed = 4;
}elseif (mode =  =  = 3) {
speed = 6;
}

/////////////GAMEMODE//////////

if (frameCount%40 =  =  = 0) {fill(random(200),random(200),random(200));}
textSize(80);textStyle(BOLD);
text("Orlando'sStaffGame!",width/2-430,height/2-50);
textSize(23);push();
fill(0);
text("PUSHSPACEBARTOSTARTNEWGAME",width/2-230,height/2+50);
pop();}
if (!GameOver) {
//console.log(speed);
//mode_slider.position(10,-100);
//rect(x,y,130,190)
if (!GameOver) {
//ellipse(x,y,190,190);
image(img[pick_image],x,y,130,190);
}
if (mouseX>0&&mouseY>0&&dist(width/2,height-135,mouseX,mouseY)>75)
{fill(255,0,0);ellipse(mouseX+3,mouseY+5,30,30);}
x += Xspeed;
y += Yspeed;
if (x>width-50||x<50) {
Xspeed* = -1;newStaff();
//pick_image = Math.floor(random(1,img.length));
//speed = Math.floor(random(20,60));
//console.log(speed);
//console.log(pick_image);
//sfx[pick_image].play();
}
if (y>height-90||y<90) {
Yspeed* = -1;newStaff();
//pick_image = Math.floor(random(1,img.length));
//console.log(pick_image);
//sfx[pick_image].play();
//speed = null;
}
distance = dist(mouseX,mouseY,x,y);
if (distance<0) {
fill(255,0,0,100);
}else{
fill(0,100);}push();
fill(0);
textSize(30);
text("Score:"+game_score,10,30);
text("Time:"+time,width-130,30);pop();
if (!GameOver&&frameCount%60 =  = 0) {time--}
}
if (time<1) {GameOver = true;
background_color = [255]
fill(0);
textSize(200);
text(game_score,width/2-90,height/2-100);
textSize(60);
text("GAMEOVER!",width/2-200,height/2);
textSize(23);
text("PUSHSPACEBARTOSTARTNEWGAME",width/2-230,height/2+50);
if (!said_gameOver) {
//console.log(said_gameOver);
sfx[9].play();
said_gameOver = true;
//console.log(said_gameOver);
}
}
}

//sfx[9].play();

functionnewStaff() {
	pick_image = Math.floor(random(1,img.length));
	if (pick_image =  = 1) {
		sfx[pick_image].setVolume(2.0);
	}else{
		sfx[pick_image].setVolume(3.0);
	}
	if (pick_image =  = 5) {
		sfx[pick_image].setVolume(9.0);
	}
	if (pick_image =  = 2) {
		sfx[pick_image].setVolume(0.0);
	}
	//else{sfx[pick_image].setVolume(5.0);}
	sfx[pick_image].play();
}



functionkeyPressed() {
	//if (key = null;) {;game_score = 0;GameOver = false;time = 20;}
	if (key =  = ""&&GameOver) {
		game_score = 0;GameOver = false;time = 20;
		x = width/2;
		y = height/2
		said_gameOver = false;
		o = false;
	}
}

functionmousePressed() {

	var ellipse1 = dist(width/2-200,height-100,mouseX,mouseY);
	var ellipse2 = dist(width/2,height-100,mouseX,mouseY);
	var ellipse3 = dist(width/2+200,height-100,mouseX,mouseY);

	if (ellipse1<25) {
		console.log("Button1waspressed");
	}else if (ellipse2<25) {
		console.log("Button2waspressed");
	}else if (ellipse3<25) {
		console.log("Button3waspressed");
	}

	//varmode = mode_slider.value()
	//if (mode =  = 3) {speed = 50;}

	//console.log(width/2);
	/**if (x>width/2+1||x<width/2-1&&said_gameOver<2) {sfx[9].setVolume(0.5);
	sfx[9].play();said_gameOver++;o = true;
	console.log(said_gameOver);
	}
	**/
	//if (said_gameOver>1) {said_gameOver = 1;console.log(said_gameOver);}

	if (dist(width/2,height-135,mouseX,mouseY)>75) {
		background_color = [random(200,250),random(200,250),random(200,250)];
		if (GameOver) {keyPressed(1);}
		if (distance<90) {game_score++;
			//tint(img[pick_image],0);
		}else{
			if (distance>90) {
				//sfx[9].play();
				GameOver = true;time = 0
			}
	 //background_color = [255]
	}

	if (!mouseWasClicked) {mouseWasClicked = true;}
	else
	if (mouseWasClicked) {mouseWasClicked = false;}
	}
}

functionwindowResized() {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight
	);
}
