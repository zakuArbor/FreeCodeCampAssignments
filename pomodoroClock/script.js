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
* @return 1 iff time > 1 and 0 iff time = 1	 
*/
function decrease_time (time) {
	if (time == 1) {
		return 0;
	}
	return 1;
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

$(document).ready(function() {
	var break_time = 1; //constraint: >= 1min
	var study_time = 1; //constraint: >= 1min

	/***************************************************************************/
	//panel references
	var increase_break_panel = document.getElementById("increase_break_time");
	var increase_study_panel = document.getElementById("increase_study_time"); 
	var decrease_break_panel = document.getElementById("decrease_break_time");
	var decrease_study_panel = document.getElementById("decrease_study_time");

	var display_break_setting_panel = document.getElementById("display_break_setting");
	var display_study_setting_panel = document.getElementById("display_study_setting");

	var current_status_panel = document.getElementById("current_status");
	var current_time_panel = document.getElementById("current_time");
	/***************************************************************************/


	/***************************************************************************/
	var current_time = study_time * 60;
	var current_status = "Study" //Study or Break
	var isStudyTime = true;
	var start_new_clock = true;

	var current_time = study_time * 60;
	var current_status = "Study" //Study or Break
	var isStudyTime = true;
	var start_new_clock = true;
	var isPaused = false;
	display_study_setting.innerHTML = study_time;
	display_break_setting.innerHTML = break_time;
	/***************************************************************************/

	/***************************************************************************/
	//Action listener for changing break/study time setting and pausing clock
	$(increase_study_panel).click(function() {
		study_time += 1;
		update_time_setting(display_study_setting, study_time);
	});

	$(increase_break_panel).click(function() {
		break_time += 1;
		update_time_setting(display_break_setting, break_time);
	});

	$(decrease_study_panel).click(function() {
		study_time -= decrease_time(study_time);
		update_time_setting(display_study_setting, study_time);
	});

	$(decrease_break_panel).click(function() {
		break_time -= decrease_time(break_time);
		update_time_setting(display_break_setting, break_time);
	});

	$(current_time_panel).click(function() {
		if (isPaused) {
			isPaused = false;
		}
		else {
			isPaused = true;	
		}
	});
	/***************************************************************************/

	var time_interval = setInterval(function(){
		if (!isPaused) {	
			if (start_new_clock) {
				current_status_panel.innerHTML = current_status;
				start_new_clock = false;
			}
			current_time -= 1; //decrement by 1 second for each second that passes
			var min = Math.floor((current_time/60) % 60); //min
			var sec = Math.floor(current_time % 60);

			current_time_panel.innerHTML = min + ":" + sec;

			if (current_time <= 0) {
				start_new_clock = true;
				if (isStudyTime) {
					current_time = break_time * 60;
					isStudyTime = false;
					current_status = "Break";	
				}
				else {
					current_time = study_time * 60;
					isStudyTime = true;
					current_status = "Study";
				} 
			} 
		}
	}, 1000);
});