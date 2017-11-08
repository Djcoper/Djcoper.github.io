function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB); strokeWeight(5);
}
let dir = 1;
let range = 500;
let count = 0;
function draw() {
	if (frameCount % 1 === 0 ) {
		count += dir;
		morph();
	}
	if (count > range*2 || count < -range/2) {
		dir *=-1;
	}
}
function morph() {
	translate(width/2, height/2);
	let hue = map(mouseY, 0,height, -30,310);
	let rotation = 0;
	rotation += map(count, 0,width, -0.1,0.1);
	//rotation += map(mouseY, -height,height, -0.2,0.2);
	//background(255);
	for (let y = -height/2; y < 10; y+= 2.5) {
		hue += 0.5; rotate(rotation);
		stroke(hue,100,100);
		line (-width/2,y, width/2,y);
		push()
		strokeWeight(10);
		//point(-width/2,y, 10);
		//point(width/2,y, 10);
		//stroke(hue,100,100);
		fill(hue,100,100)
		//point(0,25);
		pop();
	}
	//text("Rotation : "+rotation, 0,10);
}
function windowResized () {
	resizeCanvas(
		windowWidth,
		windowHeight
	);
}
