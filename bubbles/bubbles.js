const
	bubbles = [];
//col = [0,100,100];
// let
//vol;

function preload() {
	bubble = loadImage("bubble.png");
	bg = loadImage("ws_Classique_-_Wooden_Floor_1920x1200.jpg");
	shower_sfx = loadSound("shower_sfx.mp3");
	Pop_sfx = loadSound("Pop-sfx.mp3");

}

function setup () {
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	imageMode(CENTER);
	//colorMode(HSB);
	//fill(255); //noStroke();
	//mic = new p5.AudioIn();
	//mic.start();
	shower_sfx.loop();
	shower_sfx.rate(5);
	Pop_sfx.rate(1.2);
}
function draw () {

	if ((!shower_sfx._playing) && (frameCount % 20 === 0)) {
		shower_sfx.loop();
	}

	image(bg, width/2, height/2, width, height);
	//background(38, 50, 56);
	//hsl background(220,19,18);
	for (let index = bubbles.length-1; index >= 0; index--) {
		bubbles[index].Render();
		if (
			(bubbles[index].y < -100)
			||
			(bubbles[index].y > height + 300)
			||
			(bubbles[index].x < 0)
			||
			(bubbles[index].x > width)
			||
			(bubbles[index].size < 10)
		)
		{
			bubbles.splice(index,1);
		}
	}
	if (mouseIsPressed) {
		shower_sfx.stop();
		//col[0] ++;
		for (let index = 0; index < 2; index++) {
			if (!Pop_sfx._playing) {
				for (let index = 0; index < 2; index++) {
					Pop_sfx.play();
				}
			}
			bubbles.push ( new Bubble (mouseX, mouseY) );
		}
	}
	if (!mouseIsPressed) {
		for (let index = 0; index < 5; index++) {
			bubbles.push ( new Bubble (width/2, -50, 1));
		}
		for (let index = 0; index < 10; index++) {
			//bubbles.push ( new Bubble (width/2, height/2));
			bubbles.push ( new Bubble (random(100,width-100), height +50));
		}
	}
	// vol = mic.getLevel();
	// if (vol > 0.001) {
	// 	//col[0] ++;
	// 	for (let index = 0; index < 13; index++) {
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
	ys = window.innerHeight/2 -300
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
