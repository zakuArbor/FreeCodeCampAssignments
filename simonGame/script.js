/*
THINGS TO DO:
-Add sounds
-Add timer 
-Strict mode
*/



var isOn = false;
var start = false;
var strict = false;
var count = 0;
var actions = [];
var playerActions = [];
var playerMove = 0;


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
	}
}


/**
* Checks if player played the correct action
*
* @param player_action_count: the current # of actions the player has currently played
* @param action: an action the player is suppose to replay at the moment
* @param playerAction: the latest action the player played 
**/
function checkActions(action, playerAction) {
	if (action.getColor() == playerAction.getColor()) {
		return true;
	}
	return false;
}


/**
* Play a single action
*
* @param actions: an action object
**/
function playAction(action) {
	action.playAction();
	setTimeout(function(){
        action.endAction();
   }, 1500);
}

/**
* Plays the sequence of actions to replay
*
* @param actions: a sequence of action objects
**/
function playSequence(actions) {
	for (var i = 0; i < actions.length; i++) {
		playAction(actions[i]);
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
	var id = Math.floor(Math.random() * 4);
	actions.push(possible_actions[id]);
	return 1;
}

/**
* Intializes all game parameters to it's default values
*
* @param count_button: reference to the count element
**/
function startGame(count_button) {
	start = false;
	count = 0;
	actions = [];
	playerActions = [];
	count_button.innerHTML = 0;
	playerMove = 0;
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
		playerMove = 0;
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
			count += createActionToSequence(actions, possible_actions);
			playSequence(actions);

			console.log(actions);
		}
	});

	$(red_button).mousedown(function() {
		console.log("down");
		red.playAction();
		if (!checkActions(red, actions[playerMove])) {
			falseMove(red);
		}
		playerMove++;
	});

	$(red_button).mouseup(function() {
		console.log("up");
		red.endAction();
	});
});