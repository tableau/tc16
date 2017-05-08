from setuptools import setup

setup(
    name='datadev',
    version='1.0.12',
    author='Tableau',
    author_email='github@tableau.com',
    url='https://github.com/tableau/datadev',
    packages=['datadev'],
    license='MIT',
    entry_points={
      'console_scripts': [
        'datadev = datadev:main'
      ]
    },
    description='Make Datadev rad.',
    package_data={
        'datadev': ['shared/*.txt']
    }
)
