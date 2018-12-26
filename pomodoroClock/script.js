/**
* @author	Ju Hong Kim <nabimoon1234@gmail.com or juhong.kim@mail.utoronto.ca>
* @version	1
*/

/**
* Returns either a 1 or 0 to decrement depending on the current time setting 
*
* Purpose: Want to make sure that time can never be less than or equal to 0
*
* @param time: the variable that holds the current time amount to set for either break or study time	
* @return -1 iff time > 1 and 0 iff time = 1	 
*/
function decrease_time (time) {
	if (time == 1) {
		return 0;
	}
	return -1;
}

/**
* Display updated time setting
*
* @param panel: The DOM reference to the display id
* @param time: the variable that holds the current time amount to set for either break or study time
**/
function update_time_setting (panel, time) {
	panel.innerHTML = time;
}

/**
* Check if we can update clock to reflect the new session time of an activity (i.e. break or study) if the clock has not been started
*
* @param time: the variable that holds the current time amount to set for either break or study time
* @param current_time_panel: The DOM Reference to the clock
* @param start_new_clock: a boolean that indicates if there is a switch in the activity (break/study) mode to be done
* @return boolean: returns true iff the clock has not been started for the updated session
**/
function can_update_clock (start_new_clock, current_status, status) {
	if (current_status == status && start_new_clock) {
		return true;
	}
	return false;
}

/**
* Update the Pomodoro Clock
*
* @param current_time_panel: The DOM Reference to the clock
* @param current_time: The current time of the clock in seconds
**/
function update_clock (current_time_panel, current_time) {
	var min = Math.floor((current_time/60) % 60);
	var sec = Math.floor(current_time % 60);

	if (sec <= 9) {
		var sec = "0" + sec;
	}

	current_time_panel.innerHTML = min + ":" + sec;
}

function update(panel, time, start_new_clock, current_status, update_session, status) {
	update_time_setting(panel, time);

	if (can_update_clock(start_new_clock, current_status, status)) {
		update_session(time);
	}
}

/**
* 
* @param time_obj: an object that contains the reference of the session_time to update and the current_time
* @param value: the value to increment/decrement the session_time by
* @param current_time_panel: The DOM Reference to the clock
* @param start_new_clock: a boolean that indicates if there is a switch in the activity (break/study) mode to be done
* Note: Passing an object because primitive types are pass by values
**/
function update_time(time_obj, value, start_new_clock, current_status, update_session, status) {
	let status_prop = status + "_time";
	time_obj[status_prop] += value;

	if (can_update_clock(start_new_clock, current_status, status)) {
		time_obj.current_time = time_obj[status_prop] * 60;
		update_session(time_obj.current_time);
	}
}

$(document).ready(function() {
	//Keeping time in object to pass by reference
	var time_obj = {
		"break_time": 1, //constraint: >= 1min
		"study_time": 1, //constraint: >= 1min
		"current_time": 1 * 60
	};

	/***************************************************************************/
	//panel references
	var study_block = document.getElementById("study_block");
	var break_block = document.getElementById("break_block");

	var increase_break_panel = document.getElementById("increase_break_time");
	var increase_study_panel = document.getElementById("increase_study_time"); 
	var decrease_break_panel = document.getElementById("decrease_break_time");
	var decrease_study_panel = document.getElementById("decrease_study_time");

	var display_break_setting_panel = document.getElementById("display_break_setting");
	var display_study_setting_panel = document.getElementById("display_study_setting");
	var display_clock_panel = document.getElementById("display_clock");
	var current_status_panel = document.getElementById("current_status");
	var current_time_panel = document.getElementById("current_time");
	/***************************************************************************/

	var current_status = "study" //Study or Break
	var isStudyTime = true;
	var start_new_clock = true;
	var isPaused = true;
	var session_total_time = time_obj.current_time; //total study or break time
	var progress_time = 0; //% to fill in
	display_study_setting.innerHTML = time_obj.study_time;
	display_break_setting.innerHTML = time_obj.break_time;
	
	/***************************************************************************/
	//Display Initial Clock
	update_clock(current_time_panel, time_obj.current_time);

	/***************************************************************************/
	var update_session_clock = function (current_time_panel, time) {
		update_clock(current_time_panel, time);
	}

	var update_session = update_session_clock.bind(null, current_time_panel);

	/***************************************************************************/
	//Action listener for changing break/study time setting and pausing clock
	$(increase_study_panel).click(function() {
		update_time(time_obj, 1, start_new_clock, current_status, update_session, this.className);
		update_time_setting(display_study_setting, time_obj.study_time);
	});

	$(decrease_study_panel).click(function() {
		update_time(time_obj, decrease_time(time_obj.study_time), start_new_clock, current_status, update_session, this.className);
		update(display_study_setting, time_obj.study_time);
	});

	$(increase_break_panel).click(function() {
		update_time(time_obj, 1, start_new_clock, current_status, update_session, this.className);
		update(display_break_setting, time_obj.break_time);
	});

	$(decrease_break_panel).click(function() {
		update_time(time_obj, decrease_time(time_obj.break_time), start_new_clock, current_status, update_session, this.className);
		update_time_setting(display_break_setting, time_obj.break_time);
	});


	$(display_clock_panel).click(function() {
		if (isPaused) {
			isPaused = false;
			start_new_clock = false;
		}
		else {
			isPaused = true;	
		}
	});

	/***************************************************************************/

	var time_interval = setInterval(function(){
		if (!isPaused) {	
			if (start_new_clock) {
				$(display_clock_panel).css("color", "white");
				if (isStudyTime) {
					$(display_clock_panel).css("border-color", "#32CD32");
				}
				else {
					$(display_clock_panel).css("border-color", "#FF0009");
				}
				current_status_panel.innerHTML = current_status;
				update_clock(current_time_panel, time_obj.current_time);
				start_new_clock = false;
			}
			time_obj.current_time -= 1; //decrement by 1 second for each second that passes

		
			update_clock(current_time_panel, time_obj.current_time);
			console.log(time_obj.current_time);
			if (time_obj.current_time <= 0) {
				start_new_clock = true;
				var snd = new Audio("alarm.mp3"); // buffers automatically when created
				snd.play();
				if (isStudyTime) {
					time_obj.current_time = time_obj.break_time * 60;
					isStudyTime = false;
					current_status = "break";	
				}
				else {
					time_obj.current_time = time_obj.study_time * 60;
					isStudyTime = true;
					current_status = "study";
				} 
			}
		}
	}, 1000);
});
