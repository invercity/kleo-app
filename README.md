# Kleo
[![Build Status](https://travis-ci.org/invercity/kleo.svg?branch=master)](https://travis-ci.org/invercity/kleo)
[![GitHub tag](https://img.shields.io/github/tag/invercity/kleo.svg)]()
[![David](https://david-dm.org/invercity/kleo.svg)](https://david-dm.org/invercity/kleo)

Kleo is a modern HTML5 based app, built on **MEAN** stack ([**M**ongoDB](http://www.mongodb.org/), [**N**ode.js](http://www.nodejs.org/), [**E**xpress](http://expressjs.com/), [**A**ngularJS](http://angularjs.org/))

## Prerequisites
Make sure you have installed all these prerequisites on your development machine.

* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager;
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017);
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages;
* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process.

Installing Node.JS: (if not installed before)
```
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
**IMPORTANT:** Actually we support Node.JS ```v4.x```, previous versions are **not** supported. Please check your Node.JS version using: 
```
$ node -v
```
If your version is lower than 4.x - please also do the above steps.

Installing other packages: 
```
$ sudo apt-get install mongodb
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

## First Launch
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

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000) <br/>
Next time, you may run application with the following command:

```
$ grunt
```

## Wiki
Wiki pages you can found [here](https://github.com/invercity/kleo/wiki)

## License
### MIT
