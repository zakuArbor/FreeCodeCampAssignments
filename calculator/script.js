/**
* @author	Ju Hong Kim <nabimoon1234@gmail.com or juhong.kim@mail.utoronto.ca>
* @version	1
*/

/**
* Gather user's input that is a number and generates a string number by appending the input to the string 
*
* @param num	A string number to perform an arithemtric operation on  	 
* @return		An appeneded string number (ex. user input = "2" => "1" + "2" = "12")
*/
function gather_input (num) {
	/*******************************************************/
	//References to elements by ID
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
	//Gather number input
	$(one).click(function() {
		alert ($(one).text());
	});
	$(two).click(function() {
		alert ($(two).text());
	});
	$(three).click(function() {
		alert ($(three).text());
	});
	$(four).click(function() {
		alert ($(four).text());
	});
	$(five).click(function() {
		alert ($(five).text());
	});
	$(six).click(function() {
		alert ($(six).text());
	});
	$(seven).click(function() {
		alert ($(seven).text());
	});
	$(eight).click(function() {
		alert ($(eight).text());
	});
	$(nine).click(function() {
		alert ($(nine).text());
	});
	$(zero).click(function() {
		alert ($(zero).text());
	});
	/*******************************************************/
}

$(document).ready(function() {	
	var a, b; //numbers to perform arithmetric operation
	var result; //results from arithmetric operation 
	
	/**
	1.a Set a
	2.b Set operator (ex. [+, -, *, /])
	3.c Set b
	4. Set operator including equal (ex. [+, -, *, /, =])  
	*/

	gather_input();
});