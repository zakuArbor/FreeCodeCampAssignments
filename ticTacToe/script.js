

function Combination (combination_panels, combination_numbers) {
	this.valid = true;
	this.combo = combination_panels;
	this.combo_nums = combination_numbers;
} 

Combination.prototype = {
	constructor: Combination,
	getCombo:function() {
		return this.combo;
	},
	getValid:function() {
		return this.valid;
	},
	getComboNums:function() {
		return this.combo_nums;
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
var num_of_moves = 0;
/**
* Retrn a list of all possible winning combinations in tic tac toe
**/
function setPlayerWinCombination () {
	var possible_win_combination = 
	[
		[[one_panel, two_panel, three_panel], [1, 2, 3]], //0
		[[four_panel, five_panel, six_panel], [4, 5, 6]], //one_panel
		[[seven_panel, eight_panel, nine_panel], [7, 8, 9]], //two_panel
		[[one_panel, four_panel, seven_panel], [1, 4, 7]], //three_panel
		[[two_panel, five_panel, eight_panel], [2, 5, 8]], //four_panel
		[[three_panel, six_panel, nine_panel], [3, 6, 9]], //five_panel
		[[one_panel, five_panel, nine_panel], [1, 5, 9]], //six_panel
		[[three_panel, five_panel, seven_panel], [3, 5, 7]]  //seven_panel

	/*	[1, 2, 3], //0
		[4, 5, 6], //1
		[7, 8, 9], //2
		[1, 4, 7], //3
		[2, 5, 8], //4
		[3, 6, 9], //5
		[1, 5, 9], //6
		[3, 5, 7]  //7
	*/];
	var combo0 = new Combination(possible_win_combination[0][0], possible_win_combination[0][1]);
	var combo1 = new Combination(possible_win_combination[1][0], possible_win_combination[1][1]);
	var combo2 = new Combination(possible_win_combination[2][0], possible_win_combination[2][1]);
	var combo3 = new Combination(possible_win_combination[3][0], possible_win_combination[3][1]);
	var combo4 = new Combination(possible_win_combination[4][0], possible_win_combination[4][1]);
	var combo5 = new Combination(possible_win_combination[5][0], possible_win_combination[5][1]);
	var combo6 = new Combination(possible_win_combination[6][0], possible_win_combination[6][1]);
	var combo7 = new Combination(possible_win_combination[7][0], possible_win_combination[7][1]);

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


function getSpacePanel (selected_square_num) {
	switch(selected_square_num) {
		case 1:
			return one;
			break;
		case 2:
			return two;
			break;
		case 3:
			return three;
			break;
		case 4:
			return four;
			break;
		case 5:
			return five;
			break;
		case 6:
			return six;
			break;
		case 7:
			return seven;
			break;
		case 8:
			return eight;
			break;
		case 9:
			return nine;
			break;
	} 
}

function setSpacePanelNull (selected_square_num) {
	switch(selected_square_num) {
		case 1:
			one = null;
			break;
		case 2:
			two = null;
			break;
		case 3:
			three = null;
			break;
		case 4:
			four = null;
			break;
		case 5:
			five = null;
			break;
		case 6:
			six = null;
			break;
		case 7:
			seven = null;
			break;
		case 8:
			eight = null;
			break;
		case 9:
			nine = null;
			break;
	} 
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

	num_of_moves = 0;

	square_based_combination1 = setPlayerWinCombination();
	square_based_combination2 = setPlayerWinCombination();

	location_of_combo1 = location_of_combo;
	location_of_combo2 = location_of_combo;


	playedFirstMove1 = false;
	playedFirstMove2 = false;

	previous_move_num1 = "";
	previous_move_num2 = "";
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

/**
* Clear board and start a new game (next transition)
**/
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
* Display winning message
*
* Display winning message and transit to a new game if player clicks the message or the board itself
*
* @param game_mode: 1 if single player, 2 for multiplayer
* @param selected_square: reference to the selected space to mark
* @param combo: an array that contains references to space/square that allowed the player to win 
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
	else if (game_mode == 1 && playerNum == 1) {
		message = "You have won";
	}
	else {
		message = "You have lost"
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

function drawMessage() {
	var win_panel = document.getElementById("win_panel");
	var win_message_panel = document.getElementById("win_message");
	$(win_panel).css("display", "block");
	win_message_panel.innerHTML = "It was a Draw";
	$(win_panel).click(function () {
		$(win_panel).css("display", "none");
		newGame();
	});
}

/**
* Check if player wins based on their recent move
*
* Does not return anything but heads to the winning state (displayWInner) if player won
*
* @param game_mode: 1 if single player, 2 for multiplayer
* @param selected_square: reference to the selected space to mark
**/
function checkWin(game_mode, selected_square_num) { 
	var length;
	var combo;
	var won = false;
	selected_square_num -= 1; //due to array index starting at 0
	
	if (player1Turn) {
		if (playedFirstMove1) {
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
									won = true;
									console.log("win");
								}
							}	
						}
					}
				}
			}
		}
		playedFirstMove1 = true;
	}
	else {
		if (playedFirstMove2) {
			if (square_based_combination2[selected_square_num] != null) { 
				length = square_based_combination2[selected_square_num].length
				for (var i = 0; i < length; i++) {
					if (square_based_combination2[selected_square_num][i].getValid()) { 
						//console.log(square_based_combination2[selected_square_num][i]);
						//console.log("-");
						//console.log(square_based_combination2[selected_square_num]);
						combo = square_based_combination2[selected_square_num][i].getCombo();
						if (combo[0].textContent == player2Piece) {
							if (combo[1].textContent == player2Piece) {
								if (combo[2].textContent == player2Piece) {
									//win
									won = true;
									displayWinner(game_mode, 2, combo);
									console.log("win");
								}
							}	
						}
					}
				}
			}
		}
		playedFirstMove2 = true;
	}
	if (!won && num_of_moves == 9) {
		drawMessage();
	}
}

/**
* Check if move is valid
*
* Check if the square/space has already been taken previously
*
* @param selected_square: reference to the selected space to mark if valid
**/
function validMove(selected_square) {
	if (selected_square) {
		return true;
	}
	return false;
}

/**
* Removes opponent's possible winning combinations based on the player's move
*
* @param selected_square_num: integer representing space to mark
**/
function removeOpponentsWinCombination(selected_square_num) {
	selected_square_num -= 1; //due to lists starting from 0
	var length;
	if (player1Turn) {
		if (square_based_combination2[selected_square_num] != null) {
			length = square_based_combination2[selected_square_num].length;
			for (var i = 0; i < length; i++) {	
				square_based_combination2[selected_square_num][i].setValidFalse();
			}
			//console.log(square_based_combination2);
			square_based_combination2[selected_square_num] = null;
		}
	}
	else {
		if (square_based_combination1[selected_square_num] != null) {
			length = square_based_combination1[selected_square_num].length;
			for (var i = 0; i < length; i++) {	
				square_based_combination1[selected_square_num][i].setValidFalse();
			}
			//console.log(square_based_combination1);
			square_based_combination1[selected_square_num] = null;
		}
	}
}

/**
* Mark player's move onto the board
*
* @param game_mode: 1 if single player, 2 for multiplayer
* @param selected_square: reference to the selected space to mark
* @param selected_square_num: integer representing space to mark
**/
function updateBoard(game_mode, selected_square, selected_square_num) {
	num_of_moves++;
	console.log("on updateBoard");
	console.log();
	if (player1Turn) {
		previous_move_num1 = selected_square_num;
		console.log(player1Piece);
		console.log("player 1 placed on " + selected_square_num);
		selected_square.innerHTML = player1Piece;
		removeOpponentsWinCombination(selected_square_num);
		checkWin(game_mode, selected_square_num);
		player1Turn = false;
		console.log("end of player 1");
		if (game_mode == 1) {
			player_vs_computer(game_mode);
		}
	}
	else if (!player1Turn) {
		previous_move_num2 = selected_square_num;
		console.log("player 2 placed on " + selected_square_num);
		selected_square.innerHTML = player2Piece;
		removeOpponentsWinCombination(selected_square_num);
		checkWin(game_mode, selected_square_num);
		player1Turn = true;
		console.log("end of player 2");
		if (game_mode == 1) {
			player_vs_computer(game_mode);
		}
	}
}


function displayStatus() {
	console.log(one);
	console.log(two);
	console.log(three);
	console.log(four);
	console.log(five);
	console.log(six);
	console.log(seven);
	console.log(eight);
	console.log(nine);
}

/**
* Return the reference of the square/space selected (player's move) to mark
*
* Listen to player's move and return its reference (the square/space chosen)
*
* @param game_mode: 1 if single player, 2 for multiplayer
**/
function gameActionListener(game_mode) {
	var selected_square; //reference to the selected square
	var selected_square_num; //selected square number
	
	$(one).click(function() {
		selected_square = one;
		//console.log(selected_square);
		
		one = null;
		selected_square_num = 1;
		console.log("clicked 1");
		//console.log(selected_square);
		if (validMove(selected_square)) {
			//console.log("valid");
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
		console.log(six);
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

function computerMove(game_mode) {
	var selected_square = five;
	if (validMove(five)) {
			five = null;
			updateBoard(game_mode, selected_square, 5);
	}
	else {
		console.log("computer moves");

		previous_move_num1 -= 1;	//since arrays start from 0
		var priorityCombo; //the combo that will lead the opponent to most likely win based on his most recent action
		var priority_remaining_space = 3; //the least number of moves left for opponent to win
		var num_of_remaining_space = 3; //the remaining tiles
		var combo, combo_nums;
		var madeMove = false;
		combo = [];
		

		if (!madeMove && square_based_combination2[previous_move_num2] != null) { //action that opitmizes winning
			console.log("find computer's next move to win");
			//console.log(square_based_combination2[previous_move_num2]);
			var length = square_based_combination2[previous_move_num2].length;
			for (var i = 0; i < length; i++) {
				if (square_based_combination2[previous_move_num2][i].getValid()) {
					combo = square_based_combination2[previous_move_num2][i].getCombo();
					combo_nums = square_based_combination2[previous_move_num2][i].getComboNums();
					num_of_remaining_space = 3;
					if (combo[0].textContent == player1Piece) {
						num_of_remaining_space -=1;console.log("add");
					}
					if (combo[1].textContent == player1Piece) {
						num_of_remaining_space -=1;console.log("add");
					}
					if (combo[2].textContent == player1Piece) {
						num_of_remaining_space -=1; console.log("add");
					}	
					if (num_of_remaining_space < priorityCombo) {
						priorityCombo = combo;
						priority_remaining_space = num_of_remaining_space;
					}
					if (priority_remaining_space <= 1) {
						for (var i = 0; i < 3; i++) {
							selected_square = getSpacePanel(combo_nums[i]);
							if (validMove(selected_square)) {
								setSpacePanelNull (combo_nums[i]);
								updateBoard(game_mode, selected_square, combo_nums[i]);
								madeMove = true;
								break;
							}
						}
						break;
					}
				}
			}
		}
		priorityCombo = 3; //reset the least number of moves for opponent to win
		if (!madeMove && square_based_combination1[previous_move_num1] != null) { //make action to prevent oppoenent to win
			console.log("find computer's next move to prevent losing");
			//console.log(square_based_combination1[previous_move_num1]);
			var length = square_based_combination1[previous_move_num1].length;
			for (var i = 0; i < length; i++) {
				if (square_based_combination1[previous_move_num1][i].getValid()) {
					combo = square_based_combination1[previous_move_num1][i].getCombo();
					combo_nums = square_based_combination1[previous_move_num1][i].getComboNums();
					num_of_remaining_space = 3;
					if (combo[0].textContent == player1Piece) {
						num_of_remaining_space -=1;
					}
					if (combo[1].textContent == player1Piece) {
						num_of_remaining_space -=1;
					}
					if (combo[2].textContent == player1Piece) {
						num_of_remaining_space -=1;
					}	
					if (num_of_remaining_space < priorityCombo) {
						priorityCombo = combo;
						priority_remaining_space = num_of_remaining_space;
					}
					if (priority_remaining_space <= 1) {
						break;
					}
				}
			}
			if (combo.length > 0) {
				for (var i = 0; i < 3; i++) {
					selected_square = getSpacePanel(combo_nums[i]);
					if (validMove(selected_square)) {
						setSpacePanelNull (combo_nums[i]);
						updateBoard(game_mode, selected_square, combo_nums[i]);
						madeMove = true;
						break;
					}
				}
			}
		}
		
		
		if (!madeMove) { //if algorithm fails to find the best move to win or prevent opponent to win
			console.log("making new move linearly");
			for (var i = 1; i <= 9; i++) {
				selected_square = getSpacePanel(i);
				if (validMove(selected_square)) {
					setSpacePanelNull(i);
					updateBoard(game_mode, selected_square, i);
					madeMove = true;
					break;
				}	
			}
		}		
	}
}


/**
*
*
* @param game_mode: integer either 1 or 2 indicating if game is single player or multiplayer
**/
function player_vs_computer(game_mode) {
	console.log(player1Turn);
	console.log(player1Piece);
	console.log(game_mode);
	
	if (player1Turn) { //player 1 is always human player
		//console.log("player1 turn");
		gameActionListener(game_mode);
	}
	else if (!player1Turn) {//console.log("test");
		computerMove(game_mode);
	}
}

/**
* Direct to the appropiate method to make move depending on game mode
*
* @param game_mode: 1 if single player, 2 for multiplayer
**/
function makeMove(game_mode) {
	//console.log("making move");
	//console.log(player1Piece);
	//console.log(game_mode);
	if (game_mode == 1) {
		player_vs_computer(game_mode);
	}
	else if (game_mode == 2) {	
		gameActionListener(game_mode);
	}
}

/**
* Play game
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
	var previous_move_num1; //the space number on the most recent move made made by player 1
	var previous_move_num2; //the space number on the most recent move made made by player 2
	
	var playedFirstMove1 = false;
	var playedFirstMove2 = false;

	setSquareReferences();

	playGame();
});