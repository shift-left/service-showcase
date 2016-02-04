var Config = require('config');
var Bluecat = require('bluecat');
exports.CommonAssertions = require('../utils/common_assertions');
exports.CommonSteps = require('../utils/common_steps');
exports.Address = require('../config/data/address');

var api = Bluecat.Api('soundbite');

soundbite = new Bluecat.ServiceSync(api, Config.server.host, {
  gzip: true
});
soundbite.setProxy(Config.proxy);
soundbite.setHeaders({'User-Agent': 'soundbite-automation'});
exports.Soundbite = soundbite;

