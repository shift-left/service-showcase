
var Config = require('config');
var Bluecat = require('bluecat');

var api = Bluecat.Api('sample');

service = new Bluecat.ServiceSync(api, Config.server.host);
service.setProxy(Config.proxy);
exports.sample = service;
