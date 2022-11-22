var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

function resize(){
	canvas.width = window.innerWidth*.6;
	canvas.height = window.innerHeight*.8;
}
resize();