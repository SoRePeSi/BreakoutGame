/*
	TO DO:
		- Fix start, end and game over screen;
		- Add angling on player hit;
		- Organize everything;
		- Create more levels;
		-- Add more features;
		-- Upon creation, make ball immobile until player moves.
*/
var score = 0, currentLevel = 0, lives = 3;
var gameon = false;

var listofball = [];
var listofblock = [];

function Ball(p){
	this.size = canvas.width/110;
	this.x = p.x + p.w/2, this.y = p.y - this.size;
	this.baseBallSpeed = this.ballSpeedX = this.ballSpeedY = this.size*.8;
	this.ballSpeedY *= -1;
	
	listofball[listofball.length] = this;
	
	this.drawBall = function(){
		c.fillStyle = "gray";
		c.beginPath();
		c.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		c.fill();
	}
	
	this.updateBall = function(){
		this.x += this.ballSpeedX;
		this.y += this.ballSpeedY;
		
		// Collision with ceiling:
		if( this.y<=0 && this.ballSpeedY<0 ){
			this.ballSpeedY *= -1;
		}
		// Collision with floor:
		if(this.y - this.size/2 >= canvas.height){
			listofball.splice(listofball.indexOf(this));
			if(listofball.length == 0){
				lives--;
				document.getElementById("teste").innerHTML = lives;
				if(lives == -1){
					GameOverScreen();
				}
				else{
					b = new Ball(square);
				}
			}
		}
		// Collision with walls:
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
		
		this.drawBall();
	}
}

function Block(bX, bY){
	this.x = bX*canvas.width/15, this.y = bY*canvas.height/20, this.w = canvas.width/15, this.h = canvas.height/20;
	this.health = 1;

	this.drawBlock = function(){
		c.fillStyle = "blue";
		c.fillRect(this.x, this.y, this.w, this.h);
	}

	this.updateBlock = function(){
		if( b.x+b.size > this.x && b.x-b.size < this.x+this.w &&  b.y+b.size > this.y && b.y-b.size < this.y+this.h ){
			if( (b.x <= this.x && b.ballSpeedX > 0) || (b.x >= this.x+this.w && b.ballSpeedX < 0) ) b.ballSpeedX *= -1;
			if( (b.y <= this.y && b.ballSpeedY > 0) || (b.y >= this.y+this.h && b.ballSpeedY < 0) ) b.ballSpeedY *= -1;
			if(this.damageBlock() == 0) return "destroyed";
		}
		
		this.drawBlock();
	}
	
	this.damageBlock = function(){
		this.health--;
		
		return this.health;
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


function StartScreen(){
	
}

var square, b;

function GameScreen(){
	square = new Square();
	square.drawSquare();

	b = new Ball(square);
	b.drawBall();
	
	try{
		window.removeEventListener("press", restartQuit);
	}catch{}

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
	
	createLevel(currentLevel);
	gameon = true;
}

function GameOverScreen(){
	gameon = false;
	listofball.length = 0;
	listofblock.length = 0;
	
	window.removeEventListener("keydown", keyPressed);
	window.removeEventListener("keyup", keyReleased);
	
	window.addEventListener("kedown", function restartQuit(event){
		var presssedKey = event.keyCode;
		if(pressedKey == 114 || pressedKey == 82){
			GameScreen();
		}
		if(pressedKey == 113 || pressedKey == 81){
			StartScreen();
		}
	});
}

function updateAllBlocks(){
	for(var i=0; i<listofblock.length; i++){
		var res = listofblock[i].updateBlock();
		if(res == "destroyed"){
			listofblock.splice(i, 1);
		}
	}
	
	if(listofblock.length == 0){
		square = new Square();
		b = newBall()
		currentLevel++;
		createLevel(currentLevel);
	}
}

function updateAllBalls(){
	for(var i=0; i<listofball.length; i++){
		listofball[i].updateBall();
	}
}

function animate(){
	requestAnimationFrame(animate);
	if(gameon){
		c.clearRect(0,0,canvas.width, canvas.height);

		square.updateSquare();
		updateAllBalls();
		updateAllBlocks();
	}
}

GameScreen();
animate();