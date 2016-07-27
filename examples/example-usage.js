var lstToJSON = require('lst-to-json');

var lstHeaders = [
	{ header: "LAST_NAME", length: 35 },
	{ header: "FIRST_NAME", length: 20 },
	{ header: "MIDDLE_NAME", length: 20 },
	{ header: "NAME_SUFFIX", length: 3 },
	{ header: "BIRTH_YEAR", length: 4 },
	{ header: "GENDER", length: 1 }
];

// Reads in the lst, and outputs the JSON file
lstToJSON( {
	headers: lstHeaders,
	inputFile: 'someInput.lst',
	outputFile: 'someOutput.json'
});