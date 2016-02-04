// Test suite for soundbite heartbeat service

var expect = require('chai').expect;
var test = require('../../../test.js');

describe('Heartbeat - ', function() {
  before(function() {
    soundbite = test.Soundbite;
  });

  afterEach(function() {
    soundbite.resetCookie();
  });

  it('Checkout soundbite server heartbeat [C001] @uptime', function(done) {
    soundbite.run(function() {
      var r = soundbite.heartbeat.GET();
      test.CommonAssertions.checkStatus(r, 200);
      expect(r.data.body.status).to.eql('ok');
      done();
    });
  });

});

