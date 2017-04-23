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
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");
var six = document.getElementById("six");
var seven = document.getElementById("seven");
var eight = document.getElementById("eight");
var nine = document.getElementById("nine");
/*******************/


function gameActionListener {
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
		}
	}
}