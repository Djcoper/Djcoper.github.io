function Drop (x,y) {
	this.x = x; this.y = y;
	this.gravity = 1;
	this.velocity = 0;
	this.size = random(8,30);

	this.wind;
	this.render = function () {
		line(this.x,this.y, this.x+this.wind, this.y+this.size);
	}
	this.animate = function () {

		this.wind = map(mouseX, 0,width, -10,10) *1.8;

		this.x += this.wind *0.5;

		this.velocity += this.gravity;
		this.velocity *= 0.5
		this.y += this.velocity + this.size * map(mouseY, 0,height, 1, 1.1);
	}
}
