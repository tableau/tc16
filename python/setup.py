from setuptools import setup

setup(
    name='tc16',
    version='1.0.7',
    author='Tableau',
    author_email='github@tableau.com',
    url='https://github.com/tableau/tc16',
    packages=['tc16'],
    license='MIT',
    entry_points={
      'console_scripts': [
        'tc16 = tc16:main'
      ]
    },
    description='Make TC16 rad.',
    package_data={
        'tc16': ['shared/*.txt']
    }
)
