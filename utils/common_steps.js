// Common steps defined for soundbite service call flows

var expect = require('chai').expect;
var Config = require('config');
var Hoek = require('hoek');
var CommonAssertions = require('./common_assertions.js');
var Address = require('../config/data/address.js');
var Sleep = require('sleep');

var internals = {};

internals.CommonSteps = function () {};

// Get dossier menu
// default is jimmyjohns delivery menu, with Rochester NY address
internals.CommonSteps.getDossier = function (soundbite, options) {
  // set default values for params
  options = options || {};
  var address = options.address || Address.dominos.CA_SanRamon;
  var enterprise = options.enterprise || 'dominos';
  var fulfillment = options.fulfillment || 'delivery';

  var r = soundbite.mixer.dossier.POST({
    body: {
      enterprise: enterprise,
      fulfillment: fulfillment,
      address: address
    }
  });
  CommonAssertions.checkStatus(r, 200);
  CommonAssertions.mixerDossierResponse(r);

  return r.data.body;
};

// get all entry points from dossier menu
internals.CommonSteps.getDossierRoots = function (dossier) {
  roots = [];
  Object.keys(dossier.dossier.products).forEach(function(key) {
    var product = dossier.dossier.products[key];
    if (product.root === true) {
      roots.push(product);
    }
  });

  return roots;
};

internals.CommonSteps.productsHashToNested = function (rosetta, options) {

  options = options || {};
  options.images = options.images || false;
  options.tags = options.tags || false;
  options.default = options.default !== undefined ? options.default : true;
  options.products = Hoek.reach(options, 'products', { default: [] });
  options.products = Array.isArray(options.products) ? options.products : [options.products];

  // Do not modify original object
  rosetta = Hoek.clone(rosetta);

  var recurse = function (hashTree) {

    // Algorithmically select default traversal
    if (options.default && !(hashTree.default || hashTree.root)) {
      return null;
    }

    hashTree = Hoek.clone(hashTree);

    // Images
    var images = [];
    var i;
    for (i = 0, il = hashTree.images.length; i < il; ++i) {
      if (options.images) {
        var imageHashId = hashTree.images[i];
        var image = Hoek.clone(rosetta.images[imageHashId]);
        delete image.products;
        delete image.categories;
        delete image.hashId;
        images.push(image);
      }
    }

    // Limits
    var limits = [];
    for (i = 0, il = hashTree.limits.length; i < il; ++i) {
      var limitHashId = hashTree.limits[i];
      var limit = Hoek.clone(rosetta.limits[limitHashId]);
      if (limit.type === 'value') {
        delete limit.products;
        delete limit.hashId;
        limits.push(limit);
      }
    }

    // Tags
    var tags = [];
    for (i = 0, il = hashTree.tags.length; i < il; ++i) {
      if (options.tags) {
        var tagHashId = hashTree.tags[i];
        var tag = Hoek.clone(rosetta.tags[tagHashId]);
        delete tag.products;
        delete tag.hashId;
        tags.push(tag);
      }
    }

    // Set relationships
    hashTree.limits = limits;
    options.images ? hashTree.images = images : delete hashTree.images;
    options.tags ? hashTree.tags = tags : delete hashTree.tags;

    // Delete unnecessary relationships
    delete hashTree.categories;
    delete hashTree.fulfillments;
    delete hashTree.promotions;

    // Delete unnecessary fields
    delete hashTree.description;
    delete hashTree.root;
    delete hashTree.rank;
    delete hashTree.active;
    delete hashTree.default;
    delete hashTree.render;
    delete hashTree.style;
    delete hashTree.priceModifier;
    delete hashTree.hashId;

    // For formatting purposes
    var children = hashTree.children;
    delete hashTree.children;
    hashTree.children = children;

    // Base case
    if (!hashTree.children.length) {
      return hashTree;
    }

    // Iterative Step
    children = [];
    for (i = 0; i < hashTree.children.length; ++i) {
      var childHashId = hashTree.children[i];
      var subTree = recurse(rosetta.products[childHashId]);
      if (subTree) {
        children.push(subTree);
      }
    }

    hashTree.children = children;
    return hashTree;
  };

  var rootProducts = [];
  for (var productKey in rosetta.products) {
    if (rosetta.products.hasOwnProperty(productKey)) {
      var product = rosetta.products[productKey];

      if (product.root) {
        if (options.products.length) {
          if (Hoek.contain(options.products, product.name)) {
            rootProducts.push(product);
          }
        } else {
          rootProducts.push(product);
        }
      }
    }
  }

  var results = [];
  for (i = 0; i < rootProducts.length; ++i) {
    results.push(recurse(rootProducts[i]));
  }

  return results;
};

exports = module.exports = internals.CommonSteps;
