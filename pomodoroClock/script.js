$(document).ready(function() {
	var break_time = 0.1; //min
	var study_time = 0.1; //min

	var increase_break_panel = document.getElementById("increase_break_time");
	var increase_study_panel = document.getElementById("increase_study_time"); 
	var decrease_break_panel = document.getElementById("decrease_break_time");
	var decrease_study_panel = document.getElementById("decrease_study_time");

	var display_break_setting_panel = document.getElementById("display_break_setting");
	var display_study_setting_panel = document.getElementById("display_study_setting");

	var current_status_panel = document.getElementById("current_status");
	var current_time_panel = document.getElementById("current_time");

	var current_time = study_time * 60;
	var current_status = "Study" //Study or Break
	var isStudyTime = true;
	var start_new_clock = true;


	var time_interval = setInterval(function(){ 
		if (start_new_clock) {
			current_status_panel.innerHTML = current_status;
			start_new_clock = false;
		}
		current_time -= 1; //decrement by 1 second for each second that passes
		var min = Math.floor((current_time/60) % 60); //min
		var sec = Math.floor(current_time % 60);
		console.log("start");
		console.log(current_time);

		current_time_panel.innerHTML = min + ":" + sec;

		if (current_time <= 0) {
			//clearInterval(time_interval);
			console.log("switch");
			console.log(current_time);
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
	}, 1000);
});