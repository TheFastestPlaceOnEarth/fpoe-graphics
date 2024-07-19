// Util functions taken from https://github.com/nicnacnic/speedcontrol-layouts/blob/main/graphics/js/layouts/intermission.js

let runDataActiveRun = nodecg.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
let runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');

NodeCG.waitForReplicants(runDataActiveRun, runDataArray).then(loadFromSpeedControl);

function getNextRuns(runData, amount) {
	let nextRuns = [];
	let indexOfCurrentRun = findIndexInRunDataArray(runData);
	for (let i = 1; i <= amount; i++) {
		if (!runDataArray.value[indexOfCurrentRun + i]) {
			break;
		}
		nextRuns.push(runDataArray.value[indexOfCurrentRun + i]);
	}
	return nextRuns;
}

function findIndexInRunDataArray(run) {
	let indexOfRun = -1;
	if (run) {
		for (let i = 0; i < runDataArray.value.length; i++) {
			if (run.id === runDataArray.value[i].id) {
				indexOfRun = i; break;
			}
		}
	}
	return indexOfRun;
}

function loadFromSpeedControl() {
	runDataActiveRun.on('change', (newVal, oldVal) => {
		refreshNextRunsData(newVal);
	});

	runDataArray.on('change', (newVal, oldVal) => {
		refreshNextRunsData(runDataActiveRun.value);
	});

}

function refreshNextRunsData(currentRun) {
	let nextRuns = getNextRuns(currentRun, 2);
    console.log(nextRuns);

    let upNextGameElement = $('#up-next-game');
    let upNextCategoryElement = $('#up-next-category');
    let upNextEstimateElement = $('#up-next-estimate');
    let upNextRunnerElement = $('#up-next-runner');
    let upNextPronounsElement = $('#up-next-pronouns');
    upNextGameElement.html(currentRun.game);
    upNextCategoryElement.html(currentRun.category);
    upNextEstimateElement.html(`${currentRun.estimate} ESTIMATE`);
    upNextRunnerElement.html(currentRun.teams[0].players.map((player) => player.name).join(', '));
    upNextPronounsElement.html(currentRun.teams[0].players.map((player) => player.pronouns).join(', '));

	let i = 0;
	for (let run of nextRuns) {
		if (i >= 2)
			break;

        let onDeckGameElement = $('#on-deck-game-' + (i + 1));
        let onDeckCategoryElement = $('#on-deck-category-' + (i + 1));
        let onDeckEstimateElement = $('#on-deck-estimate-' + (i + 1));
        let onDeckRunnerElement = $('#on-deck-runner-' + (i + 1));
        let onDeckPronounsElement = $('#on-deck-pronouns-' + (i + 1));
        onDeckGameElement.html(run.game);
        onDeckCategoryElement.html(run.category);
        onDeckEstimateElement.html(run.estimate);
        onDeckRunnerElement.html(run.teams[0].players.map((player) => player.name).join(', '));
        onDeckPronounsElement.html(run.teams[0].players.map((player) => player.pronouns).join(', '));

        i++;
	}
}

// Update commentary
const hostNameElement = $('#host-name');
const hostPronounsElement = $('#host-pronouns');
const commentaryRep = nodecg.Replicant('commentary');
commentaryRep.on('change', (newVal) => {
    if (newVal) {
        hostNameElement.html(newVal.hostName);
        hostPronounsElement.html(newVal.hostPronouns.toUpperCase());
    }
});