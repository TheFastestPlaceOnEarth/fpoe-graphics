// Constants for the commentary control panel
const COMM1NAME = document.getElementById('comm1-name');
const COMM1PRONOUNS = document.getElementById('comm1-pronouns');
const COMM2NAME = document.getElementById('comm2-name');
const COMM2PRONOUNS = document.getElementById('comm2-pronouns');
const COMM3NAME = document.getElementById('comm3-name');
const COMM3PRONOUNS = document.getElementById('comm3-pronouns');
const HOSTNAME = document.getElementById('host-name');
const HOSTPRONOUNS = document.getElementById('host-pronouns');

// NodeCG Replicants
const commentaryRep = nodecg.Replicant('commentary');

function updateCommentary()
{
    commentaryRep.value = {
        comm1Name: COMM1NAME.value,
        comm1Pronouns: COMM1PRONOUNS.value,
        comm2Name: COMM2NAME.value,
        comm2Pronouns: COMM2PRONOUNS.value,
        comm3Name: COMM3NAME.value,
        comm3Pronouns: COMM3PRONOUNS.value,
        hostName: HOSTNAME.value,
        hostPronouns: HOSTPRONOUNS.value
    };

    console.log('Commentary replicant updated');
}