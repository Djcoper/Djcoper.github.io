const
	padding = 0;
	drops=[],
	splashes=[],
	thunder = [];
	lightning = [];

let flash = false;
function preload () {
	bg = loadImage("assets/home.png");
	overlay = loadImage("assets/overlay2c.png");

	for (let i = 0; i < 4; i++) {
		lightning [i] = loadImage("assets/lightning/lightning"+i+".png");
	}
	
	//load sounds
	lightRain = loadSound("assets/lightRain.mp3");
	//medRain = loadSound("assets/medRain.mp3");
	heaviestRain2 = loadSound("assets/heaviestRain2.mp3");
	thunder[0] = loadSound("assets/thunderOne.mp3");
	thunder[1] = loadSound("assets/thunderTwo.mp3");
	thunder[2] = loadSound("assets/thunderThree.mp3");
	thunder[3] = loadSound("assets/thunderFour.mp3");
}
function setup(){
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	mouseY = height/3;
	strokeWeight(2.7);
	lightRain.loop();
	//medRain.loop();
	heaviestRain2.loop();
}
function draw(){
	backdrop();
	infoText ();
	lightRain.setVolume(map(mouseY, 0,height, 0.5,0));
	//medRain.setVolume(map(mouseY, 0,height/2, 0,0.7));
	heaviestRain2.setVolume(map(mouseY, 0,height, 0,1));

	if (mouseY > height/2) {
		makeThunder();
	}

	if (mouseY > height - 100 && !thunder[0]._playing) {
		thunder[0].play();
	}

	if (mouseY < height/2) {
		for (var i = 0; i < thunder.length; i++) {
			thunder[i].stop();
		}
	}

	let amount = map(mouseY, 0,height, 10,500);
	if (drops.length < amount) {
		for (var i = 0; i < amount; i++) {
			drops.push(new Drop (random(-width/2,width*1.5), random(-height)));
		}
	}

	for (var i = drops.length-1; i >= 0; i--) {
		drops[i].animate();
		if (drops[i].y > padding -100  && drops[i].x > padding && drops[i].x < width -padding) {
			drops[i].render();
		}
		if (drops[i].y > height+70 - random(300)) {
			splashes.push(new Splash(drops[i].x,drops[i].y, drops[i].size));
			drops.splice(i,1);
		}
	}
	for (var i = splashes.length-1; i >= 0; i--) {
		if (splashes[i].x > padding && splashes[i].x < width - padding) {
			splashes[i].render();
		}
		if (splashes[i].grow < 0) {
			splashes.splice(i,1);
		}
	}
}
function windowResized(){
	resizeCanvas(
		window.innerWidth,
		window.innerHeight
	);
}
