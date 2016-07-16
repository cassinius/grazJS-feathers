'use strict';

var authentication = require('feathers-authentication');

var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function () {
  var app = this;

  var config = app.get('auth');

  config.facebook.strategy = FacebookStrategy;
  config.facebook.tokenStrategy = FacebookTokenStrategy;

  app.set('auth', config);
  app.configure(authentication(config));
};