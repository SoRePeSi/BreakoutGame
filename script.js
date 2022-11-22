/*
	TO DO:
		- Fix ball hit on block sides;
		- Identify when all blocks are destroyed (remove them from list on destroy);
		- Create start, end and game over screen;
		- Improve angling on player hit;
		- Organize everything;
		-- Add more features.
*/

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

function resize(){
	canvas.width = window.innerWidth*.6;
	canvas.height = window.innerHeight*.8;
}
resize();

var speed = 10;
var score = 0;
var currentLevel = 0;

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

const square = new Square();
square.drawSquare();

function Ball(pX, pY){
	this.x = pX, this.y = pY, this.size = pY/15;
	this.baseBallSpeed = this.ballSpeedX = this.ballSpeedY = this.size*.8;
	
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
		if( (this.y+this.size>=square.y && this.y-this.size <= square.y+square.h) && (this.x+this.size>=square.x && this.x-this.size<=square.x+square.w) && this.ballSpeedY>0){
			if( (this.x < square.x + square.w/2 && this.ballSpeedX > 0) || (this.x > square.x + square.w/2 && this.ballSpeedX < 0) ){
				this.ballSpeedX *= -1
			}
			this.ballSpeedY *= -1;
		}
		
		/*Set parameters to change ballSpeedY depending on what side it hits*/
		
		this.drawBall();
	}
}

const b = new Ball(100, 100);
b.drawBall();

function Block(bX, bY){
	this.x = bX*canvas.width/15, this.y = bY*canvas.height/20, this.w = canvas.width/15, this.h = canvas.height/20;
	this.health = 1;

	this.drawBlock = function(){
		c.fillStyle = "blue";
		c.fillRect(this.x, this.y, this.w, this.h);
	}

	this.updateBlock = function(){
		if( b.x+b.size/2 > this.x && b.x-b.size/2 < this.x+this.w &&  b.y+b.size/2 > this.y && b.y-b.size/2 < this.y+this.h ){
			if( b.x <= this.x || b.x >= this.x+this.w ) b.ballSpeedX *= -1;
			if( b.y <= this.y || b.y >= this.y+this.h ) b.ballSpeedY *= -1;
			this.damageBlock();
		}
		
		this.drawBlock();
	}
	
	this.damageBlock = function(){
		this.health--;
		
		if(this.health <= 0){
			this.x = this.y = -10, this.h = this.w = 0;
		}
		document.getElementById("teste").innerHTML = this.health;
	}
}

var allLevels = [
	[	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	
	[	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	]
];


var listofblock = [];
function createLevel(level){
	var chosenLevel = allLevels[level];
	for(var i=0; i<chosenLevel.length; i++){
		for(var j=0; j<chosenLevel[0].length; j++){
			if(chosenLevel[i][j] > 0){
				listofblock[listofblock.length] = new Block(j, i);
			}
		}
	}
}
createLevel(currentLevel);

function updateLevel(){
	for(var i=0; i<listofblock.length; i++){
		listofblock[i].updateBlock();
	}
}


function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,canvas.width, canvas.height);

	square.updateSquare();
	b.updateBall();
	updateLevel();
}

animate();