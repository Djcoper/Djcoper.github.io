function setup() {
	createCanvas(windowWidth, windowHeight);
	translate(width/2,height);
	trunk(200);
}
function trunk(len) {
	line(0,0,0,0-len);

	translate(0,-len);
	if (len > 5) {
		push();
		rotate(0.4);
		trunk(len*0.6);
		pop();
		push();
		rotate(-0.4);
		trunk(len*0.6);
		pop();
	}
}
