// Test suite for soundbite mixer email service

var expect = require('chai').expect;
var test = require('../../../test.js');

describe('Mixer Email - ', function() {
  before(function() {
    soundbite = test.Soundbite;
  });

  afterEach(function() {
    soundbite.resetCookie();
  });

  it('Send valid email [C001] @uptime', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.email.POST({
        body: {
          email: 'soundbite-test@test.com'
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      expect(r.data.body).to.eql(undefined);

      done();
    });
  });

  it('Send invalid email [C002]', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.email.POST({
        body: {
          email: 'soundbite-test'
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      expect(r.data.body).to.eql(undefined);

      done();
    });
  });

  it('Send very long string [C003]', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.email.POST({
        body: {
          email: new Array(1000).join('test')
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      expect(r.data.body).to.eql(undefined);

      done();
    });
  });

  it('Send email with extra field [C004]', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.email.POST({
        body: {
          email: 'soundbite-test@test.com',
          invalid: 'no'
        }
      });
      test.CommonAssertions.checkStatus(r, 400);
      expect(r.data.body.statusCode).to.eql(400);

      done();
    });
  });

  it('Send without email field [C005]', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.email.POST({
        body: {
          mail: 'soundbite-test@test.com',
        }
      });
      test.CommonAssertions.checkStatus(r, 400);
      expect(r.data.body.statusCode).to.eql(400);

      done();
    });
  });

});

