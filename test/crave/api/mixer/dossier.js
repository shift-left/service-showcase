// Test suite for soundbite mixer dossier service

var expect = require('chai').expect;
var test = require('../../../test.js');

describe('Mixer Dossier - ', function() {
  before(function() {
    soundbite = test.Soundbite;
  });

  afterEach(function() {
    soundbite.resetCookie();
  });

  it('Get dossier with invalid enterprise [C001]', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: 'dominos2',
          fulfillment: 'delivery',
          address: test.Address.dominos.CA_SanRamon
        }
      });
      test.CommonAssertions.checkStatus(r, 200);

      done();
    });
  });

  it('Get dossier with invalid enterprise [C002]', function(done) {
    soundbite.run(function() {
      var enterprise = 'lazydog';
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: enterprise,
          fulfillment: 'delivery',
          address: test.Address.dominos.CA_SanRamon
        }
      });
      test.CommonAssertions.checkStatus(r, 400);
      expect(r.data.body.message).to.equal('Error: Invalid enterprise ' + enterprise);

      done();
    });
  });

  it('Get dossier with invalid fulfillment [C003]', function(done) {
    soundbite.run(function() {
      var enterprise = 'dominos';
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: enterprise,
          fulfillment: 'delivery2',
          address: test.Address.dominos.CA_SanRamon
        }
      });
      test.CommonAssertions.checkStatus(r, 400);
      expect(r.data.body.message).to.equal('child \"fulfillment\" fails because [\"fulfillment\" must be one of [delivery, carryout]]');

      done();
    });
  });

  it('Get dossier with unsupported field [C004]', function(done) {
    soundbite.run(function() {
      var enterprise = 'dominos';
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: enterprise,
          fulfillment: 'carryout',
          address: test.Address.dominos.CA_SanRamon,
          price: 'free'
        }
      });
      test.CommonAssertions.checkStatus(r, 400);
      expect(r.data.body.message).to.equal('"price" is not allowed');

      done();
    });
  });

  it('Get dossier with enterprice missing [C005]', function(done) {
    soundbite.run(function() {
      var enterprise = 'dominos';
      var r = soundbite.mixer.dossier.POST({
        body: {
          fulfillment: 'carryout',
          address: test.Address.dominos.CA_SanRamon,
        }
      });
      test.CommonAssertions.checkStatus(r, 400);
      expect(r.data.body.message).to.equal('child "enterprise" fails because ["enterprise" is required]');

      done();
    });
  });

  it('Get dossier with fulfillment missing [C006]', function(done) {
    soundbite.run(function() {
      var enterprise = 'dominos';
      // when fulfillment missign, default 'delivery' will be used
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: enterprise,
          address: test.Address.dominos.CA_SanRamon,
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.mixerDossierResponse(r);

      done();
    });
  });

  it('Get dossier with address missing [C007]', function(done) {
    soundbite.run(function() {
      var enterprise = 'dominos';
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: enterprise,
          fulfillment: 'carryout'
        }
      });
      test.CommonAssertions.checkStatus(r, 400);
      expect(r.data.body.message).to.equal('child "address" fails because ["address" is required]');

      done();
    });
  });

  it('Get jimmyjohns delivery dossier [C101]', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: 'jimmyjohns',
          fulfillment: 'delivery',
          address: test.Address.jimmyjohns.CA_SanRamon
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.mixerDossierResponse(r);

      done();
    });
  });

  it('Get jimmyjohns carryout dossier [C102] @uptime', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: 'jimmyjohns',
          fulfillment: 'carryout',
          address: test.Address.jimmyjohns.CA_SanRamon
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.mixerDossierResponse(r);

      done();
    });
  });

  it('Get dominos delivery dossier [C301] @uptime', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: 'dominos',
          fulfillment: 'delivery',
          address: test.Address.dominos.CA_SanRamon
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.mixerDossierResponse(r);

      done();
    });
  });

  it('Get dominos carryout dossier [C302]', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: 'dominos',
          fulfillment: 'carryout',
          address: test.Address.dominos.CA_SanRamon
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.mixerDossierResponse(r);

      done();
    });
  });

  it('Get pizzahut delivery dossier [C401]', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: 'pizzahut',
          fulfillment: 'delivery',
          address: test.Address.pizzahut.CA_SanBruno
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.mixerDossierResponse(r);
      expect(r.data.body.id).to.eql('pizzahut');
      expect(r.data.body.session.userAddress).to.deep.eql(test.Address.pizzahut.CA_SanBruno);
      expect(r.data.body.session.fulfillment).to.deep.eql('delivery');

      done();
    });
  });

  it('Get pizzahut carryout dossier [C402]', function(done) {
    soundbite.run(function() {
      var r = soundbite.mixer.dossier.POST({
        body: {
          enterprise: 'pizzahut',
          fulfillment: 'carryout',
          address: test.Address.pizzahut.CA_SanBruno
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.mixerDossierResponse(r);
      expect(r.data.body.id).to.eql('pizzahut');
      expect(r.data.body.session.userAddress).to.deep.eql(test.Address.pizzahut.CA_SanBruno);
      expect(r.data.body.session.fulfillment).to.deep.eql('carryout');

      done();
    });
  });

});

