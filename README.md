# datadev

This repository is for the datadev tools that are part of the developer track at TC16.  It has utilities to help developers quickly get up to speed with Tableau's APIs and tools.

##Installation
To use the tool, you will need either node and npm installed, or pip and pyton installed.  Then, run:

<code>npm install -g datadev</code>

or

<code>pip install datadev</code>

##Usage
Once you've installed one of the programs, go to your terminal and type:

<code>datadev</code>

Here's an example of installation and partial usage of the Python version:

![Image of pip install and usage](datadev-python.gif)

##Known Issues
Only one of the tools can be used at one time. In fact, installing both will result in the second program having usage of the 'datadev' command.


# For Development of datadev

Python:
* Ensure you have pip and python installed.
* cd into python folder.
* Run python datadev.py to test locally.
* To make an update, first increment the version number in setup.py, then commit your changes.
* To publish a new version of datadev for pip, run publish.sh.   This will require pip credentials for the tableau account.

Node:
* Ensure you have node and npm installed.
* cd into node folder.
* Run 'npm install -g ./' to install and test locally.
* To make an update, first increment the version number in package.json, then commit your changes.  
* To publish a new version of datadev for pip, run npm publish.   This will require pip credentials for the tableau account.
