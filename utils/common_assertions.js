// General assertion for response

var chai = require('chai');
chai.use(require('chai2-json-schema'));
var expect = require('chai').expect;
var schema = require('./schema/');
var Util = require('util');

var internals = {};

internals.CommonAssertions = function () {
};

// Verify response statusCode and return more informative information when failed
internals.CommonAssertions.checkStatus = function(res, expectedStatus) {
  expect(res.data.statusCode).to.equal(expectedStatus,
      'Expected status code ' + res.data.statusCode + ' to equal ' + expectedStatus +
      '.\n' + res.request.method + ' ' + res.request.uri + ' returned:\n' + Util.inspect(res.data.body, { depth: 5 }));
};


// Generic mixer dossier response assertion
internals.CommonAssertions.mixerDossierResponse = function (r) {
  expect(r.err).to.equal(null);
  expect(r.data.body).to.be.jsonSchema(schema.mixerDossierSchema);
};

internals.CommonAssertions.mixerDeckerResponse = function (r) {
  expect(r.err).to.equal(null);
  expect(r.data.body).to.be.jsonSchema(schema.mixerDeckerSchema);
};

internals.CommonAssertions.checkoutPriceResponse = function (r) {
  expect(r.err).to.equal(null);
  expect(r.data.body).to.be.jsonSchema(schema.checkoutPriceSchema);
};

exports = module.exports = internals.CommonAssertions;

