# Portfolio
Web Development Portfolio for Andrew A. Anissi

## Overview
This application both serves a portfolio to a public server and is itself a portfolio project in demonstrating a universal JavaScript application with a Node.js / Express.js server and a Webpack build process.

## Resources
1. [SCRUM board via Trello](https://trello.com/b/ocVBrYoI/portfolio)
2. [GitHub Repository](https://github.com/wingedearth/portfolio)
3. [Changelog](https://github.com/wingedearth/portfolio/blob/master/CHANGELOG.md)

## Technologies

1. [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
2. [Node.js](https://nodejs.org) v.10+
3. [Express.js](https://expressjs.com)
4. [Git](https://git-scm.com)
5. [Babeljs](https://babeljs.io)
6. [Eslint](https://eslint.org)
7. [Webpack](https://webpack.js.org)
8. [React](https://reactjs.org)
9. [commitlint](https://commitlint.js.org/#/)

### Language

Portfolio relies on universal JavaScript throughout the application, allowing for the ease of using a single langauge and sharing of code between the server and client. Babeljs is used to transpile the JavaScript from both environments for compatibility.

### Back End

This application uses a [Node.js](https://nodejs.org) server with an Express.js framework to serve web pages in response to HTTP requests.

### Front End

The front end relies upon the [React](reactjs.org/) library. React is used to modularlize components, organize layouts, and generate data driven markup.

### Set up your local repository

1. From your terminal (Bash or Zsh), in a directory of your choice, enter the following command, to create a folder called "prequalifier": ```git clone https://github.com/wingedearth/portfolio.git```

2. Enter ```cd portfolio``` to enter the folder.

3. Enter ```yarn``` to run yarn, which will install the local NPM package dependencies. If you do not have yarn installed globally on your machine, then first enter ```npm i -g yarn``` to install yarn.

### Build the application

1. Enter ```yarn build``` in the command line to run a Webpack build of the application, the proceeds of which will be written to a ```/dist``` folder in the ```portfolio``` directory. This will run the server and client side builds using Webpack. To run in watch mode, instead enter ```yarn build:watch```

2. In a separate tab or window enter ```yarn start``` in the command line to start the server. Then in a browser, navigate to ```localhost:4000```