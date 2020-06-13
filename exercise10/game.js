const levels = [	
	// level 0
	["flag", "rock", "", "animate", "",
	 "", "rock", "", "animate", "rider",
	 "", "tree", "", "animate", "animate",
	 "", "water", "", "", "",
	 "", "fence", "", "horseup", ""],

	 // level 1
	 ["flag", "water", "", "", "",
	 "fenceside", "water", "tree", "tree", "rider",
	 "animate", "bridge animate", "animate", "animate", "animate",
	 "", "water", "rock", "", "rock",
	 "", "water", "horseup", "", ""],

	 // level 2
	 ["tree", "", "", "tree", "flag",
	 "animate", "animate", "animate", "animate", "animate",
	 "water", "bridge", "water", "water", "water",
	 "", "", "", "fence", "",
	 "rider", "rock", "", "", "horseup"],

	 // level 3
	 ["", "water", "water", "animate", "flag",
	 "", "water", "water", "animate", "animate",
	 "", "water", "fenceside", "fenceside", "fenceside",
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

var stepCount = 0;
var result = false; // has the player won? - currently: no

// used to control game start/stop
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
	currentLocationOfHorse = 0;
	loadLevel();
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	gameOn = true;
	
} // startGame



function stopGame(reason) {
	clearTimeout(currentAnimation);
	gameOn = false;

	if (result == true) {
		reason = "win";
	}
	
	if (reason == "hitEnemy") {
		message = "Oh no, the Enemy found you";
		message2 = "You are at level " + (currentLevel + 1) + ". Wanna try again?";

	} else if (reason == "win") {
		message = "Yayy!   Albert and Simon are freed now.";
		message2 = "Albert only used " + stepCount + " steps! Try again for fewer steps!";

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
	
	if (gameOn == true && onFence == false) {
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

		if (stepCount > 70) {
			stopGame("overStep");
			return;
		}

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
				message2 = "Albert has " + (70 - stepCount) + " steps left to spend";
				document.getElementById("clickStart").className = "hidden";
				document.getElementById("x").className = "hidden";

				showLightBox(message,message2);

		} else if (currentLevel >= (levels.length - 1)) {
			stopGame("win");
			console.log("win");
			result = true;
			return;
		} // if
			
			
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

	animateEnemy(animateBoxes, 0, "right");

} // loadLevel

// animate enemy left to right (could add up and down to this)
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction) {
	// console.log("box length: " + boxes.length);
	//console.log("index: " + index);
	// exit function if no animation
	if (boxes.length <= 0 ) { return; }

	// update images
	if (direction == "right") {
		boxes[index].classList.add("enemyright");
	} else if (direction == "left") {
		boxes[index].classList.add("enemyleft");
	
	} else if (direction == "down") {
		boxes[index].classList.add("enemydown");
		console.log("should be down");
	} else {
		boxes[index].classList.add("enemyup");
		console.log("should be up");
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
		console.log("found horse");
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

	// moving up
	} else if (direction == "down") {
		// turn around if hit top side
		if (index == boxes.length - 1) {
			index--;
			direction = "up";
		} else {
			index++;
		} // else
	
	// moving down
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
	currentAnimation = setTimeout (function() {
		animateEnemy(boxes, index, direction);
	}, 750);
} // animate enemy

function guide() {
	message = "Albert and Simon's Adventure Game";
	message2 = "Albert the Horse and Simon the Master are both trapped in a maze "
	+ "guarded by aliens. First, Albert needs to seek Simon, then collects all flags at different levels "
	+ "to win their way out. \n"
	+ " However! Albert only have enough energy for 70 steps. "
	+ "Watch the Step Count parameter and don't waste the energy on non-passable "
	+ "obstacles like rock, water, tree. Use arrow keys to move around. ";

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
	if (!gameOn) {
		console.log("resume game");
		gameOn = true;
		animateEnemy(animateBoxes,locationOfEnemy,"right");
	} // if


} // resumeGame

// pause game play
function pauseGame() {
	
	if (gameOn) {
		console.log("from pauseGame");
		clearTimeout(currentAnimation);
		gameOn = false;
	}
} // pauseGame