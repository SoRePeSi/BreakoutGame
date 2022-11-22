var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

function resize(){
	canvas.width = window.innerWidth*.6;
	canvas.height = window.innerHeight*.8;
}
resize();

var speed = 10;

var goLeft = false, goRight = false;

window.addEventListener("keydown", function keyPressed(event){
	var pressedKey = event.keyCode;
	if(pressedKey == 97 || pressedKey == 65){
			goLeft = true;
	}
	if(pressedKey == 100 || pressedKey == 68){
			goRight = true;
	}
});

window.addEventListener("keyup", function keyReleased(event){
	var releasedKey = event.keyCode;
	if(releasedKey == 97 || releasedKey == 65){
			goLeft = false;
	}
	if(releasedKey == 100 || releasedKey == 68){
			goRight = false;
	}
});

function Square(){
	this.x = canvas.width*.45, this.y = canvas.height*.8, this.w = canvas.width/7, this.h = canvas.height/20;

	this.drawSquare = function(){
		c.fillStyle = "red";
		c.fillRect(this.x, this.y, this.w, this.h);
	}

	this.updateSquare = function(){
		if(goLeft && this.x>0){
			this.x -= speed;
		}
		if(goRight && this.x+this.w<canvas.width){
			this.x += speed;
		}
	}
}

const square = new Square();
square.drawSquare();

function Ball(pX, pY){
	this.x = pX, this.y = pY, this.size = pY/10;
	this.ballSpeedX = 5, this.ballSpeedY = 5;
	
	this.drawBall = function(){
		c.fillStyle = "gray";
		c.beginPath();
		c.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		c.fill();
	}
	
	this.updateBall = function(){
		this.x += this.ballSpeedX;
		this.y += this.ballSpeedY;
		
		// Collision with walls:
		if( (this.y<=0 && this.ballSpeedY<0) || (this.y>=canvas.height && this.ballSpeedY>0) ){
			this.ballSpeedY *= -1;
		}
		if( (this.x<=0 && this.ballSpeedX<0) || (this.x>=canvas.width && this.ballSpeedX>0) ){
			this.ballSpeedX *= -1;
		}
		
		// Collision with player:
		if( (this.y>=square.y && this.y<= square.y+square.h/2) && (this.x>=square.x && this.x<=square.x+square.w) && this.ballSpeedY>0){
			this.ballSpeedY *= -1;
		}
	}
}

const b = new Ball(100, 100);
b.drawBall();

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width, canvas.height);

	square.updateSquare();
	square.drawSquare();
	
	b.updateBall();
	b.drawBall();
document.getElementById("teste").innerHTML = square.y + " | " + square.y+square.h + " //// " + square.x + " - " + square.x+square.w + " //// " + b.x + " " + b.y;
}

animate();