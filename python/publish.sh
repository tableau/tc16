#!/usr/bin/env bash
# Make sure you pip install twine

set -e

rm -rf dist
python setup.py sdist
python setup.py bdist_wheel
python3 setup.py bdist_wheel
# twine upload dist/*
