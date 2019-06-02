const
	devMode = false,
	playTime = 20,
	bees = [],
	wow = [],
	wowimg = [],
	oopsImg = []
;
let
	gameover = false,
	buzzing = false,
	time = playTime,
	hscore = 0,
	score = 0
;
function preload(){
	buzz = loadSound(
		"assets/BEE-sfx.mp3"
	);
	slap = loadSound(
		"assets/Slap-sfx.mp3"
	);
	for(let index = 1; index < 9; index++){
		wowimg [index] = loadImage(
			"assets/wow/"+index+".png"
		);
	};
	for(let index = 1; index < 7; index++){
		oopsImg [index] = loadImage(
			"assets/oops/"+index+".png"
		);
	};
	bee = loadImage("assets/Queen_Bee.png");
	backdrop = loadImage("assets/bg.jpg");
	splatter = loadImage("assets/sq.png");
	hand = loadImage("assets/hand.png");
	honey_Bee = loadImage("assets/oie.png");
	// for(let index = 1;index < 9;index++){
	// 	wow[index] = loadImage("assets/wow/"+index+".png");
	// };
};
function setup(){
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	textSize(23); noStroke(); //buzz.loop();
	imageMode(CENTER);
	// bees.push(
	// 	new Bee(
	// 		width/2,50
	// 	)
	//);
};
function keyPressed(){
	if(gameover){
		mouseX = width/2 -20;
		mouseY = height-170;
		mousePressed();
	};
};
function mousePressed(){
	//wow.push(new WOW(mouseX,mouseY));
	dis = dist(
		width/2 -20,
		height-170,
		mouseX,mouseY
	);
	if((gameover)&&(dis < 100)){
		score = 0; time = playTime;
		textSize(23);
		gameover = false;
		buzzing = false;
	};
};
function draw(){
	image(backdrop,width/2,height/2,-width,-height);
	//console.log(bees.length);
	//image(oopsImg[6],100,100,100,100);
	if(!gameover){
		if(!buzzing){
			buzzing = true;
			buzz.loop();
		};
		for(let index = 0; index < bees.length; index++){
			bees[index].Render();
			if(devMode){
				line(bees[index].x,bees[index].y,mouseX,mouseY);
			};
			if((devMode)&&(bees[index].queen)){
				stroke(255,0,0)
				line(bees[index].x,bees[index].y,mouseX,mouseY);
			};
			if((devMode)&&(bees[index].honey_Bee)){
				stroke(255,197,0);//(0,0,255)
				line(bees[index].x,bees[index].y,mouseX,mouseY);
			};
			if(dist(bees[index].x,bees[index].y,mouseX,mouseY) < 45){
				bees[index].speed = 0;
				bees[index].fall = random(8,15);
				if(!bees[index].hit){
					slap.play();
					score++;
				};
				if((!bees[index].hit)&&(bees[index].queen)){
					slap.play();
					score += 15;
					wow.push(new WOW(mouseX,mouseY));
				};
				if((!bees[index].hit)&&(bees[index].honey_Bee)){
					slap.play();
					score -= 5;
					wow.push(new WOW(mouseX,mouseY,1));
				};
				bees[index].hit = true;
			};
			if(bees[index].x < - 100 || bees[index].y > height*2){
				bees.splice(index,1);
			};
		};
		if(frameCount % 10 === 0){
			bees.push(
				new Bee(
					random(width,width*2),
					random(height)
				)
			);
		};
		fill(255);
		text("S C O R E : "+score,10,30);
		text("T I M E : "+time,width-130,30);
		if(frameCount%60 === 0){
			time--;
		};
		image(hand,mouseX,mouseY,60,60);
	};
	if(time < 1){
		gameover = true;
	};
	if(gameover){
		buzz.stop();
		if(hscore < score){
			hscore = score;
		};
		textSize(55);
		stroke(140,100);
		fill(248,254,114);
		text("HIGH SCORE : "+hscore,width/2 - 195,height/2 -80);
		fill(255);
		text("GAME OVER!",width/2-165,height/2 -10);
		text("SCORE : "+score,width/2 -134,height/2+60);
		fill(255,180);
		textSize(35);
		rect(width/2-117,height-240,220,90);
		fill(100);
		//ellipse(width/2 -20,height-170,100);
		text("NEW GAME ",width/2 -100,height/2+149);
	};
	if(score < 1){ score = 0; };
	renderWOW();
};
function renderWOW(){
	for(var index = 1; index < wow.length; index++){
		wow[index].Render();
		if((wow[index].done)&&(wow[index].size < 1)){
			wow.splice(index,1);
		};
	};
};
function WOW(x,y,n){
	this.wow = Math.floor(random(1,wowimg.length));
	this.oops = Math.floor(random(1,oopsImg.length));
	this.size = 0;
	this.maxSize = 150;
	this.x = x; //random(20,width-30);
	this.y = y; //random(40,height-40);
	this.done = false;
	//this.rot = random(-0.5,0.5);
	this.Render = function(){
		if((!this.done)&&(this.size < this.maxSize)){
			this.size += 10;
		};
		if((this.size) === (this.maxSize)){
			this.done = true;
		};
		if(this.done){
			this.size -= 6;
		};
		//ellipse(this.x,this.y,10);
		// rect(
		// 	this.x,
		// 	this.y,
		// 	this.size,this.size
		//);
		//push();
		//rotate(this.rot);
		if(n === 1){
			image(
				oopsImg[this.oops],
				this.x,
				this.y,
				this.size * 2,this.size
			);
		}else{
			image(
				wowimg[this.wow],
				this.x,
				this.y,
				this.size * 2,this.size
			);
		};
		//pop();
	};
};
function Bee(x,y){
 this.queen = false;
 this.honey_Bee = false;
 this.hit = false;
	this.x = x;
	this.y = y;
	this.size = 50;
	this.speed = random(7,16);//4;//
	this.fall = 0;
	this.up = random(5);
	this.dir = Math.floor(random(30,180));
	// if(this.queen){
	// 	this.dir = Math.floor(random(40,180));
	// };
	this.Pickqueen = random(100);
	this.pickhoney_Bee = random(1);

	this.Render = function(){
		if(this.Pickqueen < 20){
			this.queen = true;
		};
		if((this.queen)&&(this.pickhoney_Bee < 0.7)){
			this.queen = false;
			this.honey_Bee = true;
		};
	// if(this.queen){
	//  tint(255,0,0);
	// }else{
	//  noTint()
	// };
		if(this.queen){ this.size = 100 ; };
		this.Update();
		if(devMode){
			strokeWeight(this.size);
			point(this.x,this.y,this.size);
		};
		if(this.hit){
			//if(this.queen){};
			image(
				splatter,
				this.x,
				this.y += random(-2,2),
				this.size,this.size+= 0.5
			);
		}else{if(this.honey_Bee){
			image(
				honey_Bee,
				this.x - bee.width/2/2,
				this.y -= random(-2,2),
				this.size,this.size
			);
		}else{
			image(
				bee,
				this.x - bee.width/2/2,
				this.y -= random(-2,2),
				this.size,this.size
			);
		};
			stroke(255,120);
			strokeWeight(10);
			line(this.x-35,this.y,this.x+random(-35,20),this.y-22);
			line(this.x-35,this.y,this.x+random(-35,20),this.y-22);
			// push();
			// rotate(random(0.40,0.44));
			// fill(0,20,25,80);
			// ellipse(this.x -9,this.y-115,10,40);
			// pop();
		};
		// if((this.hit)&&(this.queen)){
		// 	this.wows();
		// };
	};
	this.Update = function(){
		if(this.queen){
			this.x -= this.speed * 3.2;
		} else if(this.honey_Bee){
			this.x -= this.speed * 0.5;
		}else{
			this.x -= this.speed;
		};
		this.y += this.fall;
		this.y += this.up;
		if(frameCount%this.dir === 0){
			this.up *=- 1;
		};
	};
	// this.wow = Math.floor(random(1,wow.length));
	// this.wowx = random(width);
	// this.wowy = random(height);
	//
	// this.wows = function(){
	// 	image(wow[this.wow],this.wowx,this.wowy,150,100);
	// };
};
function windowResized(){
	resizeCanvas(
		window.innerWidth,
		window.innerHeight
	);
};
