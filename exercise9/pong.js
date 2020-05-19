// global variable

var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;

var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

var gameboardHeight = document.getElementById("gameBoard").offsetHeight;
var gameBoardWidth = document.getElementById("gameBoard").offsetWidth;
var ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionofBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var score1 = 1;
var score2 = 1;

// start ball motion
window.addEventListener('load', function() {
	startBall();
})

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

	
});

function startBall() {
	let direction = 1;
	topPositionofBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;

	// 50% chance of starting right or left
	if (Math.random() < 0.5) {
		direction = 1;
	} else {
		direction = -1;
	} // if

	topSpeedOfBall = Math.random() * 2 + 3; // 3-4.9999
	leftSpeedOfBall = direction * (Math.random() * 2 + 3);


} // startBall

// update locations of paddles and ball
window.setInterval( function show() {

	// update positions of elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionofBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;

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

	// if ball hits top or bottom of gameboard, change direction
	if (topPositionofBall <= 0 || topPositionofBall >= gameboardHeight - ballHeight) {
		topSpeedOfBall *= -1;

	} // if

	// ball on left edge of gameBoard
	if (leftPositionOfBall <= paddleWidth) {
		
		// if ball hits left paddle, change direction
		if (topPositionofBall >= positionOfPaddle1 && topPositionofBall < positionOfPaddle1 + paddleHeight) {
			leftSpeedOfBall *= -1;
		} else {
			startBall();
			document.getElementById("right").innerHTML = "Player B: " + score2++;
		} // else

	} // if

	// ball on right side of gameBoard
	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {

		// if ball hits right paddle, change direction
		
		if (topPositionofBall > positionOfPaddle2 && 
			topPositionofBall < positionOfPaddle2 + paddleHeight) {
		    leftSpeedOfBall *= -1;
		
		} else {
		  startBall();
		  document.getElementById("left").innerHTML = "Player A: " + score1++;
		} // else

	}

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionofBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
}, 1000/60); // show

