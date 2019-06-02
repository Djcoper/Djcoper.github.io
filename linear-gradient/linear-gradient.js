function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB); strokeWeight(5); background(0);
}
function draw() {
	background(255);
	// grid(); //
	morph();
	spin();
}

let count = 0,
range = 500,
dir = 1;
function spin() {
	if (frameCount % 1 === 0 ) {
		count += dir;
	}
	if (count > range*2 || count < -range/2) {
		dir *=-1;
	}
}
function morph() {
	translate(width/2, height/2);
	let hue = map(mouseY, 0,height, -20,310);
	let rotation = 0;
	rotation += map(count, 0,width, -0.1,0.1);
	//rotation += map(mouseY, -height,height, -0.2,0.2);
	for (let y = -height/2; y < 10; y+= 2.5) {
		hue += 0.5; rotate(rotation);
		stroke(hue,100,100)
		line (-width/2,y, width/2,y);
		push()
		strokeWeight(10);
		point(-width/2,y, 10);
		point(width/2,y, 10);
		//fill(20)
		point(0,25);
		pop();
	}
	text("Rotation : "+rotation, 0,10);
}

function grid() {
	stroke(50);
	scl = 90;
	for (let x = -3; x < width; x+= scl) {
		for (let y = -3; y < height; y+=scl) {
			line(0,y,width,y);
			line(x,0,x,height);
		}
	}
}

function windowResized () {
	resizeCanvas(
		windowWidth,
		windowHeight
	);
}
