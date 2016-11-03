var openurl = require('openurl');
var program = require('commander');
var fs = require('fs');
var path = require('path');
var shelljs = require('shelljs/global');
var prompt = require('prompt');
var exec = require('child_process').exec,
    npm_install, npm_start, clone;

var DRINKME_FILE = path.join(__dirname, '../shared/drinkme.txt');
var LOGO_FILE = path.join(__dirname, '../shared/tableaulogo.txt');


/*
 * Opens the developer portal in user's default browser
 * Uses the npm openurl package
 */
function openDataDevURL() {
    openurl.open("https://community.tableau.com/community/developers");
}

/*
 * Umm, who put this here? 
 */ 
function drinkMe() {
    fs.readFile(DRINKME_FILE, 'utf8', function(err, data) {
        if (err) throw err;

        console.log('\n' + data);
    });
}

/*
 * Goes to dropbox folder with all relevant TC DevTrack material
 */
function getTCContent() {
    openurl.open("http://tabsoft.co/tc16DataDevNPM");
}

/*
 * Downloads and installs the JS API and WDC SDK
 */
function getJSTools() {
    if (!which("git")) {
        console.log("Sorry, this script requires git");
        exit(1);
    }
    var schema = {
        name: 'response',
        description: 'Do you want to clone the tools? (y/n)',     // Prompt displayed to the user. 
        type: 'string',
        pattern: /^\s*(([yY](es)?)|([nN]o?))\s*$/,                  // Regular expression that input must be valid against. 
        message: 'Must be y or n', // Warning message to display if validation fails.   
        default: 'y',             // Default value to use if no value is entered. 
        required: true 
    };

    // customize our prompt message
    prompt.message = '';
    prompt.delimiter = '';
    prompt.start();
    prompt.get(schema, function (err, result) {
        if (result.response.toLowerCase()[0] != 'y') {
            return;
        }

        cloneRepo("https://github.com/tableau/webdataconnector",
              "webdataconnector",
              "http://tableau.github.io/webdataconnector/docs/");
        cloneRepo("https://github.com/tableau/js-api-examples",
                "js-api-examples",
                "https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api.htm");
  });
}

function startSimulator() {
    try {
        process.chdir('./webdataconnector');
        console.log('Installing npm modules required for Simulator...');
        npm_install = exec('npm install --production',
        function (error, stdout, stderr) {
            console.log(stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            console.log("Starting wdc simulator on port 8888...");
            console.log("Open http://localhost:8888/Simulator in a browser to view simulator.")
            npm_start = exec('npm start',
            function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        });
    }
    catch (err) {
        console.log('Error: ' + err);
        console.log('Are you missing the webdataconnector folder? If so please run "tc16 -T" first to clone the SDK');
    }
}

/*
 * Helper function that clones a repository from gitHub and opens the docs for it.
 */ 
function cloneRepo(repoURL, repoName, docsURL) {
    console.log("Cloning " + repoName + " repo...");
    clone = exec("git clone " + repoURL,
        function (error, stdout, stderr) {
            console.log(stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                console.log("Cloned the " + repoName + " repository, check out the docs to get started.\n")
                openurl.open(docsURL);
            }
        });
}

/*
 * Small blurb that prints when user just runs 'tableau' without any options
 */
function printHeader() {
    fs.readFile(LOGO_FILE, 'utf8', function(err, data) {
        if (err) throw err;

        console.log('\n' + data);
        console.log("tc16 is a simple command line interface for downloading Tableau\'s developer ");
        console.log("tools and content. There are also Python tools available via pip: ");
        console.log("'pip install tc16'. More can be found at http://developers.tableau.com.");

        program.outputHelp();        
    });    
}

// Using npm package commander to parse args and do coercion
// More info here: https://www.npmjs.com/package/commander
program
  .usage('[options]')
  .option('-d, --datadev', 'launches tableau developer documentation in your browser', openDataDevURL)
  .option('-D, --drinkme', 'who knows what this does or where it might lead you, don\'t delay', drinkMe)
  .option('-t, --tc16', 'takes you to all developer track content for TC16', getTCContent)
  .option('-T, --tools', 'clones the repositories for the Web Data Connector SDK and the JavaScript API', getJSTools)
  .option('-w, --wdc', 'installs and starts WDC simulator - requires webdataconnector SDK from tools command.', startSimulator)
  .parse(process.argv);

// argv has length of 2 when running 'tableau' CLI without any options
if (process.argv.length == 2) printHeader(); 
