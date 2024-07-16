'use strict';

// Element definitions (JQuery)
// Timer is handled in timer.js
const gameNameElement = $('#game-name');
const categoryElement = $('#game-category');
const platformElement = $('#game-platform');
const estimateElement = $('#game-estimate');
const runnerNameElement = $('#player1');
const runnerPronounsElement = $('#player1-pronouns');
const comm1NameElement = $('#comm1');
const comm1PronounsElement = $('#comm1-pronouns');
const comm2NameElement = $('#comm2');
const comm2PronounsElement = $('#comm2-pronouns');
const comm3NameElement = $('#comm3');
const comm3PronounsElement = $('#comm3-pronouns');
const hostNameElement = $('#host');
const hostPronounsElement = $('#host-pronouns');

$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// This is where the information is received for the run we want to display.
	// The "change" event is triggered when the current run is changed.
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.on('change', (newVal, oldVal) => {
		if (newVal)
			updateSceneFields(newVal);
	});
	
	// Sets information on the pages for the run.
	function updateSceneFields(runData) {
        // Game information
		gameNameElement.html(runData.game);
		categoryElement.html(runData.category);
		platformElement.html(runData.system);
		estimateElement.html(runData.estimate);

        // Runner information
        runnerNameElement.html(runData.teams[0].players.map((player) => player.name).join(', '));
        runnerPronounsElement.html(runData.teams[0].players.map((player) => player.pronouns).join(', '));
	}

    // Update commentary
    const commentaryRep = nodecg.Replicant('commentary');
    commentaryRep.on('change', (newVal, oldVal) => {
        if (newVal)
            updateCommentary(newVal);
    });

    function updateCommentary(commentaryData) {
        comm1NameElement.html(commentaryData.comm1Name);
        comm1PronounsElement.html(commentaryData.comm1Pronouns.toUpperCase());
        comm2NameElement.html(commentaryData.comm2Name);
        comm2PronounsElement.html(commentaryData.comm2Pronouns.toUpperCase());
        comm3NameElement.html(commentaryData.comm3Name);
        comm3PronounsElement.html(commentaryData.comm3Pronouns.toUpperCase());
        hostNameElement.html(commentaryData.hostName);
        hostPronounsElement.html(commentaryData.hostPronouns.toUpperCase());
    }

});