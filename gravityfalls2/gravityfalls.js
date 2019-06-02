const
	points = [],
	spawnPerFrame = 3,
	mouseSize = 50;

let
	globalHue = 0;

function Point(x, y) {
	this.lastPos = new p5.Vector(x, y);
	this.pos = new p5.Vector(x, y);
	this.vel = new p5.Vector(0, 0);
	this.acc = new p5.Vector(0, 0);
	this.size = random(2, 20);
	this.h = globalHue;
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360);
	noStroke();
	mouseX = width/2;
	mouseY = height/2;
}


function draw() {
	//alpha = map(mouseY, 0,height, 0,360);
	alpha = map(mouseY, height,0, 60,360);

	background(map(mouseY, 0,height, 0,360),60,360, alpha);
	// fill(0, 5);
	//rect(0, 0, width, height);

	for (var i = 0; i < spawnPerFrame; i++) {
		points.push(new Point(random(width), 0));
	}

	for (var i = points.length-1; i > -1; i--) {
		points[i].acc.add(new p5.Vector(0, points[i].size*0.01));

		// Quick check to avoid calculating distance if possible.
		if (abs(points[i].pos.x-mouseX) < mouseSize) {
			d = dist(mouseX, mouseY, points[i].pos.x, points[i].pos.y);
			if (d < mouseSize) {
				var vec = new p5.Vector(mouseX, mouseY-mouseSize);
				vec.sub(new p5.Vector(points[i].pos.x, points[i].pos.y));
				vec.normalize();
				points[i].vel.add(vec);

				points[i].h += 1.5;
				if (points[i].h > 360) {
					points[i].h = 0;
				}
			}
		}

		points[i].vel.add(points[i].acc);
		points[i].pos.add(points[i].vel);
		points[i].acc.mult(0);

		stroke(points[i].h, 360, 360);
		strokeWeight(points[i].size);
		line(points[i].lastPos.x, points[i].lastPos.y,
			points[i].pos.x, points[i].pos.y);

			points[i].lastPos.set(points[i].pos.x, points[i].pos.y);

			if (points[i].pos.y > height || points[i].pos.x < 0 || points[i].pos.x > width) {
				points.splice(i, 1);
			}
	}

	globalHue += 0.15;
	if (globalHue > 360) {
		globalHue = 0;
	}
}
