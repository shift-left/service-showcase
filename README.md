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
$ ./node_modules/.bin/mocha test/sample
```

```bash
# Run all tests in specific test file
# Use environment variable to specify if use proxy or not
# By default, proxy is off
$ NODE_CONFIG='{"proxy":"http://127.0.0.1:8888"}' ./node_modules/.bin/mocha test/sample/sample.js
```

