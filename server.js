const express = require('express')
const app = express();
var shuffle = require('shuffle-array');
var fs = require('fs');
var path = require('path');
var headerPath = path.join(__dirname, 'header.tex');
var footerPath = path.join(__dirname, 'footer.tex');

// Generates five columns with a span of 15 numbers in random order
function generateColumns() {
	// 1 - 15
	// 16 - 30
	// 31 - 45
	// 46 - 60
	// 61 - 75
	var columns = new Array(5);
	for (var i=0; i < 5; i++) {
		var offset = (i * 15) + 1;
		columns[i] = shuffle(Array.apply(null, {length: 15}).map(Number.call, function(x) {
			return x + offset;
		}));
	}
	return columns;
}

function generateLatex(columns) {
	var header = fs.readFileSync(headerPath, "utf8");
	var footer = fs.readFileSync(footerPath, "utf8");
	var tableRows = "";
	//  \Rand 	& \Rand    	 & \Rand	& \Rand    	 & \Rand		\\
	for (var i=0; i<15; i++) {
		for (var x=0; x<5; x++) {
			tableRows += columns[x][i];
			if (x < 4) {
				tableRows += " & ";
			} else {
				tableRows += " \\\\";
			}
		}
		// Add line separator on every 5th line
		if ((i + 1) % 5 == 0)
			tableRows += " \\hline";
		tableRows += "\n";
	}
	return header + tableRows + footer;
}

app.get('/', function(req, res) {
	require("latex")(generateLatex(generateColumns())).pipe(res);
});

app.listen(8000, function () {
  console.log('Listening.')
});

