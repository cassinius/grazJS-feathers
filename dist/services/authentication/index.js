'use strict';

var authentication = require('feathers-authentication');

var FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function () {
  var app = this;

  var config = app.get('auth');

  config.facebook.strategy = FacebookStrategy;
  config.facebook.tokenStrategy = FacebookTokenStrategy;
  config.facebook.clientID = '634066253418726';
  config.facebook.clientSecret = '29680fbbbaa8273adce1ebfd7c62532a';
  config.facebook.permissions = {
    authType: 'rerequest',
    scope: ['public_profile', 'email']
  };

  app.set('auth', config);
  app.configure(authentication(config));
};