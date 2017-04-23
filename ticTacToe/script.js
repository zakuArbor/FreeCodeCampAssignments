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
/*******************/
//Copy of references of all possible square panels in the board
var one, two, three, four, five, six, seven, eight, nine;
/*******************/


var validMoves = [true, true, true, true, true, true, true, true, true];


/**
* Set up game to the default values
**/
function setupGame () {
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
*
*
*
**/
function updateBoard(selected_square, player1Turn) {

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
	});
	$(two).click(function() {
		selected_square = two;
	});
	$(three).click(function() {
		selected_square = three;
	});
	$(four).click(function() {
		selected_square = four;
	});
	$(five).click(function() {
		selected_square = five;
	});
	$(six).click(function() {
		selected_square = six;
	});
	$(seven).click(function() {
		selected_square = seven;
	});
	$(eight).click(function() {
		selected_square = eight;
	});
	$(nine).click(function() {
		selected_square = nine;
	});
	return selected_square;
}

$(document).ready(function() {
	var one_player_panel = document.getElementById("single_player");
	var multi_player_panel = document.getElementById("multi_player");
	var gameStart = false;
	var selected_square;
	var player1Turn = true;

	setupGame();

	var game_mode; //1 for single, 2 for multiplayer

	$(one_player_panel).click(function() {
		game_mode = 1;
		gameStart = true;
	});
	$(multi_player_panel).click(function() {
		game_mode = 2;
		gameStart = true;		
	});
	
	if (gameStart) {
		if (game_mode == 1) {

		}
		else if (game_mode == 2) {
			selected_square = gameActionListener(game_mode);
			if (validMove(selected_square)) {
				updateBoard(selected_square, player1Turn);
			}
		}
	}
}