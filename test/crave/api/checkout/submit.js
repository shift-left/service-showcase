// Test suite for soundbite checkout service

var expect = require('chai').expect;
var test = require('../../../test.js');

describe('Checkout - ', function() {
  before(function() {
    soundbite = test.Soundbite;
  });

  afterEach(function() {
    soundbite.resetCookie();
  });

  it('Get price for an order [C001]', function(done) {
    soundbite.run(function() {
      // get mixer dossier
      var dossier = test.CommonSteps.getDossier(soundbite, {
        enterprise: 'jimmyjohns',
        fulfillment: 'delivery'
      });

      var session = dossier.session;

      // checkout price
      r = soundbite.checkout.price.POST({
        body: {
          enterprise: 'jimmyjohns',
          products: [{
            limits: [],
            name: 'SLIM 1',
            id: '3695',
            children: [
              { limits: [], name: 'Size', id: 'size', children: [{ limits: [], name: 'Regular', id: 'regular', children: [] }] },
              { limits: [{ type: 'value', key: 'quantity', operator: 'assign', value: 1}], name: 'Quantity', id: 'quantity', children: [] },
              {
                limits: [],
                name: 'Modifiers',
                id: 'modifiers',
                children: [
                  { limits: [], name: 'Provolone Cheese', id: '2988', children: [{ limits: [], name: 'REG', id: '23237', children: [] }] },
                  { limits: [], name: 'Smoked Ham', id: '2990', children: [{ limits: [], name: 'REG', id: '23241', children: [] }] },
                  { limits: [], name: 'Bacon', id: '3001', children: [{ limits: [], name: 'NO', id: '23569', children: [] }] },
                  { limits: [], name: 'Avocado Spread', id: '3003', children: [{ limits: [], name: 'NO', id: '23570', children: [] }] },
                  { limits: [], name: 'Roast Beef', id: '3005', children: [{ limits: [], name: 'NO', id: '23568', children: [] }] },
                  { limits: [], name: 'Tuna', id: '3011', children: [{ limits: [], name: 'NO', id: '23553', children: [] }] },
                  { limits: [], name: 'Turkey', id: '3013', children: [{ limits: [], name: 'NO', id: '23552', children: [] }] },
                  { limits: [], name: 'Select your bread', id: '3888', children: [{ limits: [], name: 'French Bread', id: '23216', children: [] }] },
                  { limits: [], name: 'Vito Meat (Capicola/Genoa Salami)', id: '3940', children: [{ limits: [], name: 'NO', id: '23399', children: [] }] }
                ]
              }
            ]
          }],
          session: session
        }
      });
      test.CommonAssertions.checkStatus(r, 200);
      test.CommonAssertions.checkoutPriceResponse(r);
      done();
    });
  });

});

