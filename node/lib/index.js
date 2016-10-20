var openurl = require('openurl');
var program = require('commander');
var fs = require('fs');
var path = require('path');
var shelljs = require('shelljs/global');
var prompt = require('prompt');

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

/*
 * Helper function that clones a repository from gitHub and opens the docs for it.
 */ 
function cloneRepo(repoURL, repoName, docsURL) {
    console.log("----------" + repoName + "----------");
    if (exec("git clone " + repoURL).code !== 0) {
        console.log("Couldn\'t clone " + repoName + " repository.  Check if you already have it.");
        exit(1);
    }

    console.log("Cloned the " + repoName + " repository, check out the docs to get started.\n")
    openurl.open(docsURL);
}

/*
 * Small blurb that prints when user just runs 'tableau' without any options
 */
function printHeader() {
    fs.readFile(LOGO_FILE, 'utf8', function(err, data) {
        if (err) throw err;

        console.log('\n' + data);
        console.log("tableau is a simple command line interface for downloading Tableau\'s developer ");
        console.log("tools and content. There are also Python tools available via pip: ");
        console.log("'pip install tc16'. More can be found at http://developers.tableau.com.");

        program.outputHelp();        
    });    
}

// Using npm package commander to parse args and do coercion
// More info here: https://www.npmjs.com/package/commander
program
  .usage('[options]')
  .option('-d, --datadev', 'launches tableau developer documentation in you browser', openDataDevURL)
  .option('-D, --drinkme', 'who knows what this does or where it might lead you. don\'t delay', drinkMe)
  .option('-t, --tc16', 'takes you to all developer track content for TC16', getTCContent)
  .option('-T, --tools', 'installs all Tableau tools for JavaScript', getJSTools)
  .parse(process.argv);

// argv has length of 2 when running 'tableau' CLI without any options
if (process.argv.length == 2) printHeader(); 
