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

	var current_time = study_time * 60;
	var current_status = "Study" //Study or Break
	var isStudyTime = true;
	var start_new_clock = true;
	var isPaused = true;
	var wasPaused = false; //similar to isPause but is a boolean value if a pause did happened in the past and not the current time
	var session_total_time = current_time; //total study or break time
	var progress_time = 0; //% to fill in
	display_study_setting.innerHTML = study_time;
	display_break_setting.innerHTML = break_time;
	/***************************************************************************/
	var min = Math.floor((current_time/60) % 60); //min
	var sec = Math.floor(current_time % 60);
	current_time_panel.innerHTML = min + ":" + sec;

	var html = "<p>" + current_status + "</p><br>";
	html += "<p>" + min + ":" + sec + "</p>";

	var circle = new ProgressBar.Circle("#display_clock", {
		strokeWidth: 4,
		color: '#FCB03C',
		//duration: current_time * 1000, //milliseconds
		easing: 'easeInOut',
		trailColor: '#F4F4F4',
		trailWidth: 2,
		svgStyle: null,
		text: {
    	autoStyleContainer: false,
    	color: '#FCB03C'
	    },
	    from: { color: '#aaa', width: 1 },
	    to: { color: '#333', width: 4 },
	    // Set default step function for all animate calls
	    step: function(state, circle) {
	    		circle.path.setAttribute('stroke', state.color);
	    		circle.path.setAttribute('stroke-width', state.width);
	    		var value = Math.round(circle.value() * 100);
	  }
	});

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
			//circle.animate(1.0, current_time);
		}
		else {
			console.log(progress_time);
			isPaused = true;	
			circle.animate(circle.value());
			//circle.set(circle.value());
		}
	});
	/***************************************************************************/
	
	var time_interval = setInterval(function(){
		if (!isPaused) {	
			if (start_new_clock) {
				circle.setText(html);
				start_new_clock = false;
				circle.set(0.0);
				//circle.animate(1.0, current_time * 1000);
				session_total_time = current_time;
			}
			current_time -= 0.5; //decrement by 1 second for each second that passes
			//progress_time = (session_total_time - current_time)/session_total_time;
			progress_time +=1;
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

	var draw_circle1 = setInterval(function(){
		if (!isPaused) {		
			current_time -= 0.5; //decrement by 1 second for each second that passes
			circle.animate((session_total_time-current_time)/session_total_time, 0);
		}
	}, 500);
});