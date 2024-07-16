'use strict';

// Element definitions (JQuery)
const timerElement = $('#timer');

$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// This is where the timer information is received.
	// The "change" event is triggered whenever the time changes or the state changes.
	var timer = nodecg.Replicant('timer', speedcontrolBundle);
	timer.on('change', (newVal, oldVal) => {
		if (newVal)
			updateTimer(newVal, oldVal);
	});
	
	// Sets the timer text and classes.
	function updateTimer(newVal, oldVal) {
		// Change class on the timer to change the colour if needed.
		// See the common.css file for more information.
		if (oldVal) timerElement.toggleClass('timer_'+oldVal.state, false);
		timerElement.toggleClass('timer_'+newVal.state, true);
		
		timerElement.html(newVal.time); // timer.html
	}
});