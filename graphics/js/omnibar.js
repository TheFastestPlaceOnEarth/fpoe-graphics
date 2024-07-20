var donoRep = nodecg.Replicant('donations', 'nodecg-tiltify');

donoRep.on('change', (newVal) => {
    if (newVal) {
        console.log(newVal);
    }
});