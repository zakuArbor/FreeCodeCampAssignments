$(document).ready(function() {
	/********************/
	//References to html Elements
	var green_button = document.getElementById("green");
	var red_button = document.getElementById("red");
	var blue_button = document.getElementById("blue");
	var yellow_button = document.getElementById("yellow");

	var power_button = document.getElementById("switch");
	var start_button = document.getElementById("start");
	var count_button = document.getElementById("count");
	/********************/
	
	/********************/
	var color = [blue_button, green_button, red_button, yellow_button];
	var isOn = false;
	var start = false;
	var count = 0;
	var actions = [];
	var playersActions = [];
	/********************/

	$(power_button).click(function() {
		isOn = isOn == false ? true : false;
		console.log(isOn); 
	});

	$(start_button).click(){
		start = true;
		count = 0;
		actions = [];
		console.log("start");
	}

});