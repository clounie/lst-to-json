// Node.js API modules
var fs = require('fs');

// Third-party modules
var byline = require('byline');
var transform = require('stream-transform');
var _ = { 
	trim: require( 'lodash.trim' ) 
};


var INPUT_FILE = 'input.lst';
var OUTPUT_FILE = 'output.json';
var headers = [];
var lineNumber = 0;

// Exported function
function lstToJSON ( options )
{
	options = options || {};
	if ( options.inputFile && typeof options.inputFile === 'string' ) {
		INPUT_FILE = options.inputFile;
	}
	if ( options.outputFile && typeof options.outputFile === 'string' ) {
		OUTPUT_FILE = options.outputFile;
	}
	headers = options.headers;
	if ( !headers || !headers.length ) {
		console.error( 'WARNING: no headers provided, cannot parse lst file.' );
	}

	// Process files
	var inputStream = byline(fs.createReadStream(INPUT_FILE, { encoding: 'utf8' }));
	var transformStream = transform( transformLstLine );
	var outputStream = fs.createWriteStream( OUTPUT_FILE );

	transformStream.on('error', function handleStreamError( err ) {
		console.error('Stream transform error @ ' + INPUT_FILE + ' line ' + lineNumber + ': ', err );

		// Don't pass on input if there's an error
		// If we stop it here, the file will never get written.
		transformStream.unpipe();
		transformStream.end();
	});
	inputStream.pipe(transformStream).pipe( outputStream );
}

// Utility - parses each line.
function transformLstLine ( line )
{
	var pos = 0;
	var obj = {};
	var str = line.toString();
	for ( var i = 0; i < headers.length; i++ )
	{
		obj[ headers[i].header ] = _.trim( str.substring( 0, headers[i].length ) );
		str = str.substring( headers[i].length );
	}
	lineNumber++;
	return ( JSON.stringify( obj ) + '\n' );
}

module.exports = lstToJSON;