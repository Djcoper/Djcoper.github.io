const
	devMode = false,
	bees = [],
	wowimg = [],
	wow = [],
	oopsImg = [];
	playTime = 20;

let
	hscore = 0,
	score = 0,
	time = playTime,
	gameover = false,
	buzzing = false;


function preload () {

	for (let i = 1; i < 9; i++) {
		wowimg [i] = loadImage("assets/wow/"+i+".png");
	}

	for (let i = 1; i < 7; i++) {
		oopsImg [i] = loadImage("assets/oops/"+i+".png");
	}

	buzz = loadSound("assets/BEE-sfx.mp3");
	slap = loadSound("assets/Slap-sfx.mp3");
	wowsfx = loadSound("assets/wow-sfx.mp3");
	boosfx = loadSound("assets/tun-sfx.mp3");

	beeImg = loadImage("assets/Queen_Bee.png");
	bg = loadImage("assets/bg.jpg");
	sqs = loadImage("assets/sq.png");
	hand = loadImage("assets/hand.png");
	worker = loadImage("assets/oie.png");

	// for (let i = 1; i < 9; i++) {
	// 	wow[i] = loadImage("assets/wow/"+i+".png");
	// }
}
function setup () {
	createCanvas(window.innerWidth, window.innerHeight);
	textSize(23); noStroke(); //buzz.loop();
	imageMode(CENTER);
	// bees.push (
	// 	new Bee (
	// 		width/2,50
	// 	)
	// );

	slap.setVolume(0.8);
	wowsfx.setVolume(2);
	boosfx.setVolume(3);
}
function mousePressed () {
	//wow.push(new WOW (mouseX,mouseY) );

	dis = dist(
		width/2 -20,
		height-170,
		mouseX,mouseY
	);
	if((gameover) && (dis < 100)){
		score = 0; time = playTime;
		textSize(23);
		gameover = false;
		buzzing = false;
	}
}

// let x = window.innerWidth/2/2;
// let y = 100;
// let xdir = 3;
// let ydir = 5;

function draw () {
	image(bg, width/2,height/2, -width, -height);

	//console.log(bees.length);

	//image( oopsImg[6],100,100,100,100 );

	if(!gameover){
		if (!buzzing) {
			buzzing = true;
			buzz.loop();
		}

		for(let i = 0 ; i < bees.length; i ++){
			bees[i].Render();

			if (devMode) {
			line (bees[i].x,bees[i].y,mouseX,mouseY);
			}
			if ((devMode) && (bees[i].queen)) {
				stroke(255,0,0)
				line (bees[i].x,bees[i].y,mouseX,mouseY);
			}
			if ((devMode) && (bees[i].worker)) {
				stroke(0,0,255)
				line (bees[i].x,bees[i].y,mouseX,mouseY);
			}

			if(dist(bees[i].x,bees[i].y,mouseX,mouseY) < 45) {
				bees[i].speed = 0;
				bees[i].fall = random(8,15);
				if(!bees[i].hit){
					if ((!bees[i].worker) && (!bees[i].queen)){
						slap.play();
					}
					score ++;
				}
				if((!bees[i].hit) && (bees[i].queen)){
					//if (!wowsfx._playing) {
						wowsfx.play();
					//}
					score += 10;
					wow.push(new WOW (mouseX,mouseY));
				}
				if((!bees[i].hit) && (bees[i].worker)){
					//slap.play();
				//if (!boosfx._playing) {
					boosfx.play();
				//}
					score -= 5;
					wow.push(new WOW (mouseX,mouseY,1));
				}
				bees[i].hit = true;
			}
			if( bees[i].x < -100 || bees[i].y > height*2){
				bees . splice ( i , 1 );
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
		image(hand,mouseX,mouseY,60,60);
		// if ((x>width)||(x<0)) {xdir*=-1;};
		// if ((y>height)||(y<0)) {ydir*=-1;};
		// if (frameCount%100===0) {
		// 	xdir*=-1;
		// };
	}
	if(time < 1){
		gameover=true;
	}
	if(gameover){
		buzz.stop();
		if(hscore < score){
			hscore = score;
		}
		textSize(55);
		stroke(140,100);
		fill(248, 254, 114);
		text("HIGH SCORE : " + hscore, width/2 - 195,height/2 -80);
		fill(255);
		text("GAME OVER !", width/2-165,height/2 -10);
		text("SCORE : " + score, width/2 -134,height/2+60);
		fill(255,180);
		textSize(35);
		rect(width/2-117, height-240,220,90);
		fill(100);
		//ellipse(width/2 -20,height-170,100);
		text("NEW GAME ", width/2 -100,height/2+149);
	}
	if(score < 1 ) { score = 0; }
	renderWOW();
}

function renderWOW() {
	for (var i = 1; i < wow.length; i++) {
		wow[i].Render();
		if ((wow[i].done) && (wow[i].size < 1)) {
			wow.splice(i,1);
		}
	}
}

function WOW(x,y,n) {
	this.wow = Math.floor(random(1,wowimg.length));
	this.oops = Math.floor(random(1,oopsImg.length));
	this.size = 0;
	this.maxSize = 200;

	this.x = x; //random(20,width-30);
	this.y = y; //random(40,height-40);

	this.done = false;

	//this.rot = random(-0.5,0.5);

	this.Render = function () {
		if ((!this.done) && (this.size < this.maxSize)) {
			this.size += 10;
		}
		if (this.size === this.maxSize) {
			this.done = true;
		}

		if (this.done) {
			this.size -= 6;
		}

		//ellipse(this.x,this.y,10);

		// rect(
		// 	this.x,
		// 	this.y,
		// 	this.size,this.size
		// );
		//push();
		//rotate(this.rot);

		if (n === 1) {
			image(
				oopsImg[this.oops],
				this.x,
				this.y,
				this.size * 2,this.size
			);
		} else {
			image(
				wowimg[this.wow],
				this.x,
				this.y,
				this.size * 2,this.size
			);
		}
		//pop();

	}
}

function Bee (x, y) {
  this.queen = false;
  this.worker = false;
  this.hit = false;
	this.x = x;
	this.y = y;
	this.size = 50;
	this.speed = random(7,16);
	this.fall = 0;
	this.up = random(5);
	this.dir = Math.floor(random(30,160));

	if (this.queen) {
		this.dir = Math.floor(random(20,80));
		this.up = 10;//random(5);
	 }

	this.Pickqueen = random(100);
	this.pickWorker = random(1);

	this.Render = function() {
		if( this.Pickqueen < 20 ) {
			this.queen = true;
		}
		if((this.queen) && (this.pickWorker) < 0.5) {
			this.queen = false;
			this.worker = true;
		}
	// if(this.queen) {
	//   tint(255,0,0);
	// } else {
	//   noTint()
	// }
		if(this.queen){ this.size = 100 ; }
		if(this.worker){ this.size = 60 ; }
		this.Update();

		if (devMode) {
			strokeWeight(this.size);
			point(this.x,this.y,this.size);
		}

		if(this.hit) {
			//if (this.queen) {}
			image(
				sqs,
				this.x,
				this.y += random(-2,2),
				this.size,this.size+=0.5
			);
		} else { if (this.worker) {
			image(
				worker,
				this.x - beeImg.width/2/2,
				this.y -= random(-2,2),
				this.size,this.size
			);
		} else {
			image(
				beeImg,
				this.x - beeImg.width/2/2,
				this.y -= random(-2,2),
				this.size,this.size
			);
		}
			stroke(255,120);
			strokeWeight(10);
			line(this.x-35,this.y,this.x+random(-35,20),this.y-22);
			line(this.x-35,this.y,this.x+random(-35,20),this.y-22);
			// push();
			// rotate(random(0.40,0.44));
			// fill(0,20,25,80);
			// ellipse(this.x -9, this.y-115, 10,40);
			// pop();
		}
		// if ((this.hit) && (this.queen)) {
		// 	this.wows();
		// }
	}
	this.Update = function () {
		if(this.queen) {
			this.x -= this.speed * 2.6;
		} else if (this.worker) {
			this.x -= this.speed * 0.5;
		} else {
			this.x -= this.speed;
		}
		this.y += this.fall;
		this.y += this.up;
		if(frameCount%this.dir===0){
			this.up*=-1;
		}
	}

	// this.wow = Math.floor(random(1,wow.length));
	// this.wowx = random(width);
	// this.wowy = random(height);
	//
	// this.wows = function () {
	// 	image(wow[this.wow],this.wowx,this.wowy,150,100);
	// }
}
function windowResized () {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight
	);
}
