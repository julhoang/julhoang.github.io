// global variable

var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;

var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const startPaddleHeight = document.getElementById("paddle1").offsetHeight;
var paddleHeight = document.getElementById("paddle1").offsetHeight;

const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;
var ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionofBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var score1 = 1;
var score2 = 1;

var bounce = new sound ("hit.mp3");
var fail = new sound ("fail.mp3");
var win = new sound ("win.mp3");


// to keep track no. of times ball hit both paddle
var count = 0;

// used to control game start/stop
var controlPlay;

// display Game instructions using light box
function guide() {

	let message = "WELCOME TO PONG GAME";
	let message2 = "In this modified version, the paddles get shorter every 5 times the ball hits the paddles. \n"
	+ " Get to 3 points first to win the game!";
	showLightBox(message, message2);
} // guide
	

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

// add sound effect
// https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


// start ball movement
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

	// speed of ball
	// topSpeedOfBall = Math.random() * 4 + 5;
	// leftSpeedOfBall = direction * (Math.random() * 4 + 5);
	topSpeedOfBall = 7;
	leftSpeedOfBall = 7;
} // startBall


// color code:
// dark green: #22523a
// orange: #567e6a
// to use the count to change paddle size
function changeLook() {
	if (count > 0 && count%5 == 0 && paddleHeight >= 90) {
		paddleHeight -= 30;
		console.log("paddle height: " + paddleHeight);
		document.getElementById("paddle1").style.height = paddleHeight + "px";
		document.getElementById("paddle2").style.height = paddleHeight + "px";

		if (paddleHeight >=  120) {
			document.getElementById("paddle1").style.backgroundColor = "#22523a";
			document.getElementById("paddle2").style.backgroundColor = "#22523a";
		} else if (paddleHeight >=  90) {
			document.getElementById("paddle1").style.backgroundColor = "#567e6a";
			document.getElementById("paddle2").style.backgroundColor = "#567e6a";
		} else if (paddleHeight >=  60) {
			document.getElementById("paddle1").style.backgroundColor = "#FF3232";
			document.getElementById("paddle2").style.backgroundColor = "#FF3232";
		} // else if

	} // if
} // changeLook


// update locations of paddles and ball
function show() {
	
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
			count++;
			changeLook();
			bounce.play();
			leftSpeedOfBall *= -1;
			console.log("count: " + count);
		} else {
			fail.play();
			startBall();
			document.getElementById("right").innerHTML = "Player B: " + score2++;
		} // else

	} // if

	// ball on right side of gameBoard
	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {

		// if ball hits right paddle, change direction
		
		if (topPositionofBall > positionOfPaddle2 && 
			topPositionofBall < positionOfPaddle2 + paddleHeight) {
			count++;
			changeLook();
			bounce.play();
			leftSpeedOfBall *= -1;
			console.log("count: " + count);
		} else {
		  fail.play();
		  startBall();
		  document.getElementById("left").innerHTML = "Player A: " + score1++;
		} // else

	} // if

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionofBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";

	// stop game if a player reaches 3 points
	if (score1 == 4 || score2 == 4){
		stopGame();
	}
	// change paddle height
} // show


// resume game play
function resumeGame() {
	if (!controlPlay) {
		controlPlay = window.setInterval(show, 1000/60);
	} // if
} // resumeGame

// pause game play
function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
} // pauseGame

// start game play
function startGame() {
	count = 0;

	guide();
	setTimeout(function() {

		if (document.getElementById("lightbox").className == 'unhidden') {
				changeVisibility(guide());
		} //if
				}, 3000
		);
		
	// reset scores, ball
	
	score1 = 1;
	score2 = 1;

	document.getElementById("left").innerHTML = "Player A: " + 0;
	document.getElementById("right").innerHTML = "Player B: " + 0;
	
	// reset paddles height, location, color
	paddleHeight = startPaddleHeight;
	console.log("Paddle Height: " + paddleHeight);
	document.getElementById("paddle1").style.height = paddleHeight + "px";
	document.getElementById("paddle2").style.height = paddleHeight + "px";

	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;

	document.getElementById("paddle1").style.backgroundColor = "black";
	document.getElementById("paddle2").style.backgroundColor = "black";
	
	setTimeout(function() {
				startBall();
				controlPlay = window.setInterval(show, 1000/60);
					}, 3500
			);

} // startGame

// stop game play
function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;

	// show lightbox with score
	let message = "Tie Game";
	let message2 = "Close to continue";

	if (score2 > score1) {
		message = "Player B wins with " + (score2-1) + " points!";
		message2 = "Player A has " + (score1-1) + " points.";
	} else if (score1 > score2) {
		message = "Player A wins with " + (score1-1) + " points!";
		message2 = "Player B has " + (score2-1) + " points.";
	} // if

	showLightBox(message, message2);
	win.play();
} // stopGame

/**** Show Lightboxed ****/
function changeVisibility (divID) {
	var element = document.getElementById(divID);

	// if element exists, toggle its class
	// between hidden and unhidden
	if (element) {
		element.className = (element.className == 'hidden')? 'unhidden':'hidden';
	} // if
} // changeVisibility

// display message in lightbox
function showLightBox(message, message2) {
	
	// set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	// show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

} // showLightBox

// close light box
function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
} // continueGame


/**** Ends Show Light Boxes ****/