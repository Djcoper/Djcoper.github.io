/**
 * MIT License
 *
 * Copyright (c) 2017 ORLANDO P RODRIGUES ( djcoper ).
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
**/

function generateTrigTable( resolution, method ) {

	var table = [];
	var increment = 360.0 / resolution;

	for(i = 0; i <= 360.0; i += increment) {
	  var index = Math.round(i / increment);
	  table[ index ] = method( i * (Math.PI / 180.0) );
	}

	return table;

};

requestAnimFrame = (function() {
return window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
window.setTimeout(callback, 1000/60);
};
})();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = 0;
var height = 0;

window.onresize = function onresize() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
}

window.onresize();

var mouse = {
	X : 0,
	Y : 0
}

window.onmousemove = function onmousemove(event) {
	mouse.X = event.clientX;
	mouse.Y = event.clientY;
}

var particles = [];
var drops = [];
var numbase = 5;
var numb = 2;
var updateCounter = 0;

var controls = {
	rain : 2,
	umbrella : true,
	umbrellaAlwaysShow : true,
	umbrellaH : 200,
	umbrellaS : 100,
	umbrellaL : 50,
	umbrellaZ : 4,
	umbrellaDepth : 11,
	lightning : true,
	lightningPower : 10,
	lightningFreq : 5,
	lightningR : 25,
	lightningG : 50,
	lightningB : 70,
	lightningDecay : 10,
	alpha : .5,
	color : 200,
	auto : false,
	opacity : 1,
	saturation : 100,
	lightness : 50,
	back : 100,
	red : 0,
	green : 0,
	blue : 0,
	multi : false,
	speed : 2,
	horizon : 0.61803398875,
	overflow : 1.0
};

var sineLUT = generateTrigTable(360, Math.sin);

function Rain(X, Y, num) {
	if (!num) {
		num = numb;
	}
	while (num--) {
		particles.push(
		{
			velocityX : (Math.random() * .33),
			velocityY : (Math.random() * Math.random() * 9) + 1,
			X : X,
			Y : Y,
			alpha : 1,
			colour : "hsla(" + controls.color + "," + controls.saturation + "%, " + controls.lightness + "%," + controls.opacity + ")",
		})
	}
}

function explosion(X, Y, colour, num, velocity) {
	if (!num) {
		num = numbase;
	}
	while (num--) {
		drops.push(
		{
			velocityX : (Math.random() * 4-2	),
			velocityY : ((velocity / 9) * Math.random() * -4 ),
			X : X,
			Y : Y,
			radius : 0.65 + Math.floor(Math.random() *1.6),
			alpha : velocity / 9,
			colour : colour
		})
	}
}

function made(ctx) {

	if (controls.multi == true) {
		controls.color = Math.random()*360;
	}

	ctx.save();
	ctx.fillStyle = 'rgba('+controls.red+','+controls.green+','+controls.blue+',' + controls.alpha + ')';
	ctx.fillRect(0, 0, width, height);

	var particlesCreate = particles;
	var dropsCreate = drops;
	var tau = Math.PI * 2;

	for (var i = 0, particlesactives; particlesactives = particlesCreate[i]; i++) {

		var dx = (particlesactives.X - mouse.X);
		var dy = (particlesactives.Y - mouse.Y)
		var umbrella = dx * dx + dy*dy;
		if(!controls.umbrella || umbrella > 20000 || dy > 50 || particlesactives.velocityY > controls.umbrellaZ){
			ctx.globalAlpha = particlesactives.alpha;
			ctx.fillStyle = particlesactives.colour;
			ctx.fillRect(particlesactives.X, particlesactives.Y, particlesactives.velocityY/4, particlesactives.velocityY);
		} else if (dy > 0 && dy < 50){
			ctx.globalAlpha = particlesactives.alpha - (1 - dy / 50);
			ctx.fillStyle = particlesactives.colour;
			ctx.fillRect(particlesactives.X, particlesactives.Y, particlesactives.velocityY/4, particlesactives.velocityY);
		}
	}

	for (var i = 0, dropsactives; dropsactives = dropsCreate[i]; i++) {

		ctx.globalAlpha = dropsactives.alpha;
		ctx.fillStyle = dropsactives.colour;

		ctx.beginPath();
		ctx.arc(dropsactives.X, dropsactives.Y, dropsactives.radius, 0, tau);
		ctx.fill();
	}
	ctx.globalAlpha = 1.0;
	ctx.strokeStyle = "white";
	ctx.lineWidth   = 2;

	if (controls.umbrella) {
		ctx.beginPath();
		ctx.arc(mouse.X, mouse.Y+10, 138, 1 * Math.PI, 2 * Math.PI, false);
		ctx.lineWidth = 3;
		var decayAvg = 0;
		if(controls.umbrellaAlwaysShow){
			decayAvg = 1.0;
		} else {
			if(controls.lightningR > 0){
				decayAvg += controls.red / controls.lightningR;
			}
			if(controls.lightningG > 0){
				decayAvg += controls.green / controls.lightningG;
			}
			if(controls.lightningR > 0){
				decayAvg += controls.blue / controls.lightningB;
			}
			decayAvg = decayAvg / 3;
		}

		ctx.strokeStyle = "hsla(" + controls.umbrellaH + "," + controls.umbrellaS + "%," + controls.umbrellaL + "%," + decayAvg + ")";
		ctx.moveTo(mouse.X, mouse.Y + 50);
		ctx.lineTo(mouse.X, mouse.Y + 100);
		ctx.arc(mouse.X + 25, mouse.Y+100, 25, 1 * Math.PI, 2 * Math.PI, true);
		ctx.stroke();
	}
	ctx.restore();

	if (controls.auto) {
		controls.color += controls.speed;
		if (controls.color >=360) {
			controls.color = 0;
		}
	}
}

var randomLimit = .75;
var lightning = .25;
function update() {

	if(controls.lightning){
		if(Math.random() > lightning){
			controls.red = controls.lightningR;
			controls.green = controls.lightningG;
			controls.blue = controls.lightningB;
		} else {
			if(controls.red > 0 || controls.green > 0 || controls.blue > 0){
				if(controls.red > 0){
					controls.red -= controls.lightningDecay / 10;
				}
				if (controls.red < 0) {
					controls.red = 0;
				}
				if(controls.green > 0){
					controls.green -= controls.lightningDecay / 10;
				}
				if (controls.green < 0) {
					controls.green = 0;
				}
				if(controls.blue > 0){
					controls.blue -= controls.lightningDecay / 10;
				}
				if (controls.blue < 0) {
					controls.blue = 0;
				}
				lightning = 1 - controls.lightningPower / 1000;
			} else {
				controls.red=0;
				controls.green=0;
				controls.blue=0;
				lightning = 1 - controls.lightningFreq / 10000;
			}
		}
	}

	var particlesCreate = particles;
	var dropsCreate = drops;

	for (var i = 0, particlesactives; particlesactives = particlesCreate[i]; i++) {
		particlesactives.X += particlesactives.velocityX;
		particlesactives.Y += particlesactives.velocityY + 7;
		if (particlesactives.Y > height-15 || (particlesactives.Y > ((height - 15)) * (controls.horizon + (controls.overflow / 100 * (1 - controls.horizon))*Math.pow(particlesactives.velocityY, 2))) || (Math.random() > 0.9995)) {
			particlesCreate.splice(i--, 1);
			explosion(particlesactives.X, particlesactives.Y, particlesactives.colour, null, particlesactives.velocityY);
		}
		if (controls.umbrella) {
			var dx = (particlesactives.X - mouse.X);
			var dy = (particlesactives.Y - mouse.Y)
			var umbrella = dx * dx + dy*dy;
			// if (umbrella < 20000 && umbrella > 15000 && particlesactives.Y < mouse.Y && particlesactives.velocityY > 2.75) {
			// 	if(particlesactives.velocityY > 2.75 + dx * dx / 2000.0){
			// 	explosion(particlesactives.X, particlesactives.Y, particlesactives.colour, null, particlesactives.velocityY);
			// 		particlesCreate.splice(i--, 1);
			// 		//particlesactives.velocityY += dy / 100;
			// 		//particlesactives.colour = "hsla(" + 100 + "," + controls.saturation + "%, " + controls.lightness + "%," + controls.opacity + ")";
			// 	} else {
			// 		particlesactives.velocityX += dx / 660;
			// 	}
			// }

			if(particlesactives.velocityY > controls.umbrellaZ - (controls.umbrellaDepth / 2)){
				//speed is the same as z-depth
				if(particlesactives.velocityY < controls.umbrellaZ){//further than midpoint
					var impactRadius = 20000 * sineLUT[parseInt((particlesactives.velocityY - controls.umbrellaZ) / (controls.umbrellaDepth / 2) * 90)]; //scale impact radius up as Zdepth goes up
					if(umbrella < impactRadius){
				 		explosion(particlesactives.X, particlesactives.Y, particlesactives.colour, null, particlesactives.velocityY);
				 		if(umbrella > 0.9 * impactRadius){
				 			particlesactives.velocityX += dx / 660;
				 		} else {
			 				particlesCreate.splice(i--, 1);
				 		}
					}
				} else {
					var impactRadius = 20000 * sineLUT[parseInt((1 - (particlesactives.velocityY - controls.umbrellaZ) / (controls.umbrellaDepth / 2)) * 90)];//scale impact radius down as Zdepth goes up
					if(umbrella < impactRadius){
				 		explosion(particlesactives.X, particlesactives.Y, particlesactives.colour, null, particlesactives.velocityY);
				 		if(umbrella > 0.9 * impactRadius){
				 			particlesactives.velocityX += dx / 660;
				 		} else {
			 				particlesCreate.splice(i--, 1);
				 		}
					}
				}
			}
		}
	}

	// while(Math.random() < controls.rain / 20){
	// 	var r = Math.sqrt(Math.random() * 20000);
	// 	var deg = parseInt(Math.random() * 180);
	// 	var size = Math.random() * .25 + 2.75;
	// 	var umbrellaSplashX = mouse.X + sineLUT[deg + 90] * r;
	// 	var umbrellaSplashY = mouse.Y - sineLUT[deg] * r;
	// 	explosion(umbrellaSplashX, umbrellaSplashY, "hsla(" + controls.umbrellaH + "," + controls.umbrellaS + "%, " + controls.umbrellaL + "%," + controls.opacity + ")", null, size);
	// }

	for (var i = 0, dropsactives; dropsactives = dropsCreate[i]; i++) {
		dropsactives.X += dropsactives.velocityX;
		dropsactives.Y += dropsactives.velocityY;
		dropsactives.radius -= 0.075;
		if (dropsactives.alpha > 0) {
			dropsactives.alpha -= 0.005;
		} else {
			dropsactives.alpha = 0;
		}
		if (dropsactives.radius < 0) {
			dropsCreate.splice(i--, 1);
		}
	}
	var i = controls.rain;
	while (i--) {
		Rain(Math.floor((Math.random()*width)), -15);
	}
}
  window.onload = function() {
	document.getElementsByClassName('close-button')[0].onclick = function(event){
		if (!event) {
        	event = window.event;
    	};
	}

	setTimeout(function() {
		document.getElementsByClassName('close-button')[0].className = "close-button open-button";
	}, 5000);
};

(function boucle() {
	requestAnimFrame(boucle);
	update();
	made(ctx);
})();
