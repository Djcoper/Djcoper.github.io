const
	spots = [];
let
	score = 0,
	gameOver = false,
	showSplash = false;
function setup () {
	tingSfx = loadSound(
		"assets/ting-sfx.mp3"
	);
	dundunSfx = loadSound(
		"assets/dundundun-sfx.mp3"
	);
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	textSize(25);strokeWeight(10);noStroke();
	//for (let i = 0; i < 100; i++) {
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
	//};
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
	background(255);
	push();
	textSize(height/1.1);
	fill(240);
	text(score, width/2 - offset, height/2 + 210);
	pop();
	for (let i = spots.length - 1; i >= 0; i --) {
		spots[i].Render();
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
			"Press the spot to gain a point.",
			10, 90
		);
		text(
			"Never press the same spot twice.",
			10, 120
		);
		pop();
	};
	// ellipse(width/2,
	// height - 22, 100);
};
function Spot (x, y) {
	this.newSpot = true;
	this.text = 0;
	this.color = [
		random(85, 255),
		random(85, 255),
		random(85, 255)
	];
	this.stroke = [0, 0];
	if ((x != undefined) && (y != undefined)) {
		this.x = x;
		this.y = y;
	} else {
		this.x = random(20, width - 30);
		this.y = random(100, height - 70);
	};
	this.radius = random(15, 35);
	this.size = 0;
	this.jitter = 0.3;

	this.Render = function () {
		if (this.size < this.radius * 2) {
			this.size += random(1, 3);
		};
		stroke(this.stroke);
		fill(this.color);
		//ellipse(this.x, this.y, this.radius * 2);
		ellipse(this.x += random(- this.jitter, this.jitter), this.y += random(- this.jitter, this.jitter), this.radius * 2);
		//ellipse(this.x += random(- 0.2, 0.2), this.y += random(- 0.2, 0.2), this.size);
		//text(n, this.x, this.y,);
		this.me();
	};
	this.me = function () {
		push(); noStroke();
		if (this.text === 1) {
				text(
					"Not This...",
					this.x - 50,
					this.y - this.radius * 1.5
				);
		} else if (this.text === 2) {
			text(
				"This One...",
				this.x - 60,
				this.y - this.radius * 1.7
			);
		};
		pop();
	};
};
function windowResized () {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight
	);
};
