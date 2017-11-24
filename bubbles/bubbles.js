const
	bubbles = [];
//col = [0,100,100];
// let
//vol;
function setup () {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	imageMode(CENTER);
	bubble = loadImage("bubble.png");
	//colorMode(HSB);
	//fill(255); //noStroke();
	//mic = new p5.AudioIn();
	//mic.start();
}
function draw () {
	background(38, 50, 56);
	//hsl background(220,19,18);
	for (let i = bubbles.length-1; i >= 0; i--) {
		bubbles[i].Render();
		if (
			(bubbles[i].y < -100)
			||
			(bubbles[i].y > height + 300)
			||
			(bubbles[i].x < 0)
			||
			(bubbles[i].x > width)
			||
			(bubbles[i].size < 10)
		)
		{
			bubbles.splice(i,1);
		}
	}
	if (mouseIsPressed) {
		//col[0] ++;
		for (let i = 0; i < 2; i++) {
			bubbles.push ( new Bubble (mouseX, mouseY) );
		}
	}
	if (!mouseIsPressed) {
		for (let i = 0; i < 5; i++) {
			bubbles.push ( new Bubble (width/2, -50, 1));
		}
		for (let i = 0; i < 10; i++) {
			//bubbles.push ( new Bubble (width/2, height/2));
			bubbles.push ( new Bubble (random(100,width-100), height +50));
		}
	}
	// vol = mic.getLevel();
	// if (vol > 0.001) {
	// 	//col[0] ++;
	// 	for (let i = 0; i < 13; i++) {
	// 		//bubbles.push ( new Bubble (width/2, height/2));
	// 		bubbles.push ( new Bubble (random(100,width-100), height +300));
	// 	}
	// }
	// if (col[0] > 300) {
	// 	col[0] = 0;
	// }
	//console.log(vol);
	//console.log(bubbles.length);
}

// function mousePressed() {
// 	bubbles.push ( new Bubble (mouseX, mouseY) );
// }

let
	xs = window.innerWidth/2
	ys = window.innerHeight/2
function Bubble (x,y,d) {
	this.x = x,
	this.y = y,
	this.speed = random(1),
	this.xDir = random(-this.speed, this.speed)*3,
	this.yDir = random(-this.speed, this.speed),
	this.dir = random(-0.1,0.1)
	this.size = random(3,32),
	//this.col = col,
	this.Render = function () {
		//this.size -= 0.1;
		//fill(this.col);
		// ellipse(
		// 	this.x += this.xDir,
		// 	this.y += this.yDir - 4,
		// 	this.size
		// )
		image(
			bubble,
			this.x += this.xDir -= this.dir,
			this.y += this.yDir -= 0.1,
			this.size,this.size
		)
		if (d > 0) {
			this.y += this.yDir += 10;
		}
		if (!mouseIsPressed&&dist(this.x, this.y, xs,ys) < width*1.1) {
			this.yDir = 1;
			ys -= 0.002;
		}
		if (ys < -width*1.1) {
			ys = 173;
		}
		//ellipse(xs,ys,10)
	}
}
function windowResized() {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight
	);
	xs = window.innerWidth/2
}
