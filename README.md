#### RESTAURANT REVIEW APP

### HOW TO RUN

View the project here: [Restaurant Review App](https://tcdev.github.io/restaurantreview/)

To view this project locally:

1. Clone the project and unzip the file.
1. From the project directory, open the command terminal. (In Windows you can simply type cmd in the search bar and hit enter.)
1. Use Python to launch a local client server. You need Python installed, and which version you have installed determines what command to enter. It often comes installed on your computer. You can check the version you have (if any) by entering python -v in the terminal. If needed, download it from Python's website and complete installation.
    * Python 2: `python -m SimpleHTTPServer 8000`
    * Python 3: `python3 -m http.server 8000` 
    * If running on Windows 10, python 3 is already installed you can run the locals server as follows:
    `python -m http.server 8000`
1. Visit the site in your browser at http://localhost:8000


### DEPENDENCIES

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). You need to replace `<your MAPBOX API KEY HERE>` with a token from [Mapbox](https://www.mapbox.com/). Mapbox is free to use, and does not require any payment information.