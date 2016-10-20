# tc16

This repository is for the tc16 tool that we are giving to developers at conference.  It has utilities to help develoeprs quickly get up to speed with Tableau Extensibility.  There is also a riddle in the program that leads developers to a meetup at TC.

To use the tool, you will need either node and npm installed, or pip and pyton installed.  Then, run:

<code>npm install -g tc16</code>

or

<code>pip install tc16</code>


# For Development of tc16

Python:
* Ensure you have pip and python installed.
* cd into python folder.
* Run python tc16.py to test locally.
* To make an update, first increment the version number in setup.py, then commit your changes.
* To publish a new version of tc16 for pip, run publish.sh.   This will require pip credentials for the tableau account.

Node:
* Ensure you have node and npm installed.
* cd into node folder.
* Run 'npm install -g ./' to install and test locally.
* To make an update, first increment the version number in package.json, then commit your changes.  
* To publish a new version of tc16 for pip, run npm publish.   This will require pip credentials for the tableau account.
