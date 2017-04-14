/**
* @author	Ju Hong Kim <nabimoon1234@gmail.com or juhong.kim@mail.utoronto.ca>
* @version	1
*/


var actions = []; //a queue of operation to do	
var num_set = false; //if the previous action/input was a number
var operation_set = false; //if the previous action/input was an arithmetric operation or a functional operation
var result = document.getElementById("result");


/**
* Gather user's input that is a number and generates a string number by appending the input to the string 
*
* @param num	A string number to perform an arithemtric operation on  	 
* @return	An appeneded string number (ex. user actions.push("2" => "1" + "2" = "12")
*/
function generate_num (num, num_input) {
	return num + num_input;
}

function display_action (input) {

}

$(document).ready(function() {
	var result_num = 0; //result number after arithmetric operation
	var print = ""; //print number or operation symbol
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
	/*******************************************************/ 
	
 	/*******************************************************/
	//Gather number input
	$(one).click(function() {
		actions.push("1");
		num_set = true;
		operation_set = false;
		result.innerHTML = 1;
	});
	$(two).click(function() {
		actions.push("2");
		num_set = true;
		operation_set = false;
		result.innerHTML = 2;
	});
	$(three).click(function() {
		actions.push("3");
		num_set = true;
		operation_set = false;
		result.innerHTML = 3;
	});
	$(four).click(function() {
		actions.push("4");
		num_set = true;
		operation_set = false;
		result.innerHTML = 4;
	});
	$(five).click(function() {
		actions.push("5");
		num_set = true;
		operation_set = false;
		result.innerHTML = 5;
	});
	$(six).click(function() {
		actions.push("6");
		num_set = true;
		operation_set = false;
		result.innerHTML = 6;
	});
	$(seven).click(function() {
		actions.push("7");
		num_set = true;
		operation_set = false;
		result.innerHTML = 7;
	});
	$(eight).click(function() {
		actions.push("8");
		num_set = true;
		operation_set = false;
		result.innerHTML = 8;
	});
	$(nine).click(function() {
		actions.push("9");
		num_set = true;
		operation_set = false;
		result.innerHTML = 9;
	});
	$(zero).click(function() {
		actions.push("0");
		num_set = true;
		operation_set = false;
		result.innerHTML = 0;
	});
	/*******************************************************/
	/*******************************************************/
	//Gather arithmetric operation input
	$(add).click(function() {
		if (num_set == true && operation_set == false) {
			actions.push("add");
			console.log("actions");
			num_set = false;
			operation_set = true;
			result.innerHTML = "+";
		}
	});
	$(sub).click(function() {
		if (num_set == true && operation_set == false) {
			actions.push("sub");
			console.log("actions");
			num_set = false;
			operation_set = true;
			result.innerHTML = "-";
		}
	});
	$(mult).click(function() {
		if (num_set == true && operation_set == false) {
			actions.push("mult");
			console.log("actions");
			num_set = false;
			operation_set = true;
			result.innerHTML = "*";
		}
	});
	$(div).click(function() {
		if (num_set == true && operation_set == false) {
			actions.push("div");
			console.log("actions");
			num_set = false;
			operation_set = true;
			result.innerHTML = "/";
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