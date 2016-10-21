import argparse
import pkg_resources
import re
import os
import os.path
import sys
import webbrowser

try:
  raw_input
except NameError:
  raw_input = input

YESNO_RE = re.compile(r'^\s*(([Yy](es)?)|([Nn]o?))\s*$')
DRINKME_FILE = pkg_resources.resource_filename(__name__, 'shared/drinkme.txt')
LOGO_FILE = pkg_resources.resource_filename(__name__, 'shared/tableaulogo.txt')

def get_confirmation(question):
    response = raw_input(question).strip()
    if response == '':
        return True

    if not YESNO_RE.match(response):
        print('you must respond with Y or N')
        return get_confirmation(question)

    return response.lower()[0] == 'y'


class TC16Action(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        webbrowser.open_new("http://tabsoft.co/tc16DataDevPIP")


class DrinkMeAction(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        # Note that DST ends on Nov 6, 2016 in Austin, TX
        # Austin will be UTC - 6h or 1478660400
        # 30.265886, -97.735671
        msg = "\n"

        with open(DRINKME_FILE, 'r') as f_open:
            msg += f_open.read()

        print(msg)


class ToolsAction(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):

        if not get_confirmation('Are you sure you want to pip install our tools? (Y/n) '):
            return

        SDK_URL = "https://onlinehelp.tableau.com/current/api/sdk/en-us/help.htm"

        os.system("pip install tableauserverclient")
        os.system("pip install tableaudocumentapi")
        print("Go to {} to download the Tableau Extract SDK (Python 2 only)".format(SDK_URL))


class DatadevAction(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        webbrowser.open_new("http://developers.tableau.com")


def main(args=sys.argv[1:]):

    prog_description = ""

    with open(LOGO_FILE,'r') as f_open:
        prog_description += f_open.read()

    prog_description += "\n"
    prog_description += "tc16 is a simple command line interface for downloading Tableau\'s developer " + "\n"
    prog_description += "tools and content. There are also JavaScript tools available via npm: " + "\n"
    prog_description += "'npm install -g tc16'. More can be found at http://developers.tableau.com."

    parser = argparse.ArgumentParser(description=prog_description, formatter_class=argparse.RawTextHelpFormatter)

    # define our commands
    parser.add_argument('-D', '--drinkme', nargs=0, action=DrinkMeAction,
                        help='who knows what this does or where it might lead you. don\'t delay.')
    parser.add_argument('-d', '--datadev', nargs=0, action=DatadevAction,
                        help='launches tableau developer documentation in you browser')
    parser.add_argument('-t', '--tc16', nargs=0, action=TC16Action,
                        help='takes you to all developer track content for TC16')
    parser.add_argument('-T', '--tools', nargs=0, action=ToolsAction,
                        help='installs all Tableau tools for Python')

    parser.parse_args(args)
    if len(args) < 1:
        parser.print_help()

if __name__ == "__main__":
    main()
