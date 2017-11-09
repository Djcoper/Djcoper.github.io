let bees = [];
let score = 0;
let time = 1;
let gameover = false;
function preload () {

	buzz = loadSound("assets/BEE-sfx.mp3");
	slap = loadSound("assets/Slap-sfx.mp3");

	beeImg = loadImage("assets/Queen_Bee.png");
	bg = loadImage("assets/bg.jpg");
	sq = loadImage("assets/sq.png");
	hand = loadImage("assets/hand.png");
}
function setup () {
	createCanvas(window.innerWidth, window.innerHeight);
	textSize(23); noStroke(); buzz.loop();
}
function mousePressed () {
	dis = dist(
		width/2 -20,
		height-170,
		mouseX,mouseY
	);
	if(gameover && dis < 100){
		score = 0; time = 20;
		textSize(23);
		gameover = false;
	}
}
function draw () {
	image(bg, 0,0 ,width,height);
	if(!gameover){
		for(let i = 0 ; i < bees.length; i ++){
			bees[i].Render();
			if( bees[i].x < -100 || bees[i] > height){
				bees . splice ( i , 1 );
			}
			if(dist(bees[i].x,bees[i].y,mouseX,mouseY) < 35 ) {
				bees[i].speed = 0;
				bees[i].fall = random(8,15);
				if(!bees[i].hit){
					slap.play();
					score ++;
				}
				bees[i].hit = true;
			}
		}
		if (frameCount % 10 === 0 ) {
			bees.push (
				new Bee (
					random(width, width*2),
					random(height)
				)
			);
		}
		fill(255);
		text( "SCORE : " + score, 10,30);
		text("TIME : " +time, width-100,30);
		if(frameCount%60===0){
			time--;
		}
		image(hand,mouseX-20,mouseY-30,60,60);
	}
	if(time < 1){
		gameover=true;
	}
	if(gameover){
		textSize(50);
		fill(255);
		text("GAME OVER", width/2 - 150,height/2);
		text("SCORE : " + score, width/2 -134,height/2+50);

		fill(255,180);
		textSize(35);
		rect(width/2 - 120,height-235,200,70);
		fill(100);

		//ellipse(width/2 -20,height-170,100);

		text("NEW GAME ", width/2 -111,height/2+149);

	}
}
function Bee (x, y) {
	this.hit = false;
	this.x = x;
	this.y = y;
	this.size = 50;
	this.speed = random(7,16);
	this.fall = 0;
	this.up = random(1,2);
	this.Render = function() {
		//ellipse(this.x, this.y, 10);
		this.Update();
		if(this.hit) {
			image(
				sq,
				this.x,
				this.y += random(-2,2),
				this.size,this.size+=0.5
			);
		} else {
			image(
				beeImg,
				this.x - beeImg.width/2/2,
				this.y -= random(-2,2),
				this.size,this.size
			);
		}
	}
	this.Update = function () {
		this.x -= this.speed;
		this.y += this.fall;
		this.y += this.up;
		if(frameCount%60===0){
			this.up*=-1;
		}
	}
}
function windowResized () {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight
	);
}
