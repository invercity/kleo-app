# Kleo
[![Build Status](https://travis-ci.org/invercity/kleo.svg?branch=master)](https://travis-ci.org/invercity/kleo)
[![GitHub version](https://badge.fury.io/gh/invercity%2Fkleo.svg)](https://badge.fury.io/gh/invercity%2Fkleo)
[![David](https://david-dm.org/invercity/kleo.svg)](https://github.com/invercity/kleo)
[![codecov.io](https://codecov.io/github/invercity/kleo/coverage.svg?branch=master)](https://codecov.io/github/invercity/kleo?branch=master)

Kleo is a modern HTML5 based app, build on **MEAN** stack ([**M**ongoDB](http://www.mongodb.org/), [**N**ode.js](http://www.nodejs.org/), [**E**xpress](http://expressjs.com/), [**A**ngularJS](http://angularjs.org/))

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
$ sudo apt-get install rubygems
$ sudo gem install sass
```

## Quick Install

The first thing you should do is install the Node.js dependencies. The app comes pre-bundled with a package.json file that contains the list of modules you need to start your application.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

## First Run
For creaing default app 'administator' user, set ``MONGO_SEED`` environment variable to ``true`` on a first launch (only once)

```
$ MONGO_SEED=true grunt
```
During launch, default 'user' and 'admin' will be created, and you'll see next messages in stdout:

```
$ Local user added with password set to [some pass] 
$ Local admin added with password set to [some pass]
```
After that, you may login to system using username: 'admin' and password [some pass].

## Running Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000) <br/>

## Wiki
Wiki pages you can found [here](https://github.com/invercity/kleo/wiki)

## License
### MIT
