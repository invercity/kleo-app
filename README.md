# kleo-app
[![Build Status](https://travis-ci.org/invercity/kleo-app.svg?branch=master)](https://travis-ci.org/invercity/kleo-app)
[![GitHub tag](https://img.shields.io/github/tag/invercity/kleo-app.svg)]()
[![David](https://david-dm.org/invercity/kleo.svg)](https://david-dm.org/invercity/kleo-app)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

**kleo-app** is a CMS, built on **MEAN** stack (**M**ongoDB, **N**ode.js, **E**xpress, **A**ngularJS 1.x, Bootstrap 3.x)

**IMPORTANT!** Project is **CLOSED** See modern [kleo](https://github.com/invercity/kleo) app, based on AngularJS 4.x/Bootstrap 4.x
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
**IMPORTANT:** Actually we support Node.JS ```v4.x``` and higher, previous versions are **not** supported. Please check your Node.JS version using: 
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

## Start application
Application can be started with launching (in *development* mode):

```
$ grunt
```
During first launch, default 'admin' will be created, and you'll see next messages in stdout:

```
$ Local admin added with password set to [PASS_GOES_HERE]
```
After that, you may login to system using username: 'admin' and generated password.

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000) <br/>

## Wiki
Wiki pages you can found [here](https://github.com/invercity/kleo-app/wiki)

## License
### MIT
