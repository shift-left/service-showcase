// Test suite for soundbite checkout price service

var expect = require('chai').expect;
var test = require('../../../test.js');

describe('Checkout Price - ', function() {
  before(function() {
    soundbite = test.Soundbite;
  });

  afterEach(function() {
    soundbite.resetCookie();
  });

  it('Get price for a dominos delivery order [C001] @uptime', function(done) {
    soundbite.run(function() {
      //var enterprise = 'jimmyjohns';
      //var enterprise = 'papajohns';
      var enterprise = 'dominos';
      //var enterprise = 'pizzahut';

      // get dossier
      var dossier = test.CommonSteps.getDossier(soundbite, {
        enterprise: enterprise,
        fulfillment: 'delivery',
        address: test.Address.dominos.CA_SanRamon
      });

      var session = dossier.session;
      var roots = test.CommonSteps.getDossierRoots(dossier);

      // var products = test.CommonSteps.productsHashToNested(dossier.dossier, {products: roots[0]});
      var products = test.CommonSteps.productsHashToNested(dossier.dossier);
      expect(products.length).to.be.above(0);

      // checkout price
      // for(var i = 0; i < products.length; i++) {
      r = soundbite.checkout.price.POST({
        body: {
          enterprise: enterprise,
          session: session,
          products: [products[5]]
          // products: [products[i]]
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.checkoutPriceResponse(r);
      expect(r.data.body.id).to.eql(enterprise);
      expect(r.data.body.pricing.fulfillment).to.eql('Delivery');
      // }
      // }
      done();
    });
  });

});

