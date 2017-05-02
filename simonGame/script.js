$(document).ready(function() {
	/********************/
	//References to html Elements
	var green_button = document.getElementById("green");
	var red_button = document.getElementById("red");
	var blue_button = document.getElementById("blue");
	var yellow_button = document.getElementById("yellow");

	var switch_button = document.getElementById("switch");
	var start_button = document.getElementById("start");
	var count_button = document.getElementById("count");
	/********************/
	
	/********************/
	var color = [blue_button, green_button, red_button, yellow_button];
	var isOn = false;
	/********************/

	$(switch_button).click(function() {
		isOn = isOn == false ? true : false;
		console.log(isOn); 
	});

});