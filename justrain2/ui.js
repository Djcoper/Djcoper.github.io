function infoText () {
  alpha = map(mouseY, 0,height/2, 155,0);
  if (alpha > 1) {
    fill(255,alpha)
    noStroke();
    textSize(150);
    text("JUST", width/2 - 189,height/2 - 140);
    text("RAIN", width/2 - 189,height/2);
    textSize(19);
    text('Inspired by Playstore app "Just Rain" by Robysoft Apps.',width/2 -245, height/2 + 50);
    text("Copyright (c) 2017 Copyright Orlando Rodrigues All Rights Reserved." ,width/2 -290, height/2 + 90);
    stroke(255,150);
  }
}
