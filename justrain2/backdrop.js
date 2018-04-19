function backdrop () {
  if (mouseY < height - 2) {
      image(bg,0,0, width, height);
  }

  bgAlpha = map(mouseY, 0,height, 80,255);

  if (bgAlpha > 75) {
    pos = map(mouseY, 0,height, 0,500);
    push();
    tint(255,bgAlpha);
    image(overlay,0, -pos +0, width, height +pos);
    //image(overlay, 0, -pos/1.5, width, height + pos *5);
    pop();
  }
}
