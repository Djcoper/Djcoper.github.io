function makeThunder () {
	if (frameCount % 450 === 0) {
		thunder[Math.floor(random(thunder.length))].play();
	}
	//thunder[0]._playing
	if (flash&&thunder[0]._playing && mouseY > height -100) {
		//if (frameCount % 1 === 0) {
			//image(lightning[Math.floor(random(lightning.length))],random(width/6),0, width - random(200),height - random(400));
			image(lightning[Math.floor(random(lightning.length))], random(width),0 ,width/3, height -random(50,200));
			background(random(105),150);
		//}
	}
	if (frameCount % 100 === 0) {
		if (flash) {
			flash = false;
		} else if (!flash) {
			flash = true;
		}
	}
	if (frameCount % 60 === 0) {flash = false;}

  if (mouseY > height - 100 && !thunder[0]._playing) {
    thunder[0].play();
  }

  if (mouseY < height/2) {
    for (var i = 0; i < thunder.length; i++) {
      thunder[i].stop();
    }
  }
}
