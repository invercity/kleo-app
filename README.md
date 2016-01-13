# Kleo
[![Build Status](https://travis-ci.org/invercity/kleo.svg?branch=master)](https://travis-ci.org/invercity/kleo)
[![GitHub version](https://badge.fury.io/gh/invercity%2Fkleo.svg)](https://badge.fury.io/gh/invercity%2Fkleo)

Kleo is a modern HTML5 based app, build on MEAN stack MEAN stack is [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) 

`development` tutorial see in `doc/DEV.md`  
`contribution` tutorial see in `doc/CONTRIB.md`

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.

* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js;
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017);
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages;
* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process.
Basically you may install all required packages using:

```
$ sudo apt-get install nodejs mongodb
$ sudo npm install -g grunt-cli bower
```

## Quick Install

The first thing you should do is install the Node.js dependencies. The app comes pre-bundled with a package.json file that contains the list of modules you need to start your application.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

## Running Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000) <br/>

## License
### MIT
