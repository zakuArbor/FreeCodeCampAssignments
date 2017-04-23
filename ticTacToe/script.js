var possible_win_combination = 
	[
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7], 
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7]
	];

/*******************/
//References to all possible square panels in the board
var one_panel = document.getElementById("one");
var two_panel = document.getElementById("two");
var three_panel = document.getElementById("three");
var four_panel = document.getElementById("four");
var five_panel = document.getElementById("five");
var six_panel = document.getElementById("six");
var seven_panel = document.getElementById("seven");
var eight_panel = document.getElementById("eight");
var nine_panel = document.getElementById("nine");
/*******************/
//References to all possible square panels in the board
var one_panel, two_panel, three_panel, four_panel, five_panel, six_panel, seven_panel, eight_panel, nine_panel;
/*******************/
//Copy of references of all possible square panels in the board
var one, two, three, four, five, six, seven, eight, nine;
/*******************/


var validMoves = [true, true, true, true, true, true, true, true, true];

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
*
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
* Mark player's move onto the board
*
* 
* @param selected_square: reference to the selected space to mark
* @param player1Turn: boolean value indicating if it's player 1's turn
**/
function updateBoard(selected_square) {
	if (player1Turn) {
		selected_square.innerHTML = player1Piece;
		player1Turn = false;
	}
	else {
		selected_square.innerHTML = player2Piece;
		player1Turn = true;
	}
}


/**
* Return the reference of the square/space selected (player's move) to mark
*
* Listen to player's move and return its reference (the square/space chosen)
*
* @return: reference to the selected space to mark
**/
function gameActionListener() {
	var selected_square; //reference to the selected square
	$(one).click(function() {
		selected_square = one;
		one = null;
		console.log("1");
		if (validMove(selected_square)) {
			updateBoard(selected_square);
		}
	});
	$(two).click(function() {
		selected_square = two;
		two = null;
		console.log("2");
		if (validMove(selected_square)) {
			updateBoard(selected_square);
		}
	});
	$(three).click(function() {
		selected_square = three;
		three = null;
		console.log("3");
		if (validMove(selected_square)) {
			updateBoard(selected_square);
		}
	});
	$(four).click(function() {
		selected_square = four;
		four = null;
		console.log("4");
		if (validMove(selected_square)) {
			updateBoard(selected_square);
		}
	});
	$(five).click(function() {
		selected_square = five;
		five = null;
		console.log("5");
		if (validMove(selected_square)) {
			updateBoard(selected_square);
		}
	});
	$(six).click(function() {
		selected_square = six;
		six = null;
		console.log("6");
		if (validMove(selected_square)) {
			updateBoard(selected_square);
		}
	});
	$(seven).click(function() {
		selected_square = seven;
		seven = null;
		console.log("7");
		if (validMove(selected_square)) {
			updateBoard(selected_square);
		}
	});
	$(eight).click(function() {
		selected_square = eight;
		eight = null;
		console.log("8");
		if (validMove(selected_square)) {
			updateBoard(selected_square);
		}
	});
	$(nine).click(function() {
		selected_square = nine;
		nine = null;
		console.log("9");
		if (validMove(selected_square)) {
			updateBoard(selected_square);
		}
	});
	return selected_square;
}

/**
*
*
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

	setSquareReferences();

	playGame();
});