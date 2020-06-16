const levels = [	
	// level 0
	["flag", "rock", "", "animate", "",
	 "", "rock", "", "animate", "rider",
	 "", "tree", "", "animate", "animate",
	 "bridge", "water", "bridge", "water", "water",
	 "", "fence", "", "horseup", ""],

	 // level 1
	 ["tree", "", "", "tree", "flag",
	 "animate", "animate", "animate", "animate", "animate",
	 "water", "bridge", "water", "water", "water",
	 "", "", "", "rock", "",
	 "rider", "rock", "", "", "horseup"],

	 // level 2
	 
	 ["flag", "water", "", "", "",
	 "fenceside", "water", "tree", "tree", "rider",
	 "animate", "bridge animate", "animate", "animate", "animate",
	 "", "water", "rock", "", "rock",
	 "", "water", "horseup", "", ""],

	 // level 3
	 ["", "water", "water", "animate", "flag",
	 "", "water", "water", "animate", "animate",
	 "", "water", "water", "fenceside", "fenceside",
	 "horseup", "bridge", "", "", "",
	 "", "water", "tree", "tree", "rider"],

	 // level 4 (last)
	 ["", "rider", "", "tree", "",
	 "", "tree", "rock", "", "",
	 "", "water", "rock", "", "flag",
	 "", "fence", "animate", "animate", "animate",
	 "horseup", "water", "", "fence", ""]

	 ]; // end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"];
var nextClass = "";

var currentLevel = 0;	// starting level
var riderOn = false;	// is the rider on?
var currentLocationOfHorse = 0;
var currentAnimation; 	// allow 1 animation per level

var onFence = false; // is the rider jumping over the fence?
var widthOfBoard = 5;

var locationOfEnemy = 0;
var animateBoxes = document.querySelectorAll(".animate");
var currentDirection;


var stepCount = 0;
var result = false; // has the player won? - currently: no
var allowResume = true;

// used to control game start/stop AND animation
var gameOn;


// show instructions when website loads
window.addEventListener("load", function () {
	guide();
});

// startGame
function startGame() {
	stepCount = 0;
	document.getElementById("score").innerHTML = "Step Count: " + stepCount;
	currentLevel = 0;
	riderOn = false;
	result = false;
	currentLocationOfHorse = 0;
	loadLevel();
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	gameOn = true;
	
} // startGame



function stopGame(reason) {
	clearTimeout(currentAnimation);
	gameOn = false;
	allowResume = false;

	if (result = true && currentLevel >= levels.length) {
		reason = "win";
	}
	
	if (reason == "hitEnemy") {
		message = "Oh no, the Alien caught you.";
		message2 = "You are at level " + (currentLevel + 1) + ". Wanna try again?";

	} else if (reason == "win") {
		message = "Yayy!   Albert and Simon are freed now.";
		message2 = "Albert only used " + (stepCount + 1) + " steps! Try again for fewer steps!";

	} else if (reason == "overStep") {
		message = "Albert ran out of energy!";
		message2 = "He can only run 70 steps. Wanna try again?";

	} else if (reason == "stop") {
		message = "Why did you give up?";
		message2 = "You are at level " + (currentLevel + 1) + ". Wanna restart?";

	}
	
	document.getElementById("x").className = "unhidden";
	document.getElementById("clickStart").className = "unhidden";
	showLightBox(message,message2);
	return;
} // stop Game

// move horse
document.addEventListener("keydown", function (e) {
	if (stepCount >= 70) {
			stopGame("overStep");
			return;
		}

	if (gameOn == true && onFence == false && stepCount < 70 && result == false) {
		switch (e.keyCode) {
			case 37: 	// left arrow
				if (currentLocationOfHorse % widthOfBoard !== 0) {
					tryToMove ("left");
					stepCount++;
					document.getElementById("score").innerHTML = "Step Count: " + stepCount;
				} // if
				break;

			case 38: 	// up arrow
				if (currentLocationOfHorse - widthOfBoard >= 0) {
					tryToMove ("up");
					stepCount++;
					document.getElementById("score").innerHTML = "Step Count: " + stepCount;
				
				} // if
				break;
			
			case 39: 	// right arrow
				if (currentLocationOfHorse % widthOfBoard < (widthOfBoard - 1)) {
					tryToMove ("right");
					stepCount++;
					document.getElementById("score").innerHTML = "Step Count: " + stepCount;
					
				} // if
				break;

			case 40: 	// down arrow
				if (currentLocationOfHorse + widthOfBoard < (widthOfBoard * widthOfBoard)) {
					tryToMove ("down");
					stepCount++;
					document.getElementById("score").innerHTML = "Step Count: " + stepCount;
			
				} // if
				break;
		} // switch 

		// console.log("step: " + stepCount);
		
		

	} // if gameOn
}); // key event listener

// try to move horse
function tryToMove (direction) {
	
	// location before move
	let oldLocation = currentLocationOfHorse;

	// class of location before move
	let oldClassName = gridBoxes[oldLocation].className;

	let nextLocation = 0;	// location we wish to move to
	//let nextClass = ""; 	// class of location we wish to move to

	let nextLocation2 = 0;
	let nextClass2 = "";

	let newClass = ""; 	// new class to switch to if move successful
	
	nextClass = gridBoxes[nextLocation].className;
	
	switch (direction) {
		case "left" : 
			nextLocation = currentLocationOfHorse - 1; 
			break;

		case "right" : 
			nextLocation = currentLocationOfHorse + 1;
			break;

		case "up" : 
			nextLocation = currentLocationOfHorse - widthOfBoard;
			break;

		case "down" : 
			nextLocation = currentLocationOfHorse + widthOfBoard;
			break;

		case "none":
			nextLocation = currentLocationOfHorse;
			return;
	} // switch

		nextClass = gridBoxes[nextLocation].className;

	if (gameOn == true && onFence == false) {	
		// if the obstacle is not passable, don't move
		if (noPassObstacles.includes(nextClass)) {  return;  };

		// if it's a fence, and there's no rider, don't move
		if (!riderOn && nextClass.includes("fence")) {  return;  };

		// if there's a fence, move 2 spaces with animation
			if (nextClass.includes("fence")) {

				// rider must be on to jump
				if (riderOn) {

					gridBoxes[currentLocationOfHorse].className = "";
					oldClassName = gridBoxes[nextLocation].className;

					// set values according to direction
					if (direction == "left") {
						nextClass = "jumpleft";
						nextClass2 = "horserideleft";
						nextLocation2 = nextLocation - 1;
					} else if (direction == "right") {
						nextClass = "jumpright";
						nextClass2 = "horserideright";
						nextLocation2 = nextLocation + 1;
					} else if (direction == "up") {
						nextClass = "jumpup";
						nextClass2 = "horserideup";
						nextLocation2 = nextLocation - widthOfBoard;
					} else if (direction == "down") {
						nextClass = "jumpdown";
						nextClass2 = "horseridedown";
						nextLocation2 = nextLocation + widthOfBoard;
					}


					// show horse jumping
					gridBoxes[nextLocation].className = nextClass;
					onFence = true;

					setTimeout (function() {
						
						// set jump back to just a fence
						gridBoxes[nextLocation].className = oldClassName;

						// update current location of the horse to be 2 spaces past take off
						currentLocationOfHorse = nextLocation2;

						// get class of box after jump
						nextClass = gridBoxes[currentLocationOfHorse].className;

						// show horse and rider after landing
						gridBoxes[currentLocationOfHorse].className = nextClass2;

						// document.addEventListener("keydown", e);

						// if next box is a flag, go up a level
						levelUp(nextClass);
						onFence = false;

					}, 350); //350
					
					return; 

				} // if rider on

			} // if class has fence


		// if there's a rider, add rider
		if (nextClass == "rider") {
			riderOn = true;
		} // if

		// if there's a bridge in the old location, keep it
		if (oldClassName.includes("bridge")) {
			gridBoxes[oldLocation].className = "bridge";
		} else {
			gridBoxes[oldLocation].className = "";
		} // else

		// build name of new class
		newClass = (riderOn) ? "horseride" : "horse";
		newClass += direction;

		// if there is a bridge in the next location, keep it
		if (gridBoxes[nextLocation].classList.contains("bridge")) {
			newClass += " bridge";
		}

		// move 1 space
		currentLocationOfHorse = nextLocation;
		gridBoxes[currentLocationOfHorse].className = newClass;

		// if it is an enemy
		if (nextClass.includes("enemy")) {
			stopGame("hitEnemy");
			return;
		}

		// move up a level if needed
		levelUp(nextClass);
	} // if GameOn
} // tryToMove


// move up a level
function levelUp (nextClass) {

	if (nextClass == "flag" && riderOn) {
	
		// level up until max level, then stop game
		if (currentLevel < (levels.length - 1)) {
				message = "Level " + (currentLevel + 1) + "/5.";
				message2 = "Good job!";
				
				if (currentLevel == levels.length - 2) {
					message2 = "Hey! Albert has " + (69 - stepCount) + " steps left.";
				}
				
				document.getElementById("clickStart").className = "hidden";
				document.getElementById("x").className = "hidden";

				showLightBox(message,message2);

		} else if (currentLevel >= (levels.length - 1) && stepCount <= 70) {
			stopGame("win");
			result = true;
			return;
		} 
			
			
		clearTimeout(currentAnimation);

		// to disable eventListener
		gameOn = false;
		
		setTimeout (function() {
			// to enable eventListerner
			gameOn = true;

			changeVisibility("lightbox");
			changeVisibility("boundaryMessage");
			
			currentLevel++;

			loadLevel();
			
		}, 1500); //1500
		
	} // if
} // levelUp

// load level 0 to max level
function loadLevel() {

	let levelMap = levels[currentLevel];
	// let animateBoxes;
	riderOn = false;
	
	if (currentLevel == levels.length) {
		return;
	}
	
	// load board
	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if (levelMap[i].includes("horse")) currentLocationOfHorse = i;
	} // for

	animateBoxes = document.querySelectorAll(".animate");

	if (currentLevel == 0 || currentLevel == 3) {
		animateEnemy(animateBoxes, 0, "down");
	} else {
		animateEnemy(animateBoxes, 0, "right");
	}
	

} // loadLevel

// animate enemy left to right (could add up and down to this)
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction) {
	 //console.log("box length: " + boxes.length);
	//console.log("index: " + index);
	// exit function if no animation
	if (boxes.length <= 0 ) { return; }

	// update images
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
	} else if (direction == "left") {
		boxes[index].classList.add("enemyleft");
	}


	if (direction == "down") {
		if (index == boxes.length - 1) {
			boxes[index].classList.add("enemyright");
		} else {
			boxes[index].classList.add("enemydown");
		}
		
	} else {
		boxes[index].classList.add("enemyup");
	} // if


	// remove images from other boxes
	for (i = 0; i < boxes.length; i++) {
		if (i != index) {
			boxes[i].classList.remove("enemyleft");
			boxes[i].classList.remove("enemyright");
			boxes[i].classList.remove("enemydown");
			boxes[i].classList.remove("enemyup");
		} // if
	} // for

	if (boxes[index].className.includes("horse")) {
		stopGame("hitEnemy");
		return;
	}

	// moving right
	if (direction == "right") {
		// turn around if hit right side
		if (index == boxes.length - 1) {
			index--;
			direction = "left";
		} else {
			index++;
		} // else
	
	// moving left
	} else if (direction == "left") {
		// turn around if hit left side
		if (index == 0) {
			index++;
			direction = "right";
		} else {
			index--;
		} // if

	// moving down
	} else if (direction == "down") {
		// turn around if hit top side
		if (index == boxes.length - 1) {
			index--;
			direction = "up";
		} else {
			index++;
		}// else
	
	// moving up
	} else if (direction == "up") {
		// turn around if hit bottom side
		if (index == 0) {
			index++;
			direction = "down";
		} else {
			index--;
		} // if
	}

	locationOfEnemy = index;
	currentDirection = direction;

	currentAnimation = setTimeout (function() {
		animateEnemy(boxes, index, direction);
	}, 750);
} // animate enemy

function guide() {
	message = "Albert and Simon's Adventure Game";
	message2 = "Albert the Unicorn \n and Simon the Master \n are both trapped in a maze "
	+ "guarded by aliens. First, Albert needs to seek Simon, then collects all flags at different levels "
	+ "to win their way out. "
	+ " However! Albert only have enough energy for 70 steps so watch the Step Count parameter. "
	+ "Use arrow keys to move around and don't waste the energy on non-passable "
	+ "obstacles like rock, water, tree. ";

	showLightBox(message, message2);
} // start



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
function closeX() {
	clearTimeout(currentAnimation);

	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
} // continueGame


/**** Ends Show Light Boxes ****/

// resume game play
function resumeGame() {
	if (!gameOn && result == false && allowResume == true) {
		// console.log("resume game");
		gameOn = true;
		
		animateEnemy(animateBoxes,locationOfEnemy,currentDirection);

	} // if


} // resumeGame

// pause game play
function pauseGame() {
	allowResume == true;
	
	if (gameOn) {
		// console.log("from pauseGame");
		clearTimeout(currentAnimation);
		gameOn = false;
	}
} // pauseGame