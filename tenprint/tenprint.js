const area = 30; colR = [74, 154, 239];
function setup () {
	createCanvas (window.innerWidth, window.innerHeight);
	stroke (255); strokeWeight (10); background (colR);
}
let x = 0; y = 0;
function draw () {
	if (frameCount % 60 === 0) {
		colR = [random(255),random(255),random(255)];
		background(colR); y = 0;
	}
	while (y < height) {
		if (random (1) < .5 ) {
			line (x, y, x + area, y + area);
		} else {
			line (x + area, y, x, y+area);
		}
		if (x > width) {
			x =- area; y += area;
		}
		x += area;
	}
}
