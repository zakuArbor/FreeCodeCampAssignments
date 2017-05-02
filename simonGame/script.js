/*
THINGS TO DO:
-Add sounds
-Add timer 
-Strict mode
*/

/**
*An object that is an action with a color and sound associated with it
*
* @param color_button: a reference to a color button
* @param sound: the name of the audo file
**/
function Action (color_button, sound) {
	this.color = color_button;
	this.sound = new Audio(sound);
} 

Action.prototype = {
	constructor: Action,
	playSound: function () {
		this.sound.play();
	},
	getColor: function () {
		return this.color;
	}
}


/**
* Checks if player played the correct action
*
* @param player_action_count: the current # of actions the player has currently played
* @param actions: an action the player is suppose to replay at the moment
* @param playerActions: the latest action the player played 
**/
function checkActions(actions, playerActions) {
	if (action.getColor() == playerAction.getColor()) {
		return true;
	}
	return false;
}

/**
* Creates a new action 
*
* Adds a new action to the series of actions that the player is supposed to replay
*
* @param actions: the array where the new action is to be added (the sequence of actions to replay)
* @color: an array of possible actions to add (each element in the array is an action object)
**/
function createActionToSequence(actions, color) {

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
	var color = [blue_button, green_button, red_button, yellow_button];
	var isOn = false;
	var start = false;
	var count = 0;
	var actions = [];
	var playerActions = [];
	/********************/

	$(power_button).click(function() {
		isOn = isOn == false ? true : false;
		console.log(isOn); 
	});

	$(start_button).click(function() {
		if (isOn) {
			start = true;
			count = 0;
			actions = [];
			console.log("start");
		}
	});
});