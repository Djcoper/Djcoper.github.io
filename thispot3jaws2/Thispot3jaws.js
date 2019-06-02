const
	spots = [];
	bubbles = [];
let
	score = 0,
	gameOver = false,
	showSplash = false,
	Popfx = false;

function preload() {
	tingSfx = loadSound(
		"assets/chomp-sfx.mp3"
	);
	dundunSfx = loadSound(
		"assets/dundundun-sfx.mp3"
	);

	JawsTheme = loadSound(
		"assets/Jaws - Theme song 192kbps.mp3"
	);

	waterSfx = loadSound("assets/water-sfx.mp3");
	PopSfx = loadSound("assets/Pop-sfx.mp3");

	backdrop = loadImage("assets/bgb.png");
	shark = loadImage("assets/shark.gif");
	seal = loadImage("assets/harbor_seal_PNG2.png");
	bubble = loadImage("assets/bubble.png");
	avatar = loadImage("assets/avatar.png");
}

function setup () {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	imageMode(CENTER);
	rectMode(CENTER);
	mouseX = -100;
	textSize(25);strokeWeight(10);noStroke();
	//for (let i = 0; i < 100; i++) {
	spots.push(
		new Spot(
			random(20, width - 30),
			random(150, height - 70)
		)
	);
	spots[0].color = [255,150];
	// [
	// 	105.62598645027492,
	// 	164.727419350489,
	// 	238.82163258230457
	// ];
	//};
	JawsTheme.loop();
	waterSfx.loop();
	waterSfx.setVolume(5);
	dundunSfx.setVolume(1.4);
	tingSfx.setVolume(1.2);
	PopSfx.setVolume(60);
	//JawsTheme.setVolume(1);
};
let
	offset = 145,
	frames = 0;
function Splash () {
	if (showSplash) {
		background(0, 200);
		push();
		textSize(height/1.1);
		//offset = 145;
		if (score > 9) {
			offset = 320;
		};
		// if (score < 1) {
		// 	offset = 145;
		// };
		text(score, width/2 - offset, height/2 + 210);
		pop();
	};
	frames += 0.5;
	if (frames % 30 === 0) {
		showSplash = false;
	};
};
function mousePressed () {
	if (
		// (!dundunSfx._playing)
		// &&
		(gameOver)
		&&
		(dist(
			width/2,
			height - 22,
			mouseX,mouseY
		) < 100
		)
	) {
		gameOver = false;
		textSize(25);
		score = 0;
		offset = 145;
		spots.splice(0);
		spots.push(
			new Spot(
				random(20, width - 30),
				random(150, height - 70)
			)
		);
		spots[0].color = [
			105.62598645027492,
			164.727419350489,
			238.82163258230457
		];
		dundunSfx.stop();
		JawsTheme.loop();
	};
	if (!showSplash) {
		for (let i = spots.length - 1; i >= 0; i --) {
			// for (let j = spots.length - 1; j >= 0; j --) {
			// 	if (dist(spots[i].x, spots[i].y, spots[j].x, spots[j].y) < spots[i].radius) {};
			// };
			//spots[i].Render();
			if (
				dist(spots[i].x, spots[i].y, mouseX, mouseY) < spots[i].radius) {
				if (!spots[i].newSpot) {
					gameOver = true;

				JawsTheme.stop();
				if (!dundunSfx._playing) {
					dundunSfx.play();
				};
					spots[i].hit = false;
					//spots[spots.length - 1].color = [255, 0, 0];
					spots[spots.length - 1].stroke = [0, 250, 0];
					spots[spots.length - 1].text = 2;
					spots[i].text = 1;
					//text("Not this.", 110, 110);
					// text(
					// 	"Not this.",
					// 	spots[spots.length - 1].x,
					// 	spots[spots.length - 1].y -
					// 	spots[spots.length - 1].radius * 1.5
					//);
					spots[i].color = [150, 0, 0];
					//score = 0;
					//spots.splice(0);
					//spots.push(new Spot());
					//spots.splice(spots.length - 1);
				};
				if (
					(!gameOver)
					&&
					(spots[i].newSpot)
					) {
					spots[i].newSpot = false;
					score ++; point; tingSfx.play();
					showSplash = true;
					spots.push(new Spot());
					pickSpot();
				};//spots.splice(i, 1);
			};
		};
	};

	for (let i = bubbles.length-1; i >= 0; i--) {
		dis = dist(bubbles[i].x,bubbles[i].y,mouseX,mouseY);
		if (
			(bubbles[i].showAvatar < 0.1)
			&&
			(dis < bubbles[i].size/2)
			) {
			bubbles[i].egg = true;
		}
		if (
		(bubbles[i].egg)
		&&
		(bubbles[i].size > height/1.8 -1)
		)
		{
			bubbles.splice(i,1);
			Popfx = false;
		}
	}

};
function pickSpot () {
	for (let i = spots.length - 2; i >= 0; i --) {
		dis = dist(
			spots[i].x, spots[i].y,
			spots[spots.length - 1].x,
			spots[spots.length - 1].y
		);
		if (dis < spots[spots.length - 1].radius*2.5) {
			spots[spots.length - 1].x = random(20, width - 30);
			spots[spots.length - 1].y = random(100, height - 70);
			pickSpot();
		};
	};
};

// function grad (r, g, b) {
// 	col = [r, g, b];
// 	for (let i = 0; i < height; i++) {
// 		col[2] += 0.5;
// 		col[1] - = 0.5;
// 		col[0] - = 0.3;
// 		push();
// 		stroke(col);
// 		line(0, i, width, i);
// 		pop();
// 	};
// };
function draw () {
// push();
// 	stroke(255,200);
// 	strokeWeight(1);
// 	for (let x = 0; x < width; x += 100) {
// 		line(x,0,x,height);
// 		for (let y = 0; y < height; y += 100) {
// 			line(0,y,width,y);
// 		}
// 	}
// 	pop();

	image(backdrop, width/2, height/2, width, height);

	push();
	textSize(height/1.1);
	fill(240,20);
	text(score, width/2 - offset, height/2 + 210);
	pop();
	for (let i = spots.length - 1; i >= 0; i --) {
		spots[i].Render();
		if (spots[spots.length - 1].size === spots[i].radius * 2) {
			noloop = true;
		}
			// if (dist(spots[i].x, spots[i].y, mouseX, mouseY) < spots[i].radius) {
			// 	spots.push(new Spot());
			//   //spots.splice(i, 1);
			// };
	};

	// for (var i = 1; i < spots.length; i++) {
	// 	if (spots.length > 1) {
	// 		//console.log(spots[i-1].x);
	// 		push();
	// 		stroke(spots[i].color);
	// 		line(
	// 			spots[i].x,spots[i].y,
	// 			spots[i-1].x, spots[i-1].y
	// 		);
	// 		pop();
	// 	}
	// }
	//console.log(dis)
	text("SCORE : " + score, 10, 30);
	Splash();
	if (gameOver) {
		//push()
		textSize(30);
		text("Game Over!", width/2 - 80, 60);
		text(
			"Press here To maybe",
			width/2 - 142, height - 43);
			text(
				"Start A New Game.",
				width/2 - 125, height - 12
			);
		// text(
		// 	"Press Anywhere To Start New Game.",
		// 	width/2 - 250, height - 30);
		//pop();
	};
	if (score < 1) {
		push();
		textSize(19);
		text(
			"Game Rules:",
			10, 60
		);
		text(
			"Eat the seal to gain a point.",
			10, 90
		);
		text(
			"Never eat the same seal twice.",
			10, 120
		);
		pop();
	};
	// ellipse(width/2,
	// height - 22, 100);
	image(shark, mouseX += random(- spots[0].jitter, spots[0].jitter), mouseY += random(- spots[0].jitter, spots[0].jitter), 100,50);
	Bubbles();
	background(0,0,100,95);

	if(mouseIsPressed){
		bubbles.push(new Bubble(mouseX,mouseY));
	}

	if (frameCount % 10 === 0) {
		obj = Math.floor(random(spots.length))
		bubbles.push(new Bubble(spots[obj].x, spots[obj].y));
	}
};
function Spot (x, y) {
	this.newSpot = true;
	this.text = 0;
	this.color = [
		random(185, 255),
		random(185, 255),
		random(185, 255)
	];
	this.stroke = [0, 0];
	if ((x != undefined) && (y != undefined)) {
		this.x = x;
		this.y = y;
	} else {
		this.x = random(20, width - 30);
		this.y = random(100, height - 70);
	};
	this.radius = random(35, 60);
	this.size = 0;
	this.jitter = 0.5;

	this.Render = function () {
		// if (this.size < this.radius * 2) {
		// 	this.size += random(1, 3);
		// };
		stroke(this.stroke);
		fill(this.color);
		//push();
		//tint(this.color);
		//ellipse(this.x, this.y, this.size, this.size/3);
		image(seal, this.x += random(- this.jitter, this.jitter), this.y += random(- this.jitter, this.jitter), this.radius, this.radius/3);
		//rect(this.x += random(- this.jitter, this.jitter), this.y += random(- this.jitter, this.jitter), this.radius, this.radius/3);
		//pop();
		//ellipse(this.x, this.y, this.radius * 2);
		//ellipse(this.x += random(- this.jitter, this.jitter), this.y += random(- this.jitter, this.jitter), this.radius * 2);
		//ellipse(this.x += random(- 0.2, 0.2), this.y += random(- 0.2, 0.2), this.size);
		//text(n, this.x, this.y,);
		this.me();
	};

	this.notMe = ["Not This one ...","Already Ate Me..","Lol Not ME.."];
	this.pickNotMe = Math.floor(random(this.notMe.length));

	this.WasMe = ["This one ...","I Got Away ...", "Here I Am" ];
	this.pickWasMe = Math.floor(random(this.WasMe.length));

	this.me = function () {
		push(); noStroke();
		textSize(24);
		if (this.text === 1) {
				text(
					this.notMe[this.pickNotMe],
					this.x - 50,
					this.y - this.radius * 1.1
				);
		} else if (this.text === 2) {
			text(
				this.WasMe[this.pickWasMe],
				this.x - 50,
				this.y - this.radius * 1.1
			);
		};
		pop();
	};
};

function Bubbles () {
	if (bubbles.length < Math.floor(width * 0.1 )) {
		bubbles.push(new Bubble);
	}

	//console.log("bl "+bubbles.length);
	//console.log("w* "+ Math.floor(width*0.1));
	//console.log("w "+width);

	for (let i = bubbles.length-1; i >= 0; i--) {
		bubbles[i].Render();
		// if (
		// 	(bubbles.length > Math.floor(width*0.1))
		// 	&&
		// 	(bubbles[i].y > height)
		// ) {
		// 	bubbles.splice(i,1);
		// }

		if (bubbles[i].y < bubbles[i].pop) {
			bubbles.splice(i,1);
		}
	}
	//bubbles.push(new Bubble);
}

function Bubble(x,y) {
	this.egg = false;

	this.size = random(10,25);
	if (
		(x === undefined)
		||
		(y === undefined)
	) {
		this.x = random(width);
		this.y = random(height, height*1.5);
	} else {
		this.x = x;
		this.y = y;
	}


	this.up = random(0.3,3.9);
	this.pop = random(-100,200);
	this.jitter = random(-10,10);

	this.showAvatar = random(1);

	if (this.showAvatar < 0.1) {
		this.size = random(35,45);
	}

	this.Render = function () {
		if (
		(this.showAvatar < 0.1)
		// &&
		// (this.size > 20)
		){
			image(avatar, this.x,this.y, this.size *0.7 ,this.size *0.7);
		}
		if (this.size < height/1.8 -1){
			image(bubble, this.x += this.jitter*0.2,this.y, this.size += random(-this.jitter,this.jitter)*0.1,this.size += random(-0.3,0.3));
		}
		this.y -= this.up;
		// if (this.y < this.pop) {
		// 	this.y = random(height, height*1.5);
		// }
		if (this.egg) {
			this.x = width/2;
			this.y = height/2;
			if (this.size < height/1.8) {
				this.size += 3;
			}
			if (this.size > height/1.8) {
				this.size -= 3;
			}
			if (this.size > height/1.8 -1) {
				text("Thispot3 Jaws Edition.", this.x-120, this.y - this.size/2.5);
				text("By Orlando Rodrigues.", this.x-120, this.y + this.size/2.3);
			}
			if (this.size > height/1.8 -2) {
				if(!Popfx){
					PopSfx.play();
					Popfx = true;
				}
			}
		}
	}
}

function windowResized () {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight
	);
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].x = random(width);
	};
};
