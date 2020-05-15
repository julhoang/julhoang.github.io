// global variable

var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;

var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

// Move paddles
document.addEventListener('keydown', function(e) {
	//console.log("key down " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87) {	// W key
		speedOfPaddle1 = -10;
	} // if

	if (e.keyCode == 83 || e.which == 83) {	// S key
		speedOfPaddle1 = 10;
	} // if

	if (e.keyCode == 38 || e.which == 38) {	// Up Arrow key
		speedOfPaddle2 = -10;
	} // if

	if (e.keyCode == 40 || e.which == 40) {	// Down Arrow key
		speedOfPaddle2 = 10;
	} // if


	show();

});

// Stop paddles
document.addEventListener('keyup', function(e) {
	//console.log("key up " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87 || e.keyCode == 83 || e.which == 83 ) {
		speedOfPaddle1 = 0;
	} // if

	if (e.keyCode == 38 || e.which == 38 || e.keyCode == 40 || e.which == 40) {
		speedOfPaddle2 = 0;
	} // if

	show();
});


// update locations of paddles and ball
function show() {
	let paddleHeight = document.getElementById("paddle1").offsetHeight;
	let gameboardHeight = document.getElementById("gameBoard").offsetHeight;

	positionOfPaddle1 += speedOfPaddle1;
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";

	positionOfPaddle2 += speedOfPaddle2;
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";

	// stop paddle from leaving the top of the gameboard
	if (positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	} // if 

	if (positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	} // if 


	// stop paddle from leaving the bottom of the gameboard
	if (positionOfPaddle1 >= gameboardHeight - paddleHeight) {
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	} // if

	if (positionOfPaddle2 >= gameboardHeight - paddleHeight) {
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	} // if


} // show



