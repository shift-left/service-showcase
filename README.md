# Introduction ##
Service API Integration Test Showcase

## Installation ##
* Install [Node.js >= v0.10.25 and npm](http://nodejs.org/)
* Install all node package dependencies:

```bash
$ npm install
```

## Usage ##

* Run directly with [mocha](http://visionmedia.github.io/mocha/) (example):

```bash
# Run all tests against production
$ ./node_modules/.bin/mocha test/crave/api/**
```
```bash
# Run all tests in specific test file
# Use environment variable to specify which server to run against and if use proxy or not
# By default, the host is localhost and proxy is off
$ NODE_CONFIG='{"server":{"host":"127.0.0.1:8080"}, "proxy":"http://127.0.0.1:8888"}' ./node_modules/.bin/mocha test/crave/api/heartbeat/heartbeat.js
```
```bash
# Another way of setting running environment, this uses settings specified in config/prod.json
$ NODE_ENV=prod ./node_modules/.bin/mocha test/crave/api/heartbeat/heartbeat.js
```

* Run with [grunt](http://gruntjs.com/) (example):

```bash
$ ./node_modules/.bin/grunt crave           # run all tests
$ ./node_modules/.bin/grunt crave --proxy   # run all tests with Charles proxy
```

