/*
THINGS TO DO:
-Add sounds
-Add timer 
-Strict mode
*/

/**/
//Constants
var soundLength = 1500;
var maxReplayLength = 1500;
var timeDelayBetweenActions = 500;
var countUpdateDelay = 400;
var countErrorDelay = 1000;
/**/


var isOn = false;
var start = false;
var strict = false;
var playMove = false; //indicates if player can start replaying move
var count = 0;
var actions = [];
var playerActions = [];
var playerNumMove = 0;
var currentState = 0; //the current number of games that has been started 
var createNextAction = false;
var playedFalse = false;
var nextAction = false;
var playSequenceBool = false;


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
		this.pauseSound();
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

	if (actions.length > count) {
		playMove = false;
		return false;
	}

	if (action === undefined) {
		playedFalse = true;
		return false;
	}
  
	var actionCorrect;
	if (action.getColor() == playerAction.getColor()) {
		actionCorrect = true;
		//console.log("correct move");
	}
	else {
		actionCorrect = false;
		playedFalse = true;
		//console.log("incorrect move");
	}
	if (actionCorrect && (playerNumMove + 1) == actions.length) {
		//console.log("end of sequence add new seuqence needed");
		playMove = false;
		playerNumMove = 0;
		createNextAction = true;
		setTimeOut = true;
	}
		return actionCorrect;
}


/**
* Play a single action
*
* @param actions: an action object
* @param delay: number of milliseconds to delay the sound to start
* @param i:
* @param event: indicates if there is another action in the sequence after this current action
* @param state: the number of times a game has started when the function was called
**/
function playAction(action, delay, i, event, state) {
	playMove = false;
	
	setTimeout(function () {
		if (state != currentState) {
			console.log(state + "vs" + currentState);
			console.log("stop sound due to reset");
			return;
		}


		action.playAction();
		setTimeout(function(){
		//console.log("close playACtion " + action.sound_name);
	        action.endAction();
	        //playMove = true;
	        	
		if (event == "next") {
	        	console.log("plaing next action");
	        	playNextAction(i, state);
	        }    
	   	}, maxReplayLength);
	}, delay);
	
}


function updateCountPanel(count_panel, count){
	setTimeout(function() {
		count_panel.innerHTML = count;
	}, countUpdateDelay);
	
}

function updateCountPanelError(count_panel, count, state){
	displayError(count_panel);
	setTimeout(function() {
		updateCountPanel(count_panel, count)
		playSequence(actions, state);
		playerNumMove = 0;
	}, countErrorDelay);
	
}


function displayError(count_panel){
	count_panel.innerHTML = "!!!";
}

/*
* Play/replay the next action in the sequence to the player
*
* @param i: a counter for the action array that represents the position in the array of action objects
* @param state: the number of games that has been started at the moment when the whole play sequence was called
**/
function playNextAction(i, state) {
	i++;
	if (i < actions.length) {
		//console.log("next action");
		playAction(actions[i], timeDelayBetweenActions, i, "next", state);
	}
	else {
		console.log("at the last action");
    	playSequenceBool = false;
    	playMove = true;
		playerNumMove = 0;
	}

}

/**
* Plays the sequence of actions to replay
*
* @param actions: a sequence of action objects
**/
function playSequence(actions, state) {
	if (playSequenceBool == false) {
		playSequenceBool = true; //playSequence function is currently on
		var i = 0; //loop counter for the position in the actions list
		if (createNextAction || playedFalse) {
			setTimeout(function() {
				//console.log(actions[i].sound_name);
				playAction(actions[i], 0, 0, "next", state);
				createNextAction = false;
				playedFalse = false;	
				//playMove = true;
				console.log("time");
			}, 1500);
		}
		console.log("end of sequence");
		//playSequenceBool = false;
	}
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
	
	actions.push(possible_actions[id]);
	
	/**/
//	actions.push(possible_actions[0]);	
	/**/

	console.log(possible_actions[id].getColor());
	return 1;
}

/**
* Intializes all game parameters to it's default values
*
* @param count_panel: reference to the count element
* @param possible_actions: reference to the 4 possible action objects in the game
**/
function startGame(count_panel, possible_actions) {
	for (var i = 0; i < 4; i++) {
		possible_actions[i].endAction();
	}
	for (var i = 0; i < count; i++) {
		actions[i].endAction();
	}
	start = true;
	playMove = false;
	playedFalse = false;
	count = 0;
	actions = [];
	playerActions = [];
	count_panel.innerHTML = 0;
	playerNumMove = 0;
	createNextAction = true;
	playSequenceBool = false;
}

/**
* The next level of simon game 
*
* Once player completes the sequence, a new action will be added to the sequence
* and be played to the player to imitate
*
* @param possible_actions: an array of possible actions to add (each element in the array is an action object)
* @param count_panel: DOM reference to the count panel
*
* @var playedFalse: true iff player made a mistake in the sequence
* @var playerNumMove: indicates the number of successfull steps imitated in the sequence
**/
function nextMovesToReplay(possible_actions, count_panel, state) {	
	if (playedFalse == false) {		
		if (createNextAction) {
			playMove = false;
			console.log("next moves to replay");
			count += createActionToSequence(actions, possible_actions);
			updateCountPanel(count_panel, count);
			playSequence(actions, state);
			createNextAction = false;
			playerNumMove = 0;
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
* @param count_panel: reference to the count DOM
* @param possible_actions: an array of actions that are possible to be added to the seqence
*
* @var strict: boolean value indicating if the game mode is strict 
* @var actions: a sequences of actions that the player is to replay
* Note: @var is not a param but just a note on what the variables in the function means
**/
function falseMove(action, count_panel, possible_actions, state) {
	action.endAction();
	console.log(strict);
	if (strict) {
		displayError(count_panel);
		setTimeout(function(){
			 startGame(count_panel, possible_actions);
               		 start = true;
               	 	 count += createActionToSequence(actions, possible_actions);
        	         updateCountPanel(count_panel, count);
			 currentState++;
	                 playSequence(actions, currentState);
		}, countErrorDelay);
	}
	else {
		console.log("incorrect sequences");
		playMove = false;
		updateCountPanelError(count_panel, count, state);
	}
}

function offline (count_panel, possible_actions) {
	startGame(count_panel, possible_actions);
	start = false;
	playMove = false;
	strict = false;

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
	var strict_button = document.getElementById("strict");
	var count_panel = document.getElementById("count");
	var off_switch = document.getElementById("switch_off");
	var on_switch = document.getElementById("switch_on");
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
		if (isOn) {
			$(on_switch).removeClass("removeSwitch");
			$(off_switch).addClass("removeSwitch");
		}
		else {
			$(on_switch).addClass("removeSwitch");
			$(off_switch).removeClass("removeSwitch");
			offline(count_panel, possible_actions);
		}

		console.log(isOn); 
	});


	$(strict_button).click(function() {
		if (isOn) {
			strict = strict == false ? true : false;
			if (strict) {
				$(strict_button).removeClass("addShadow");
			}
			else {
				$(strict_button).addClass("addShadow");
			}
		}
		console.log(strict);
	});

	$(start_button).mousedown(function() {
		$(start_button).removeClass("addShadow");
		if (isOn) {
			console.log("start");
			startGame(count_panel, possible_actions);
			start = true;
			count += createActionToSequence(actions, possible_actions);
			updateCountPanel(count_panel, count);
			currentState++;
			playSequence(actions, currentState);
		}
	});

	$(start_button).mouseup(function() {
		$(start_button).addClass("addShadow");
	});

	/********************/
	$(red_button).mousedown(function() {
		console.log("red down**********************");
		if (playMove && start) {
			red.playAction();
			playedFalse = false;
			console.log(playerNumMove);
			if (playerNumMove < actions.length && checkActions(actions[playerNumMove], red) == false) {
				console.log("returned false");
				playedFalse = true;
				falseMove(red, count_panel, possible_actions, currentState);
			}
			setTimeout(function() {
				red.endAction();
			}, soundLength);
		}
	});

	$(red_button).mouseup(function() {
		console.log("up*************************************");
		if (start && playMove) {
			red.endAction();
			nextMovesToReplay(possible_actions, count_panel, currentState);
		}
	});

	$(blue_button).mousedown(function() {
		console.log("blue down*******************************");
		if (playMove && start) {
			blue.playAction();
			playedFalse = false;
			console.log(playerNumMove);

			if (checkActions(actions[playerNumMove], blue) == false) {
				console.log("returned false");
				playedFalse = true;
				falseMove(blue, count_panel, possible_actions, currentState);
			}

			setTimeout(function() {
				blue.endAction();
			}, soundLength);
		}
	});

	$(blue_button).mouseup(function() {
		console.log("up*************************************");
		if (start && playMove) {
			blue.endAction();
			nextMovesToReplay(possible_actions, count_panel, currentState);
		}
	});

	$(green_button).mousedown(function() {
		console.log("green down*********************************");
		if (playMove && start) {
			green.playAction();
			playedFalse = false;
			console.log(playerNumMove);

			if (checkActions(actions[playerNumMove], green) == false) {
				console.log("returned false");
				playedFalse = true;
				falseMove(green, count_panel, possible_actions, currentState);
			}

			setTimeout(function() {
				green.endAction();
			}, soundLength);
		}
	});

	$(green_button).mouseup(function() {
		console.log("up*************************************");
		if (start && playMove) {
			green.endAction();
			nextMovesToReplay(possible_actions, count_panel, currentState);
		}
	});

	$(yellow_button).mousedown(function() {
		console.log("yellow down****************************");
		if (playMove && start) {
			yellow.playAction();
			playedFalse = false;
			console.log(playerNumMove);

			if (checkActions(actions[playerNumMove], yellow) == false) {
				console.log("returned false");
				playedFalse = true;
				falseMove(yellow, count_panel, possible_actions, currentState);
			}

			setTimeout(function() {
				yellow.endAction();
			}, soundLength);
		}
	});

	$(yellow_button).mouseup(function() {
		console.log("up*************************************");
		if (start && playMove) {
			yellow.endAction();
			nextMovesToReplay(possible_actions, count_panel, currentState);
		}
	});
	/********************/
	
});
