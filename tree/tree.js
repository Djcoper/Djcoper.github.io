let
	col,
	y = window.innerHeight/2 -200;
	ydir = 0.5;

	mousey = true;

function setup() {
	createCanvas(windowWidth, windowHeight);
	col = [
			random(255),
			random(255),
			random(255)
	];
}

function mouseMoved() {
	mousey = false;
}

function draw () {
	background(255,80);
	//ellipse(width/2,y,10);
	y += ydir;
	if (frameCount % 450 === 0) {
		ydir *=-1;
	}
	if (mousey) {
		mouseY = y;
	}

	if (frameCount % 300 === 0) {
		mousey = true;
	}

	translate(width/2,height);
	trunk(210);
	col[0] = map(mouseY, 0,height, 0,255);
	col[1] = map(mouseX, 0,height, 0,235);
	col[2] = map(mouseY, height,0, 0,255);
	stroke(col);
}

let
	grow = 0;
function trunk(len) {
	if(len > 5) {
	push();
	if (grow < len) {
		grow++;
	}
	if (grow > len) {
		grow -= 0.001;
	}
	line(0,0,0,0-grow);
	pop();

	translate(0,-len);
	if (len > 5) {
		angle = map(mouseY, 0,height, 0,1);

		//ellipse(0,0,10);
		push();
		rotate(angle);
		grow = 50;
		trunk(len*0.6);
		pop();
		push();
		rotate(-angle);
		trunk(len*0.6);
		grow = 50;
		pop();
	}
}
}
function windowResized() {
	resizeCanvas(
		window.innerWidth,
		window.innerHeight
	);
}
