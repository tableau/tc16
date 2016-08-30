var openurl = require('openurl');
var program = require('commander');
var fs = require('fs');
var shelljs = require('shelljs/global');


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
    fs.readFile('../shared/drinkme.txt', 'utf8', function(err, data) {
        if (err) throw err;

        console.log('\n' + data);
    });
}

/*
 * Downloads all relevant TC DevTrack material
 */
function getTCContent() {
    console.log("Coming Soon!");
}

/*
 * Downloads and installs the JS API and WDC SDK
 */
function getJSTools() {
    if (!which("git")) {
        console.log("Sorry, this script requires git");
        exit(1);
    }

    cloneRepo("https://github.com/tableau/webdataconnector",
              "webdataconnector",
              "http://tableau.github.io/webdataconnector/docs/");
    cloneRepo("https://github.com/tableau/js-api-examples",
              "js-api-examples",
              "https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api.htm");
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
    fs.readFile('../shared/tableaulogo.txt', 'utf8', function(err, data) {
        if (err) throw err;

        console.log('\n' + data);
        console.log("tableau is a simple command line interface for downloading Tableau\'s developer ");
        console.log("tools and content. There are also Python tools available via pip: ");
        console.log("'pip install tableau'. More can be found at http://developers.tableau.com.");
        
        console.log("Run tc16 -h for more information.\n");
    });    
}

// Using npm package commander to parse args and do coercion
// More info here: https://www.npmjs.com/package/commander
program
  .version('1.0.0')
  .usage('[options]')
  .option('-d, --datadev', 'launches http://developers.tableau.com in you browser', openDataDevURL)
  .option('-D, --drinkme', 'who knows what this does or where it might lead you. don\'t delay', drinkMe)
  .option('-t, --tc16', 'copies all developer track content for Tableau Conference 2016', getTCContent)
  .option('-T, --tools', 'installs all Tableau tools for JavaScript', getJSTools)
  .parse(process.argv);

// argv has length of 2 when running 'tableau' CLI without any options
if (process.argv.length == 2) printHeader(); 
