import argparse
import webbrowser
import sys

class TC16Action(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        print("TODO TC16 Action")
        print("This will open a link to a public Dropbox folder with TC16 developer track content")

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
        print("TODO Tools Action")
        print("This will install tools like Document API, Server API, SDK")

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
parser.add_argument('-tc16', nargs=0, action=TC16Action, help='copies all developer track content for Tableau Conference 2016')
parser.add_argument('-drinkme', nargs=0, action=DrinkMeAction, help='who knows what this does or where it might lead you. don\'t delay.')
parser.add_argument('-tools', nargs=0, action=ToolsAction, help='installs all Tableau tools for Python')
parser.add_argument('-datadev', nargs=0, action=DatadevAction, help='launches http://developers.tableau.com in you browser')

if __name__ == "__main__":
    args = parser.parse_args()
    if len(sys.argv[1:]) < 1:
        parser.print_help()
