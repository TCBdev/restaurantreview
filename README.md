#### RESTAURANT REVIEW APP

### HOW TO RUN


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



### What do I do from here?

1. In this folder, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer.

    * In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.
   * Note -  For Windows systems, Python 3.x is installed as `python` by default. To start a Python 3.x server, you can simply enter `python -m http.server 8000`.
2. With your server running, visit the site: `http://localhost:8000`, and look around for a bit to see what the current experience looks like.
3. Explore the provided code, and start making a plan to implement the required features in three areas: responsive design, accessibility and offline use.
4. Write code to implement the updates to get this site on its way to being a mobile-ready website.

## Leaflet.js and Mapbox:




