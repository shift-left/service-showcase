// Test suite for soundbite mixer deck service

var expect = require('chai').expect;
var test = require('../../../test.js');

describe('Mixer Deck - ', function() {
  before(function() {
    soundbite = test.Soundbite;
  });

  it('Get deck [C001] @uptime', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.deck.GET();
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.mixerDeckerResponse(r);
      done();
    });
  });

});

