/**
 * Returns the next score in a tennis game given the player that scored.
 *
 * @see {@link http://tennis.about.com/cs/beginners/a/beginnerscore.htm}
 * @param {number[]} score - The current score, player 0 in position 0, player 1 in position 1
 * @param {number} playerIndex - The player that scored
 * @returns {number[]|false} - The new score, player 0 in position 0, player 1 in position 1, or false on any error
 */


function tennis(score, playerIndex) {
    // TODO: implement
	

    //ensure we have valid inputs
    var validScores = ['0','15','30','40','A'];
    if(score == null){
	    return false;
    }
    //Invalid player index
    if (playerIndex !=0 && playerIndex !=1){
	    return false;
    }

    //Invalid score array length
    if(score.length !=2){
	    return false;
    }

    //Invalid score number
    if (validScores.indexOf(score[0]) <= -1 ||validScores.indexOf(score[1]) <= -1){
	    return false;
    }

    //Check if our Advantage is valid
    if(score[0] == 'A'){
	    if(score[1] != '40'){
		    return false;
	    }
    }
    if(score[1] == 'A'){
	    if(score[0] != '40'){
		    return false;
	    }
    }


    //Ternary operator to find other index
    var otherIndex = (playerIndex == 0) ? 1 : 0; 


    switch(score[playerIndex]){
	    case '0':
		score[playerIndex] = '15';
		break;
	    case '15':
	    	score[playerIndex] = '30';
		break;
	    case '30':
	    	score[playerIndex] = '40';
		break;
            case '40':
		if(score[otherIndex] == '40'){
		    score[playerIndex] = 'A';
	    	} else if(score[otherIndex] == 'A'){
		    score[otherIndex] = '40';
		    score[playerIndex] = '40';
	    	} else if(score[otherIndex] != 'A' && score[otherIndex] != '40'){
		    score[playerIndex] = 'WIN';
	    	}
		break;
	    case 'A':
	    	score[playerIndex] = 'WIN';
		break;
    }
    return score;
}

function assert(score, expectedScore, description) {
    if (Array.isArray(score) && Array.isArray(expectedScore)) {
        if (score.length !== expectedScore.length) {
            console.log('FAIL TEST: ' + description);
            return false;
        }
        if (score[0] !== expectedScore[0] || score[1] !== expectedScore[1]) {
            console.log('FAIL TEST: ' + description);
            return false;
        }
    } else if (score !== expectedScore) {
        console.log('FAIL TEST: ' + description);
        return false;
    }

    console.log('PASS TEST: ' + description);
    return true;
}

function test() {
    assert(tennis(['0', '0'], 0), ['15', '0'], 'adds a point to the correct player');
    assert(tennis(['0', '40'], 1), ['0', 'WIN'], 'player can win from 40');
    assert(tennis(['40', '40'], 0), ['A', '40'], 'takes player to advantage');
    assert(tennis(['A','40'],0),['WIN','40'], 'A-40 ---> WIN-40');
    // TODO: add tests
    assert(tennis(['15','0'],0),['30','0'], '15-0 ---> 30-0');
    assert(tennis(['30','0'],0),['40','0'], '30-0 ---> 40-0');
    assert(tennis(['A','40'],1),['40','40'], 'A-40 ---> 40-40');
    assert(tennis(['0','0'],1),['0','15'],'0-0 ---> 0-15');
    assert(tennis(null, 0), false, 'Null Score');
    assert(tennis(['15'],0),false,'only one score');
    assert(tennis(['15','15'],2),false,'invalid playerIndex');
    assert(tennis(['A','15'],0),false,'invalid Advantage score');
    assert(tennis(['50','15'],1),false,'invalid score (I gave 50)');
}

/*function readTextFile(file){
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET",file,false);
	rawFile.onreadystatechange = function(){
		if(rawFile.readyState ===4){
			if(rawFile.status === 200 || rawFile.status == 0){
				var allText = rawFile.responseText;
				fileDisplayArea.innerText = allText
			}
		}
	}
	rawFile.send(null);
}
readTextFile("~/src/random_stuff/tennisQuestion/tennisinput.txt");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var fh = fso.OpenTextFile("C:\\output.txt", 1, false, 0);
var output = fh.ReadAll();
var reader = new FileReader();
reader.readAsText("~/src/random_stuff/tennisQuestion/tennisinput.txt");*/



/*

READING FILE STUFF
I'm yet to completely understand reading files in Javascipt.  I used a version of the solutions posted on this ( http://stackoverflow.com/questions/9168737/read-txt-file-using-node-js) stackoverflow question to read the file.
*/

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
	  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
	    process.exit(1);
}
// Read the file and print its contents.
var fs = require('fs')
  , filename = process.argv[2];
  fs.readFile(filename, 'utf8', function(err, data) {
	    if (err) throw err;
	      console.log('OK: ' + filename);
	        console.log(data)


/*

STUFF STARTS HERE

*/



		//split the data into lines
		var lines = data.split(/\r?\n/);

		//scores for the players and errorCount
		var score0 = 0;
		var score1 = 0;
		var errorCount = 0;
		for(var i=0;i<lines.length;i++)
		{
			var lineScore = ['0','0']
			for(var j=0;j<lines[i].length;j++)
			{
				lineScore = tennis(lineScore,lines[i].charAt(j));
				if(lineScore == false)
				{
					console.log('ERROR');
					errorCount++;
					break;
				}
				if(lineScore[0] == 'WIN')
				{
					console.log('WIN ' + 0 +' ' +j);
					score0++;
					break;
				}
				if(lineScore[1] == 'WIN')
				{
					console.log('WIN ' + 1+' ' + j);
					score1++;
					break;
				}
				if(j == lines[i].length-1)
				{
					console.log('TIE');
				}
			}
		}
		if(score0== score1)
		{
			console.log('X0' + errorCount);
		}
		else if(score0>score1)
		{
			var diff = score0-score1;
			console.log('0' + diff + errorCount);
		}
		else if(score1>score0)
		{
			var diff = score1-score0;
			console.log('1' + diff + errorCount);
		}
		
  });
module.exports = tennis;

if (require.main === module) {
    test();
}
