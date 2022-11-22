var speed = canvas.width/100;
var goLeft = false, goRight = false;

function Square(){
	this.x = canvas.width*.45, this.y = canvas.height*.85, this.w = canvas.width/8, this.h = canvas.height/30;

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
		
		this.drawSquare();
	}
}
