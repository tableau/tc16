from setuptools import setup, find_packages

setup(
    name='tc16',
    version='1.0.5',
    author='Tableau',
    author_email='github@tableau.com',
    url='https://github.com/tableau/tc16',
    packages=find_packages(),
    license='MIT',
    entry_points={
      'console_scripts': [
        'tc16 = tc16:main'
      ]
    },
    description='Make TC16 rad.',
    data_files=[('shared', ['./shared/drinkme.txt', './shared/tableaulogo.txt'])]
)
