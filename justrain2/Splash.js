function Splash (x,y,size) {
	this.x = x; this.y = y;
	this.speed = random(1,3);
	this.grow = 0;
	this.maxGrow = size/2;//random(10,25);
	this.render = function () {
		line(this.x -this.grow,this.y, this.x+this.grow, this.y);
		this.grow+= this.speed;
		if (this.grow > this.maxGrow) {
			this.speed *=-1;
		}
	}
}
