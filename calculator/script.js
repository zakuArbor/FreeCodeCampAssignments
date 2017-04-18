/**
* @author	Ju Hong Kim <nabimoon1234@gmail.com or juhong.kim@mail.utoronto.ca>
* @version	1
*/


var actions = []; //a queue of operation to do	
var num_set = false; //if the previous action/input was a number
var operation_set = false; //if the previous action/input was an arithmetric operation or a functional operation
var result_set = false; //if the result has been computed or not
var print = ""; //print number or operation symbol
var is_dot = false; //determines if a number is a decimal


/**
* Compute mathematical statement and return result 
*
* @param result	reference to result id   	 
*/
function calc_statement (result) {
	var result_num = parseFloat(actions[0]);
	if (actions.length == 1) {
		return actions.pop();
	}
	while (actions.length > 0) {
		if (actions[1] == "+" || actions[1] == "-") {
			if (actions[1] == "-") { 
				actions[2] = parseFloat(actions[2]) * -1;
			}
			actions.shift(); //removes i-1
			actions.shift(); //removes i
			result_num += parseFloat(calc_statement(result));
			break;
		} 
		else {
			if (actions[1] == "*") {
				result_num *= parseFloat(actions[1+1]);
			}
			else {
				result_num /= parseFloat(actions[1+1]);
			}
			//push result
			actions[2] = result_num;		
			//pop previous actions
			actions.shift();
			actions.shift();	
			if (actions.length == 1) {
				break;
			}
		}
	}
	return result_num;
}

/**
* Print the result from the mathematical statement 
*
* @param result	reference to result id
* @param a number that represents the result from the mathematical statement   	 
*/
function display_result (result, result_num) {
	result_set = true;
	print = result_num;
	result.innerHTML = print;

	//reset all flags and operation queue
	num_set = false;
	operation_set = false;
	actions = [result_num];
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
		if (result_set) {
			result_set = false;
			actions.pop();
			print = "";
		}

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
	else if (input == ".") {
		print += ".";
		is_dot = true;
		if (operation_set) {
			operation_set = false;
			actions.push(".");
		}
		else {
			var num = actions.pop();
			if (num == undefined) {
				num = "";
			}
			num += ".";
			actions.push(num);
		}
	}
	else {
		print += " " + input + " ";
		num_set = false;
		is_dot = false;
		result_set = false;
		operation_set = true;
		actions.push(input);
		console.log(parseFloat(".1"));
		console.log(actions);
	}
	if (result != null) {
		result.innerHTML = print;
	}
}

/**
* Clear either all inputs or a previous entry
* 
*
* @param result	reference to result id
* @param clear_type	either "ac" indicating clear everything from the calculator or "ce" to clear previous entry
*/
function clear_actions(result, clear_type) {
	if (clear_type == "ac") {
		num_set = false;
		operation_set = false;
		is_dot = false;
		result_set = false;
		actions = [];
		print = "";
	}
	if (clear_type == "ce") {
		if (actions.length > 0) { //prevents popping on an empty array
			var previous_entry = actions.pop();
			print = print.slice(0, print.length-1);
			if (operation_set) {
				operation_set = false;
				print = print.slice(0, print.length-2); //get rids of the " " + operation
			}
			else { //a number (or a '.')
				if (previous_entry == ".") {
					is_dot = false;
				}
				else if (previous_entry.length == 1) {
					num_set = false;
					if (actions.length > 1) { //to ensure that the first element in the array is not an operation
						operation_set = true;
					}
				}
			}
		}
	}
	result.innerHTML = print;
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
	var dot = document.getElementById("dot");
	/*******************************************************/

	/*******************************************************/
	//Arithmetric Operation Button References 
	var add = document.getElementById("add");
	var sub = document.getElementById("sub");
	var mult = document.getElementById("mult");
	var div = document.getElementById("div");
	var equal = document.getElementById("equal");
	/*******************************************************/ 

	/*******************************************************/
	//Functional Operation Button References 
	var clear_entry = document.getElementById("ce");
	var clear_all = document.getElementById("ac");
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
	$(dot).click(function() {console.log("test");
		if (is_dot == false) {
			display_action(result, ".");
		}
	});
	/*******************************************************/
	/*******************************************************/
	//MouseDown
	$(one).mousedown(function() {
		one.style.opacity = "0.5";
	});
	$(two).mousedown(function() {
		two.style.opacity = "0.5";
	});
	$(three).mousedown(function() {
		three.style.opacity = "0.5";
	});
	$(four).mousedown(function() {
		four.style.opacity = "0.5";
	});
	$(five).mousedown(function() {
		five.style.opacity = "0.5";
	});
	$(six).mousedown(function() {
		six.style.opacity = "0.5";
	});
	$(seven).mousedown(function() {
		seven.style.opacity = "0.5";
	});
	$(eight).mousedown(function() {
		eight.style.opacity = "0.5";
	});
	$(nine).mousedown(function() {
		nine.style.opacity = "0.5";
	});
	$(zero).mousedown(function() {
		zero.style.opacity = "0.5";
	});
	$(dot).mousedown(function() {console.log("test");
		if (is_dot == false) {
			dot.style.opacity = "0.5";
		}
	});
		$(add).mousedown(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			add.style.opacity = "0.5";
		}
	});
	$(sub).mousedown(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			sub.style.opacity = "0.5";
		}
	});
	$(mult).mousedown(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			mult.style.opacity = "0.5";
		}
	});
	$(div).mousedown(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			div.style.opacity = "0.5";
		}
	});
	$(equal).mousedown(function() {
		if ((num_set == true && operation_set == false)) {
			equal.style.opacity = "0.5";
		}
	});
	$(clear_all).mousedown(function() {
		clear_all.style.opacity = "0.5";
	});
	$(clear_entry).mousedown(function() {
		clear_entry.style.opacity = "0.5";
	});
	/*******************************************************/
	/*******************************************************/
	//Mouseup
	$(one).mouseup(function() {
		one.style.opacity = "1";
	});
	$(two).mouseup(function() {
		two.style.opacity = "1";
	});
	$(three).mouseup(function() {
		three.style.opacity = "1";
	});
	$(four).mouseup(function() {
		four.style.opacity = "1";
	});
	$(five).mouseup(function() {
		five.style.opacity = "1";
	});
	$(six).mouseup(function() {
		six.style.opacity = "1";
	});
	$(seven).mouseup(function() {
		seven.style.opacity = "1";
	});
	$(eight).mouseup(function() {
		eight.style.opacity = "1";
	});
	$(nine).mouseup(function() {
		nine.style.opacity = "1";
	});
	$(zero).mouseup(function() {
		zero.style.opacity = "1";
	});
	$(dot).mouseup(function() {console.log("test");
		if (is_dot == false) {
			dot.style.opacity = "1";
		}
	});
	$(add).mouseup(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			add.style.opacity = "1";
		}
	});
	$(sub).mouseup(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			sub.style.opacity = "1";
		}
	});
	$(mult).mouseup(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			mult.style.opacity = "1";
		}
	});
	$(div).mouseup(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			div.style.opacity = "1";
		}
	});
	$(equal).mouseup(function() {
		if ((num_set == true && operation_set == false)) {
			equal.style.opacity = "1";
		}
	});
	$(clear_all).mouseup(function() {
		clear_all.style.opacity = "1";
	});
	$(clear_entry).mouseup(function() {
		clear_entry.style.opacity = "1";
	});
	/*******************************************************/
	/*******************************************************/
	//Gather arithmetric operation input
	$(add).click(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			display_action(result, "+");
		}
	});
	$(sub).click(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			display_action(result, "-");
		}
	});
	$(mult).click(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			display_action(result, "*");
		}
	});
	$(div).click(function() {
		if ((num_set == true && operation_set == false) || (operation_set == false && result_set == true)) {
			display_action(result, "/");
		}
	});
	$(equal).click(function() {
		if ((num_set == true && operation_set == false)) {
			var result_num = calc_statement(result);
			display_result(result, result_num);
		}
	});
	/*******************************************************/
	/*******************************************************/
	//Gather functional operation input
	$(clear_all).click(function() {
		clear_actions(result, "ac");
	});
	$(clear_entry).click(function() {
		console.log("test ce");
		clear_actions(result, "ce");
	});
	/*******************************************************/
	
	
	
	
});