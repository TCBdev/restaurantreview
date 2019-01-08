#### RESTAURANT REVIEW APP

### HOW TO RUN

View the project here: [Restaurant Review App](https://tcbdev.github.io/restaurantreview/)

To view this project locally:

1. Clone the project and unzip the file.
1. From the project directory, open the command terminal. 
   * For Windows, type cmd in the search bar and press enter.
1. Use Python to launch a local client server. You need [Python](https://www.python.org/) installed.
   * If Python is already installed on your computer, check the versionby entering python -v in the terminal. 
   * If no Python version is found, it is likely that Python is not installed.
   * Go to Python's website and complete installation.
1. With Python installed, enter the following commands in your terminal:
    * Python 2: `python -m SimpleHTTPServer 8000`
    * Python 3: `python3 -m http.server 8000` 
    * If running on Windows 10, python 3 is should already be installed. You can run the local server as follows:
    `python -m http.server 8000`
1. Visit the site in your browser at http://localhost:8000


### DEPENDENCIES

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). You need to replace `<your MAPBOX API KEY HERE>` with a token from [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information.
