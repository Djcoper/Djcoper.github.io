const
	spots = [];
let
	score = 0,
	gameOver = false,
	showSplash = false;
function setup () {
	createCanvas(
		window.innerWidth,  window.innerHeight
	);
	tingSfx = loadSound("assets/ting-sfx.mp3");
	dundunSfx = loadSound("assets/dundundun-sfx.mp3");
	textSize(25);strokeWeight(10);noStroke();
	//for (let i = 0; i < 100; i++) {
	spots.push(new Spot(random(50, width - 50), random(150, height - 50)));
	//};
};
let
	offset = 145,
	frames = 0;
function Score () {
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
		(!dundunSfx._playing)
		&&
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
				random(50, width - 50),
				random(150, height - 50)
			)
		);
	};
	if (!showSplash) {
		for (let i = spots.length - 1; i >= 0; i --) {
			// for (let j = spots.length - 1; j >= 0; j --) {
			// 	if (dist(spots[i].x,  spots[i].y,  spots[j].x,  spots[j].y) < spots[i].radius) {};
			// };
			//spots[i].Render();
			if (dist(spots[i].x,  spots[i].y,  mouseX,  mouseY) < spots[i].radius) {
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
					// 	spots[spots.length - 1].y  -
					// 	spots[spots.length - 1].radius * 1.5
					//);
					spots[i].color = [150, 0, 0];
					//score = 0;
					//spots.splice(0);
					//spots.push(new Spot());
					//spots.splice(spots.length - 1);
				};
				if (spots[i].newSpot) {
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
	for (let i = spots.length -  2; i >= 0; i --) {
		dis = dist(
			spots[i].x,  spots[i].y,
			spots[spots.length - 1].x,
			spots[spots.length - 1].y
		);
		if (dis < spots[spots.length - 1].radius*2.5) {
			spots[spots.length - 1].x = random(100, width - 100);
			spots[spots.length - 1].y = random(100, height - 100);
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
			// if (dist(spots[i].x,  spots[i].y,  mouseX,  mouseY) < spots[i].radius) {
			// 	spots.push(new Spot());
			//     //spots.splice(i, 1);
			// };
	};
	//console.log(dis)
	text("SCORE : " + score,  10, 30);
	Score();
	if (gameOver) {
		//push()
		textSize(30);
		text("Game Over!",  width/2 - 80, 60);
		text(
			"Press here To maybe",
			width/2 - 130, height - 50);
			text(
				"Start A New Game.",
				width/2 - 125, height - 22
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
			"Press the spots to gain a point.",
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
		random(100, 255),
		random(100, 255),
		random(100, 255)
	];
	this.stroke = [0, 0];
	if ((x != undefined) && (y != undefined)) {
		this.x = x;
		this.y = y;
	} else {
		this.x = random(50, width - 50);
		this.y = random(50, height - 50);
	};
	this.radius = random(15, 35);
	this.size = 0;

	this.Render = function () {
		if (this.size < this.radius * 2) {
			this.size += random(1, 3);
		};
		stroke(this.stroke);
		fill(this.color);
		//ellipse(this.x, this.y, this.radius * 2);
		ellipse(this.x += random(- 0.2, 0.2), this.y += random(- 0.2, 0.2), this.radius * 2);
		//ellipse(this.x += random(- 0.2, 0.2), this.y += random(- 0.2, 0.2), this.size);
		//text(n, this.x,  this.y,);
		this.me();
	};
	this.me = function () {
		push(); noStroke();
		if (this.text === 1) {
				text(
					"Not This...",
					this.x -  50,
					this.y -  this.radius * 1.5
				);
		} else if (this.text === 2) {
			text(
				"This One...",
				this.x -  50,
				this.y -  this.radius * 1.7
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
