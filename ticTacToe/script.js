

function Combination (combination) {
	this.valid = true;
	this.combo = combination;
} 

Combination.prototype = {
	constructor: Combination,
	getCombo:function() {
		return this.combo;
	},
	getValid:function() {
		return this.valid;
	},
	setValidFalse:function() {
		this.valid = false;
	}
}

var location_of_combo = [ //location of each win combination in square_based_combination array
	[0, 1, 2], //win combination 0 location in square_based_combination
	[3, 4, 5], //win combination 1 location in square_based_combination
	[6, 7, 8], //win combination 2 location in square_based_combination
	[0, 3, 6], //win combination 3 location in square_based_combination
	[1, 4, 7], //win combination 4 location in square_based_combination
	[2, 5, 8], //win combination 5 location in square_based_combination
	[0, 4, 8], //win combination 6 location in square_based_combination
	[2, 4, 6], //win combination 7 location in square_based_combination
	[2, 4, 6]  //win combination 8 location in square_based_combination
];

/*******************/
//References to all possible square panels in the board
var one_panel, two_panel, three_panel, four_panel, five_panel, six_panel, seven_panel, eight_panel, nine_panel;
/*******************/
//Copy of references of all possible square panels in the board
var one, two, three, four, five, six, seven, eight, nine;
/*******************/


var validMoves = [true, true, true, true, true, true, true, true, true];

/**
*
**/
function setPlayerWinCombination () {
	var possible_win_combination = 
	[
		[one_panel, two_panel, three_panel], //0
		[four_panel, five_panel, six_panel], //one_panel
		[seven_panel, eight_panel, nine_panel], //two_panel
		[one_panel, four_panel, seven_panel], //three_panel
		[two_panel, five_panel, eight_panel], //four_panel
		[three_panel, six_panel, nine_panel], //five_panel
		[one_panel, five_panel, nine_panel], //six_panel
		[three_panel, five_panel, seven_panel]  //seven_panel

	/*	[1, 2, 3], //0
		[4, 5, 6], //1
		[7, 8, 9], //2
		[1, 4, 7], //3
		[2, 5, 8], //4
		[3, 6, 9], //5
		[1, 5, 9], //6
		[3, 5, 7]  //7
	*/];
	var combo0 = new Combination(possible_win_combination[0]);
	var combo1 = new Combination(possible_win_combination[1]);
	var combo2 = new Combination(possible_win_combination[2]);
	var combo3 = new Combination(possible_win_combination[3]);
	var combo4 = new Combination(possible_win_combination[4]);
	var combo5 = new Combination(possible_win_combination[5]);
	var combo6 = new Combination(possible_win_combination[6]);
	var combo7 = new Combination(possible_win_combination[7]);

	var square_based_combination = [
		[combo0, combo3, combo6], //possible win combination with a 1
		[combo0, combo4], //possible win combination with a 2
		[combo0, combo5, combo7], //possible win combination with a 3
		[combo1, combo3], //possible win combination with a 4
		[combo1, combo4, combo6, combo7], //possible win combination with a 5
		[combo1, combo5], //possible win combination with a 6
		[combo2, combo3, combo7], //possible win combination with a 7
		[combo2, combo4], //possible win combination with a 8
		[combo2, combo5, combo6] //possible win combination with a 9
	];
	return square_based_combination;
}

/**
* Set references to all possible square panels in the board
**/
function setSquareReferences() {
	one_panel = document.getElementById("one");
	two_panel = document.getElementById("two");
	three_panel = document.getElementById("three");
	four_panel = document.getElementById("four");
	five_panel = document.getElementById("five");
	six_panel = document.getElementById("six");
	seven_panel = document.getElementById("seven");
	eight_panel = document.getElementById("eight");
	nine_panel = document.getElementById("nine");
}

/**
* set the board to the default values
**/
function setBoard () {
	one = one_panel;
	two = two_panel;
	three = three_panel;
	four = four_panel;
	five = five_panel;
	six = six_panel;
	seven = seven_panel;
	eight = eight_panel;
	nine = nine_panel;

	gameStart = false;
	player1Turn = true;

	square_based_combination1 = setPlayerWinCombination();
	square_based_combination2 = setPlayerWinCombination();
	console.log(square_based_combination1);

	location_of_combo1 = location_of_combo;
	location_of_combo2 = location_of_combo;
}

/**
* Set game mode to be either single (1) or multiplayer (2)
**/
function setGameOption() {
	var game_option_panel = document.getElementById("game_option");
	var one_player_panel = document.getElementById("single_player");
	var multi_player_panel = document.getElementById("multi_player");
	var game_mode; //1 for single, 2 for multiplayer

	$(one_player_panel).click(function() {
		game_mode = 1;
		$(game_option_panel).css("display", "none");
		setPlayerPiece(game_mode);
	});
	$(multi_player_panel).click(function() {
		game_mode = 2;
		gameStart = true;
		$(game_option_panel).css("display", "none");
		setPlayerPiece(game_mode);
	});
}

/**
* Set player's pieces
*
* @param game_mode: integer either 1 or 2 indicating if game is single player or multiplayer
**/
function setPlayerPiece(game_mode) {
	var choosePiece_panel = document.getElementById("choosePiece");
	var pieceX_panel = document.getElementById("pieceX");
	var pieceO_panel = document.getElementById("pieceO");

	$(choosePiece_panel).css("display", "block");
	$(pieceO_panel).click(function () {
		player1Piece = "o";
		player2Piece = "x";
		player1Turn = false;
		$(choosePiece_panel).css("display", "none");
		makeMove(game_mode);
	});
	$(pieceX_panel).click(function () {
		player1Piece = "x";
		player2Piece = "o";
		player1Turn = true;
		$(choosePiece_panel).css("display", "none");
		makeMove(game_mode);
	});
}

function newGame() {
	one_panel.innerHTML = "";
	two_panel.innerHTML = "";
	three_panel.innerHTML = "";
	four_panel.innerHTML = "";
	five_panel.innerHTML = "";
	six_panel.innerHTML = "";
	seven_panel.innerHTML = "";
	eight_panel.innerHTML = "";
	nine_panel.innerHTML = "";
	playGame();
}

/**
**/
function displayWinner(game_mode, playerNum, combo) {
	for (var i = 0; i < 3; i++) {
		$(combo[i]).css("background-color", "black");
		$(combo[i]).css("color", "white");
	}
	var win_panel = document.getElementById("win_panel");
	var win_message_panel = document.getElementById("win_message");
	$(win_panel).css("display", "block");
	var message;
	if (game_mode == 2) {
		message = "Player " + playerNum + " won";
	}
	else {
		message = "You have lost";
	}
	win_message_panel.innerHTML = message;
	$(win_panel).click(function () {
		$(win_panel).css("display", "none");
		for (var i = 0; i < 3; i++) {
			$(combo[i]).css("background-color", "#C17753");
			$(combo[i]).css("color", "black");
		}
		newGame();
	});
}

/**
**/
function checkWin(game_mode, selected_square_num) { 
	var length;
	var combo;
	selected_square_num -= 1; //due to array index starting at 0
	
	if (player1Turn) { //player1Turn set false when player 1 made valid move
		if (square_based_combination1[selected_square_num] != null) { 
			length = square_based_combination1[selected_square_num].length
			for (var i = 0; i < length; i++) {
				if (square_based_combination1[selected_square_num][i].getValid()) {
					combo = square_based_combination1[selected_square_num][i].getCombo();
					if (combo[0].textContent == player1Piece) {
						if (combo[1].textContent == player1Piece) {
							if (combo[2].textContent == player1Piece) {
								//win
								displayWinner(game_mode, 1, combo);
								console.log("win");
							}
						}	
					}
				}
			}
		}
	}
	else {
		if (square_based_combination2[selected_square_num] != null) { 
			length = square_based_combination2[selected_square_num].length
			for (var i = 0; i < length; i++) {
				if (square_based_combination2[selected_square_num][i].getValid()) {
					combo = square_based_combination2[selected_square_num][i].getCombo();
					if (combo[0].textContent == player2Piece) {
						if (combo[1].textContent == player2Piece) {
							if (combo[2].textContent == player2Piece) {
								//win
								displayWinner(game_mode, 2, combo);
								console.log("win");
							}
						}	
					}
				}
			}
		}
	}
}

/**
* Check if move is valid
*
* Check if the square/space has already been taken previously
**/
function validMove(selected_square) {
	if (selected_square) {
		return true;
	}
	return false;
}

/**
**/
function removeOpponentsWinCombination(selected_square_num) {
	selected_square_num -= 1; //due to lists starting from 0
	var length;
	if (player1Turn) {
		length = square_based_combination2[selected_square_num].length;
		for (var i = 0; i < length; i++) {	
			square_based_combination2[selected_square_num][i].setValidFalse();
		}
		square_based_combination2[selected_square_num] = null;
	}
	else {
		length = square_based_combination1[selected_square_num].length;
		for (var i = 0; i < length; i++) {	
			square_based_combination1[selected_square_num][i].setValidFalse();
		}
		square_based_combination1[selected_square_num] = null;
	}
}

/**
* Mark player's move onto the board
*
* @param selected_square: reference to the selected space to mark
**/
function updateBoard(game_mode, selected_square, selected_square_num) {
	if (player1Turn) {
		selected_square.innerHTML = player1Piece;
		removeOpponentsWinCombination(selected_square_num);console.log("num " + selected_square_num);
		checkWin(game_mode, selected_square_num);
		player1Turn = false;
	}
	else {
		selected_square.innerHTML = player2Piece;
		removeOpponentsWinCombination(selected_square_num);
		checkWin(game_mode, selected_square_num);
		player1Turn = true;
	}
}


/**
* Return the reference of the square/space selected (player's move) to mark
*
* Listen to player's move and return its reference (the square/space chosen)
**/
function gameActionListener(game_mode) {
	var selected_square; //reference to the selected square
	var selected_square_num; //selected square number
	
	$(one).click(function() {
		selected_square = one;
		one = null;
		selected_square_num = 1;
		console.log("1");
		if (validMove(selected_square)) {
			updateBoard(game_mode, selected_square, selected_square_num);
		}
	});
	$(two).click(function() {
		selected_square = two;
		two = null;
		selected_square_num = 2;
		console.log("2");
		if (validMove(selected_square)) {
			updateBoard(game_mode, selected_square, selected_square_num);
		}
	});
	$(three).click(function() {
		selected_square = three;
		three = null;
		selected_square_num = 3;
		console.log("3");
		if (validMove(selected_square)) {
			updateBoard(game_mode, selected_square, selected_square_num);
		}
	});
	$(four).click(function() {
		selected_square = four;
		four = null;
		selected_square_num = 4;
		console.log("4");
		if (validMove(selected_square)) {
			updateBoard(game_mode, selected_square, selected_square_num);
		}
	});
	$(five).click(function() {
		selected_square = five;
		five = null;
		selected_square_num = 5;
		console.log("5");
		if (validMove(selected_square)) {
			updateBoard(game_mode, selected_square, selected_square_num);
		}
	});
	$(six).click(function() {
		selected_square = six;
		six = null;
		selected_square_num = 6;
		console.log("6");
		if (validMove(selected_square)) {
			updateBoard(game_mode, selected_square, selected_square_num);
		}
	});
	$(seven).click(function() {
		selected_square = seven;
		seven = null;
		selected_square_num = 7;
		console.log("7");
		if (validMove(selected_square)) {
			updateBoard(game_mode, selected_square, selected_square_num);
		}
	});
	$(eight).click(function() {
		selected_square = eight;
		eight = null;
		selected_square_num = 8;
		console.log("8");
		if (validMove(selected_square)) {
			updateBoard(game_mode, selected_square, selected_square_num);
		}
	});
	$(nine).click(function() {
		selected_square = nine;
		nine = null;
		selected_square_num = 9;
		console.log("9");
		if (validMove(selected_square)) {
			updateBoard(game_mode, selected_square, selected_square_num);
		}
	});
}

/**
*
*
* @param game_mode: integer either 1 or 2 indicating if game is single player or multiplayer
**/
function player_vs_computer(game_mode) {
	if (player1Turn) {
		gameActionListener(game_mode);
	}
}

/**
*
*
**/
function makeMove(game_mode) {
	console.log("making move");
	if (game_mode == 1) {
		player_vs_computer(game_mode);
	}
	else if (game_mode == 2) {	
		gameActionListener(game_mode);
	}
}

/**
*
*
**/
function playGame() {
	setBoard();
	setGameOption(); 
}

$(document).ready(function() {
	var gameStart = false;
	var selected_square;
	var player1Turn = true;
	var player1Piece; //'x' or 'o'
	var player2Piece; //'x' or 'o'
	var square_based_combination1;
	var square_based_combination2;
	var location_of_combo1;
	var location_of_combo2;

	setSquareReferences();

	playGame();
});