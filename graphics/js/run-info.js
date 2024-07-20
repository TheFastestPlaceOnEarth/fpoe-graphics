'use strict';

// Element definitions (JQuery)
// Timer is handled in timer.js
const gameNameElement = $('#game-name');
const categoryElement = $('#game-category');
const platformElement = $('#game-platform');
const estimateElement = $('#game-estimate');
const runner1NameElement = $('#player1');
const runner1PronounsElement = $('#player1-pronouns');
const runner2NameElement = $('#player2');
const runner2PronounsElement = $('#player2-pronouns');
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
	runDataActiveRun.on('change', (newVal) => {
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
        runner1NameElement.html(runData.teams[0].players.map((player) => player.name).join(', '));
        runner1PronounsElement.html(runData.teams[0].players.map((player) => player.pronouns).join(', '));
        runner2NameElement.html(runData.teams[1].players.map((player) => player.name).join(', '));
        runner2PronounsElement.html(runData.teams[1].players.map((player) => player.pronouns).join(', '));
	}

    // Update commentary
    const commentaryRep = nodecg.Replicant('commentary');
    commentaryRep.on('change', (newVal) => {
        if (newVal) {
            hostNameElement.html(newVal.hostName);
            hostPronounsElement.html(newVal.hostPronouns.toUpperCase());
            
            comm1NameElement.html(newVal.comm1Name);
            comm1PronounsElement.html(newVal.comm1Pronouns.toUpperCase());
            if (newVal.comm1Name === '')
                document.getElementById('comm1-box').style.display = 'none';
            else
                document.getElementById('comm1-box').style.display = 'block';

            comm2NameElement.html(newVal.comm2Name);
            comm2PronounsElement.html(newVal.comm2Pronouns.toUpperCase());
            if (newVal.comm2Name === '')
                document.getElementById('comm2-box').style.display = 'none';
            else
                document.getElementById('comm2-box').style.display = 'block';

            comm3NameElement.html(newVal.comm3Name);
            comm3PronounsElement.html(newVal.comm3Pronouns.toUpperCase());
            if (newVal.comm3Name === '')
                document.getElementById('comm3-box').style.display = 'none';
            else
                document.getElementById('comm3-box').style.display = 'block';
        }
    });

});