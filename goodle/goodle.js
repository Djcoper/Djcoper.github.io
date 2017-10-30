let colour, drips = [50]; frames = 0;
function setup  () {
	createCanvas (window.innerWidth,window.innerHeight);
	for (let i = 1;i < drips[0];i++) {
		drips[i] = new Drip;
	}
	colour = drips[drips.length-1].colour[
		Math.floor (random (
			drips[drips.length-1].colour.length)
		)
	];textSize (80);
}
function draw  () {
	background (255,0.5);
	for (let i = 1;i < drips.length;i++) {
		drips[i].Render ();
	}
	if (frames%60 == 0) {
		colour = drips[1].colour[
			Math.floor (
				random (drips[drips.length-1].colour.length)
			)
		];
	}
	if (mouseIsPressed) {background (255,50);}
	//colour = Math.floor (random (drips[1].colour));
	stroke (250,45);strokeWeight (30);fill (colour);
	text ("G o o g l e  D o o d l e ?",width/2-410,height/2-50);
	frames++;
}
function Drip  () {
	this.x = random (width);
	this.y = random (height);
	this.speed = random (3,6);
	//this.alpha = 50;
	this.colour = [
		[244,194,13,this.alpha],
		[219,50,54,this.alpha],
		[72,133,237,this.alpha],
		[60,186,84,this.alpha]
	]
	this.pickColour = Math.floor (random (this.colour.length));
	this.wander = random (2.5,2.5);
	this.size = 25;
	this.Render = function  () {
		this.alpha = map(mouseY, 0,height, 30,255);
		this.colour = [
			[244,194,13,this.alpha],
			[219,50,54,this.alpha],
			[72,133,237,this.alpha],
			[60,186,84,this.alpha]
		]
		//this.wander = random (1.5,2.5);
		strokeWeight (random (this.size,this.size+5))
		fill (this.colour[this.pickColour]);
		point (this.x += random (-this.wander,this.wander),this.y += this.speed);
		if (this.y > height) {
			this.y = 0
			//if ( random (1) < 0.05 ) {this.x = random (width);};
		}
		if ((this.x < 0) || (this.x > width)) {
			this.x = random (width);
		}
	}
}

function windowResized () {
	resizeCanvas (window.innerWidth,window.innerHeight);
	background (255);
	for (let i = 1;i < drips.length;i++) {
		drips[i].x = random (width);
	}
}
