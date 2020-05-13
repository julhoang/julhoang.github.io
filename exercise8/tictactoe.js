let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie", "X Wins", "O Wins"
let numTurns = 0;
let userChoice = "";

let idNames = ["one", "two", "three",
"four", "five", "six", "seven", "eight", "nine"];



// reset board and all variables
function newGame() {

	//reset board
	for (var i = 0; i < idNames.length; i++) {
		document.getElementById(idNames[i]).innerHTML = "";
	} // for

	currentPlayer = "X";
	gameStatus = "";
	numTurns = 0;

	changeVisibility("controls");
}// newGame

// randomly choose a free box for computer
function computerTakeTurn() {
	
	let idName = "";
	let idOne = ["two", "three", "four", "five", "seven"];
	let idTwo = ["one", "three", "five", "eight"];
	let idThree = ["one", "two", "five", "six", "seven", "nine"];
	let idFour = ["one", "five", "six", "seven"];
	let idSix = ["tnree", "four", "five", "nine"];
	let idSeven = ["one", "three", "four", "five", "eight", "nine"];
	let idEight = ["two", "five", "seven", "nine"];
	let idNine = ["one", "three", "five", "six", "seven", "eight"];
	

	let cb = []; // current board
	cb [0] = ""; // not going to use
	cb [1] = document.getElementById("one").innerHTML; 
	cb [2] = document.getElementById("two").innerHTML; 
	cb [3] = document.getElementById("three").innerHTML; 
	cb [4] = document.getElementById("four").innerHTML; 
	cb [5] = document.getElementById("five").innerHTML; 
	cb [6] = document.getElementById("six").innerHTML; 
	cb [7] = document.getElementById("seven").innerHTML; 
	cb [8] = document.getElementById("eight").innerHTML; 
	cb [9] = document.getElementById("nine").innerHTML;
	
	// choose random boxes until an empty box is found
	do {
		if (cb[1] == "X") {
		
			if (cb[2] == "" || cb[3] == "" || cb[4] == "" || cb[5] == "" || cb[7] == "" || cb[9] == "") {
				do {
					let rand1 = parseInt(Math.random()*idOne.length + 1);
					idName = idOne[rand1 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 1 - selected random");
				break;

			} else {
				do {
					let rand1 = parseInt(Math.random()*9 + 1);
					idName = idNames[rand1 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 1 - all random");
				break;
			} // else

		} // if CB1

		if (cb[2] == "X") {
			
			if (cb[1] == "" || cb[3] == "" || cb[5] == "" || cb[7] == "") {
				do {
					let rand2 = parseInt(Math.random()*idTwo.length + 1);
					idName = idTwo[rand2 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 2 - selected random");
				break;

			} else {
				do {
					let rand2 = parseInt(Math.random()*9 + 1);
					idName = idNames[rand2 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 2 - all random");
				break;
			} // else

		}  // if

		if (cb[3] == "X") {
			if (cb[1] == "" || cb[2] == "" || cb[5] == "" || cb[6] == "" || cb[7] == "" || cb[9] == "") {
				do {
					let rand3 = parseInt(Math.random()*idThree.length + 1);
					idName = idThree[rand3 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 3 - selected random");
				break;

			} else {
				do {
					let rand3 = parseInt(Math.random()*9 + 1);
					idName = idNames[rand3 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 3 - all random");
				break;
			} // else
		} // if

		if (cb[4] == "X") {
			if (cb[1] == "" || cb[5] == "" || cb[6] == "" || cb[7] == "") {
				do {
					let rand4 = parseInt(Math.random()*idFour.length + 1);
					idName = idFour[rand4 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 4 - selected random");
				break;

			} else {
				do {
					let rand4 = parseInt(Math.random()*9 + 1);
					idName = idNames[rand4 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 4 - all random");
				break;
			} // else
		} // if

		if (cb[6] == "X") {
			if (cb[3] == "" || cb[4] == "" || cb[5] == "" || cb[9] == "") {
				do {
					let rand6 = parseInt(Math.random()*idSix.length + 1);
					idName = idSix[rand6 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 6 - selected random");
				break;

			} else {
				do {
					let rand6 = parseInt(Math.random()*9 + 1);
					idName = idNames[rand6 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 6 - all random");
				break;
			} // else
		}  // if

		if (cb[7] == "X") {
			if (cb[1] == "" || cb[3] == "" || cb[4] == "" || cb[5] == "" || cb[8] == "" || cb[9] == "") {
				do {
					let rand7 = parseInt(Math.random()*idSeven.length + 1);
					idName = idSeven[rand7 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 7 - selected random");
				break;

			} else {
				do {
					let rand7 = parseInt(Math.random()*9 + 1);
					idName = idNames[rand7 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 7 - all random");
				break;
			} // else
		} // if

		if (cb[8] == "X") {
			if (cb[2] == "" || cb[5] == "" || cb[7] == "" || cb[9] == "") {
				do {
					let rand8 = parseInt(Math.random()*idEight.length + 1);
					idName = idEight[rand8 - 1];
				} while (document.getElementById(idName).innerHTML != "");
					document.getElementById(idName).innerHTML = currentPlayer;
					console.log("Box 8 - selected random");
					break;
			
			} else {
				do {
					let rand8 = parseInt(Math.random()*9 + 1);
					idName = idNames[rand8 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				console.log("Box 8 - all random");
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
			} // else
			
		} // if

		if (cb[9] == "X" ) {
			if (cb[1] == "" || cb[3] == "" || cb[5] == "" || cb[6] == "" || cb[7] == "" || cb[8] == "") {
				do {
					let rand9 = parseInt(Math.random()*idNine.length + 1);
					idName = idNine[rand9 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				document.getElementById(idName).innerHTML = currentPlayer;
				console.log("Box 9 - selected random");
				break;

			} else {
				do {
					let rand9 = parseInt(Math.random()*9 + 1);
					idName = idNames[rand9 - 1];
				} while (document.getElementById(idName).innerHTML != "");
				console.log("Box 9 - all random");
				document.getElementById(idName).innerHTML = currentPlayer;
				break;
			} // else
		} // if

		if (cb[5] == "X") {
			do {
				let rand = parseInt(Math.random()*9 + 1); //1-9
				idName = idNames[rand - 1];
			} while (document.getElementById(idName).innerHTML != "");
			console.log("box 5");
			document.getElementById(idName).innerHTML = currentPlayer;
			break;
		} // if

	} while (true);


} // computerTakeTurn

// take player turn
function playerTakeTurn(e) {

	if (e.innerHTML == "") {
		e.innerHTML = currentPlayer;	
		checkGameStatus();

		//if game is not over, computer goes
		if (gameStatus == ""){
			setTimeout(function() {
				computerTakeTurn();
				checkGameStatus();
				}, 500
			);
		} // if
	} else {
		showLightBox("This box is already selected.", "Please try another.");
		console.log("The box has already been clicked, please try another one.");
		return; 
	} // else
	
} // playerTakeTurn

// after each turn, check for a winner, a tie
// or continue playing
function checkGameStatus() {
	numTurns++; // count turn
	
	if (numTurns == 9 && !checkWin()) {
		gameStatus = "Tie Game!";
		console.log("Tie");
		setTimeout(function() {
				showLightBox(gameStatus, "Game Over.");
					}, 500
			);

		return; 
	} // if

	// check win
	if (checkWin()) {
		gameStatus = currentPlayer + " wins!";
		console.log("Game Status: " + gameStatus); 

		// game is over
		if (gameStatus != "") {
			setTimeout(function() {
				showLightBox(gameStatus, "Game Over.");
					}, 500
			);
		} // if
		return;
	} // if
	
	// switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X"); 

} // checkGameStatus

// check for a win, there are 8 wins path
function checkWin() {
	let cb = []; // current board
	cb [0] = ""; // not going to use
	cb [1] = document.getElementById("one").innerHTML; 
	cb [2] = document.getElementById("two").innerHTML; 
	cb [3] = document.getElementById("three").innerHTML; 
	cb [4] = document.getElementById("four").innerHTML; 
	cb [5] = document.getElementById("five").innerHTML; 
	cb [6] = document.getElementById("six").innerHTML; 
	cb [7] = document.getElementById("seven").innerHTML; 
	cb [8] = document.getElementById("eight").innerHTML; 
	cb [9] = document.getElementById("nine").innerHTML;

	// top row
	if (cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]) {
		return true;
	}

	// second row
	if (cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]) {
		return true;
	}

	// third row
	if (cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]) {
		return true;
	}

	//first column
	if (cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]) {
		return true;
	}

	// second column
	if (cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]) {
		return true;
	}

	// third column
	if (cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]) {
		return true;
	}

	// left diagonal
	if (cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]) {
		return true;
	}

	// right diagonal
	if (cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]) {
		return true;
	}

} // checkWin

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

}

// close light box
function continueGame() {
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");

	// if the game is over, show controls
	if (gameStatus != ""){
		changeVisibility("controls");
	}

} // continueGame
