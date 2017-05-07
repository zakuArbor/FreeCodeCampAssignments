/*
THINGS TO DO:
-Add sounds
-Add timer 
-Strict mode
*/



var isOn = false;
var start = false;
var strict = false;
var playMove = false; //indicates if player can start replaying move
var count = 0;
var actions = [];
var playerActions = [];
var playerNumMove = 0;
var createNextAction = false;
var playedFalse = false;


/**
*An object that is an action with a color and sound associated with it
*
* @param color_button: a reference to a color button
* @param sound_name: the name of the audo file
**/
function Action (color_button, sound_name) {
	this.color = color_button;
	this.sound_name = sound_name;
	this.sound = new Audio(sound_name);
	this.sound.loop = true;	
} 

Action.prototype = {
	constructor: Action,
	playSound: function () {
		this.sound = new Audio(this.sound_name);
		this.sound.play();
	},
	getColor: function () {
		return this.color;
	},
	playAction: function () {
		$(this.color).addClass("playAction");
		this.playSound();
	},
	endAction: function () {
		$(this.color).removeClass("playAction");
		this.sound.pause();
	},
	pauseSound: function () {
		this.sound.pause();
	}
}


/**
* Checks if player played the correct action
*
* Return true iff the action the player played matches with the action in the sequence
*
* @param player_action_count: the current # of actions the player has currently played
* @param action: an action the player is suppose to replay at the moment
* @param playerAction: the latest action the player played 
* @return true iff the action is correct
**/
function checkActions(action, playerAction) {
	var setTimeOut = false;

	var actionCorrect;
	if (action.getColor() == playerAction.getColor()) {
		actionCorrect = true;
		console.log("correct move");
	}
	else {
		actionCorrect = false;
		playedFalse = true;
		console.log("incorrect move");
	}
	if (actionCorrect && (playerNumMove + 1) == actions.length) {
		console.log("end of sequence add new seuqence needed");
		playMove = 0;
		createNextAction = true;
		setTimeOut = true;
	}

	if (setTimeOut) {
		setTimeout(function() {
			action.endAction();
			playerAction.endAction();
			return actionCorrect;
		}, 1000);
	}
	else {
		return actionCorrect;
	}

}


/**
* Play a single action
*
* @param actions: an action object
**/
function playAction(action, delay) {
	playMove = false;
	setTimeout(function () {
		action.playAction();
		setTimeout(function(){
	        action.endAction();
	        playMove = true;
	   	}, 1500);
	}, delay);
}

/**
* Plays the sequence of actions to replay
*
* @param actions: a sequence of action objects
**/
function playSequence(actions) {
	if (createNextAction) {
		setTimeout(function() {
			console.log(actions[0].sound_name);
			playAction(actions[0], 0);

			for (var i = 1; i < actions.length; i++) { //i = 1 since the first action in the sequence is already played
				playAction(actions[i], 1750);			
			}
		
			createNextAction = false;
			playedFalse = false;	
			playMove = true;
		}, 1500);
	}
	console.log("end of sequence");
}


/**
* Creates a new action 
*
* Adds a new action to the series of actions that the player is supposed to replay
*
* @param actions: the array where the new action is to be added (the sequence of actions to replay)
* @possible_actions: an array of possible actions to add (each element in the array is an action object)
* @return returns 1 to be added to the count
**/
function createActionToSequence(actions, possible_actions) {
	console.log("add new action");
	var id = Math.floor(Math.random() * 4);
	
	//actions.push(possible_actions[id]);
	
	/**/
	actions.push(possible_actions[0]);	
	/**/

	console.log(possible_actions[id].getColor());
	return 1;
}

/**
* Intializes all game parameters to it's default values
*
* @param count_button: reference to the count element
**/
function startGame(count_button) {
	for (var i = 0; i < count; i++) {
		actions[i].endAction();
	}
	start = false;
	playMove = false;
	playedFalse = false;
	count = 0;
	actions = [];
	playerActions = [];
	count_button.innerHTML = 0;
	playerNumMove = 0;
	createNextAction = true;
}

/**
* The next level of simon game 
*
* Once player completes the sequence, a new action will be added to the sequence
* and be played to the player to imitate
*
* @possible_actions: an array of possible actions to add (each element in the array is an action object)
*
* @var playedFalse: true iff player made a mistake in the sequence
* @var playerNumMove: indicates the number of successfull steps imitated in the sequence
**/
function nextMovesToReplay(possible_actions) {	
	if (playedFalse == false) {		
		if (createNextAction) {
			playMove = false;
			console.log("next moves to replay");
			count += createActionToSequence(actions, possible_actions);
			playSequence(actions);
			createNextAction = false;
		}
		else {
			console.log("test");
			playerNumMove++;
			console.log(playerNumMove);
		}
	}
}

/**
* Guide gamepath to the appropriate path when user plays incorrect move
*
* If player plays wrong move:
*	1. If strict mode, reset game
*	2. Else, replay sequence to user
*
* @param action: an action object 
*
* @var strict: boolean value indicating if the game mode is strict 
* @var actions: a sequences of actions that the player is to replay
* Note: @var is not a param but just a note on what the variables in the function means
**/
function falseMove(action) {
	action.endAction();
	if (strict) {

	}
	else {
		console.log("incorrect sequences");
		playSequence(actions);
		playerNumMove = 0;
	}
}

$(document).ready(function() {
	/********************/
	//References to html Elements
	var green_button = document.getElementById("green");
	var red_button = document.getElementById("red");
	var blue_button = document.getElementById("blue");
	var yellow_button = document.getElementById("yellow");

	var power_button = document.getElementById("power");
	var start_button = document.getElementById("start");
	var count_button = document.getElementById("count");
	/********************/
	
	/********************/
	var blue = new Action(blue_button, "sound.wav");
	var green = new Action(green_button, "sound2.wav");
	var red = new Action(red_button, "sound3.wav");
	var yellow = new Action(yellow_button, "sound4.wav");
	var possible_actions = [blue, green, red, yellow];
	/********************/



	$(power_button).click(function() {
		isOn = isOn == false ? true : false;
		console.log(isOn); 
	});

	$(start_button).click(function() {
		if (isOn) {
			console.log("start");
			startGame(count_button);
			start = true;
			//count += createActionToSequence(actions, possible_actions);
			
			/**/
			count = 1;
			actions = [red]
			/**/

			playSequence(actions);

			console.log(actions);
		}
	});

	/********************/
	$(red_button).mousedown(function() {
		console.log("down");
		if (playMove) {
			red.playAction();
			playedFalse = false;
			console.log(playerNumMove);
			if (checkActions(actions[playerNumMove], red) == false) {
				console.log("returned false");
				playedFalse = true;
				falseMove(red);
			}
			var redInterval = setInterval(function() {
				red.endAction();
				console.log("pika");
				red.playAction();
			}, 1500);
		}
	});
	$(red_button).mouseup(function() {
		console.log("up*************************************");
		clearInterval(redInterval);
		red.endAction();
		nextMovesToReplay(possible_actions);
	});

	$(blue_button).mousedown(function() {
		console.log("down");
		if (playMove) {
			blue.playAction();
			playedFalse = false;
			console.log(playerNumMove);

			if (checkActions(actions[playerNumMove], blue) == false) {
				console.log("returned false");
				playedFalse = true;
				falseMove(blue);
			}
		}
	});

	$(blue_button).mouseup(function() {
		console.log("up*************************************");
		blue.endAction();
		nextMovesToReplay(possible_actions);
	});
	/********************/
	
});