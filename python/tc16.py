import argparse
import webbrowser
import sys

class TC16Action(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        webbrowser.open_new("http://tabsoft.co/tc16DataDevPIP")

class DrinkMeAction(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        # Note that DST ends on Nov 6, 2016 in Austin, TX
        # Austin will be UTC - 6h or 1478660400
        # 30.265886, -97.735671
        msg = "\n"

        with open('../shared/drinkme.txt', 'r') as f_open:
            msg += f_open.read()

        print(msg)

class ToolsAction(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        import os

        SDK_URL = "https://onlinehelp.tableau.com/current/api/sdk/en-us/help.htm"

        os.system("pip install tableauserverclient")
        os.system("pip install tableaudocumentapi")
        print("Go to {} to download the Tableau Extract SDK (Python 2 only)".format(SDK_URL))


class DatadevAction(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        webbrowser.open_new("http://developers.tableau.com")


prog_description = ""

with open('../shared/tableaulogo.txt','r') as f_open:
    prog_description += f_open.read()


prog_description += "\n"
prog_description += "tableau is a simple command line interface for downloading Tableau\'s developer " + "\n"
prog_description += "tools and content. There are also JavaScript tools available via npm: " + "\n"
prog_description += "'npm i -g tableau'. More can be found at http://developers.tableau.com."

parser = argparse.ArgumentParser(description=prog_description, formatter_class=argparse.RawTextHelpFormatter)

# define our commands
parser.add_argument('-drinkme', nargs=0, action=DrinkMeAction, help='who knows what this does or where it might lead you. don\'t delay.')
parser.add_argument('-datadev', nargs=0, action=DatadevAction, help='launches tableau developer documentation in you browser')
parser.add_argument('-tc16', nargs=0, action=TC16Action, help='takes you to all developer track content for TC16')
parser.add_argument('-tools', nargs=0, action=ToolsAction, help='installs all Tableau tools for Python')

if __name__ == "__main__":
    args = parser.parse_args()
    if len(sys.argv[1:]) < 1:
        parser.print_help()
