# CSE108-Lab8
Student Enrollment web app project for CSE108 Lab 8.
Authored by Ismiel Higareda, David Reyes, Ethan Reed, and Jesus Ceron-Gonzalez.

# Requirements
You need these installed in order to set up and run the project:
- [NodeJs](https://nodejs.org/en/download)
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (should already be installed with NodeJs)
- [Python](https://www.python.org/downloads/) (anything newer than 3.8 should work)
- [Git](https://git-scm.com/downloads)

## Dependencies
This project relies on the following:
- React 
- TailwindCSS
- Vite
- React Router
- Flask
- SQLAlchemy
- SQLite3
- Werkzeug
- Flask-JWT-Extended
- Flask-Cors
- WTForms 3.1.2
# Initial Setup
To get the project setup locally, First clone the repo:

```aiignore
git clone https://github.com/etchre/CSE108-Lab8.git
```
If you don't have git, you can download the project as a .zip, and extract it to a desired location. (It is recommended to have git installed to make collaboration easier though)  

Once you have a copy of it locally, navigate to where the repo is stored, and install the development dependencies:
```aiignore
cd CSE108-Lab8/
npm install
```
Once you have done that, you now need to set up the python virtual environment
### For Mac/Linux
```aiignore
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```
### For Windows
```aiignore
python -m venv .venv
venv\Scripts\activate
pip install -r requirements.txt
```
If you are running a bash-like terminal or using WSL, the Linux instructions should work for you.  
Otherwise, use the windows instructions if you are using the windows CMD or Powershell.
# Running the project
Running the project is very simple, you just need to do two steps (in no particular order)
### Start the Frontend
```aiignore
npm run dev
```
### Start the Backend
You may need to open up a second terminal to do this (or make a new tab in your current terminal if it supports that feature).
```aiignore
npm run api
```
The above command is a shortcut I defined in the `package.json` file. It activates the python venv (if you haven't activated it already), changes directory into the api folder `cd api/`, and finally runs flask via `flask --debug run`.

If `npm run api` does not work for you, you can just do the above steps individually.  
If you are on windows, you may need to go into `package.json` and change the command which starts the venv to the appropriate method for windows.
