'use strict';

const authentication = require('feathers-authentication');

const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function() {
  const app = this;

  let config = app.get('auth');

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
