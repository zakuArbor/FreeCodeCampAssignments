/**
* @author	Ju Hong Kim <nabimoon1234@gmail.com or juhong.kim@mail.utoronto.ca>
* @version	1
*/


var actions = []; //a queue of operation to do	
var num_set = false; //if the previous action/input was a number
var operation_set = false; //if the previous action/input was an arithmetric operation or a functional operation
var print = ""; //print number or operation symbol

/**
* Compute mathematical statement and print its result 
*
* @param result	reference to result id   	 
*/
function calc_statement (result) {
	var result_num = actions[0];
	console.log(actions);
	var need_addition = false;
	for (var i = 1; i < actions.length; i+=2) {
		if (actions[i] == "+" || actions[i] == "-") {
			need_addition = true;
			break;
		}
		else {
			if (actions[i] == "*") {
				result_num *= actions[i+1];
			}
		}
	}
	print = result_num;
	result.innerHTML = print;

	//reset all flags and operation queue
	num_set = false;
	operation_set = false;
	actions = [];
}

/**
* Display user's input and display it on the result screen
*
* If input is a number, number gets appended to the result screen 
*
* @param result	reference to result id
* @param input	User's raw input (either a number or arithmetric operation)  	 
*/
function display_action (result, input) {
	var reg_num = /^\d*$/;
	if (input.match(reg_num)) {
		print += input;
		if (num_set == true) {
			var num = actions.pop();
			num += input;
			actions.push(num);
		}
		else {
			actions.push(input);
		}
		num_set = true;
		operation_set = false;
	}
	else {
		print += " " + input + " ";
		num_set = false;
		operation_set = true;
		actions.push(input);
	}
	if (result != null) {
		result.innerHTML = print;
	}
}

$(document).ready(function() {
	var result_num = 0; //result number after arithmetric operation
	var result = document.getElementById("result");
	/**
	1.a Set a
	2.b Set operator (ex. [+, -, *, /])
	3.c Set b
	4. Set operator including equal (ex. [+, -, *, /, =])  
	*/
	/*******************************************************/
	//Number Button References 
	var one = document.getElementById("one");
	var two = document.getElementById("two");
	var three = document.getElementById("three");
	var four = document.getElementById("four");
	var five = document.getElementById("five");
	var six = document.getElementById("six");
	var seven = document.getElementById("seven");
	var eight = document.getElementById("eight");
	var nine = document.getElementById("nine");
	var zero = document.getElementById("zero");
	/*******************************************************/

	/*******************************************************/
	//Operation Button References 
	var add = document.getElementById("add");
	var sub = document.getElementById("sub");
	var mult = document.getElementById("mult");
	var div = document.getElementById("div");
	var equal = document.getElementById("equal");
	/*******************************************************/ 
	
 	/*******************************************************/
	//Gather number input
	$(one).click(function() {
		display_action(result, "1");
	});
	$(two).click(function() {
		display_action(result, "2");
	});
	$(three).click(function() {
		display_action(result, "3");
	});
	$(four).click(function() {
		display_action(result, "4");
	});
	$(five).click(function() {
		display_action(result, "5");
	});
	$(six).click(function() {
		display_action(result, "6");
	});
	$(seven).click(function() {
		display_action(result, "7");
	});
	$(eight).click(function() {
		display_action(result, "8");
	});
	$(nine).click(function() {
		display_action(result, "9");
	});
	$(zero).click(function() {
		display_action(result, "0");
	});
	/*******************************************************/
	/*******************************************************/
	//Gather arithmetric operation input
	$(add).click(function() {
		if (num_set == true && operation_set == false) {
			display_action(result, "+");
		}
	});
	$(sub).click(function() {
		if (num_set == true && operation_set == false) {
			display_action(result, "-");
		}
	});
	$(mult).click(function() {
		if (num_set == true && operation_set == false) {
			display_action(result, "*");
		}
	});
	$(div).click(function() {
		if (num_set == true && operation_set == false) {
			display_action(result, "/");
		}
	});
	$(equal).click(function() {
		if (num_set == true && operation_set == false) {
			calc_statement(result);
		}
	});
	/*******************************************************/
	/*******************************************************/
	//Gather functional operation input
	/*
	$(ac).click(function() {
		actions.push("ac");
	});
	$(ce).click(function() {
		actions.push("ce");
	});
	*/
	/*******************************************************/
	
	
	
	
});