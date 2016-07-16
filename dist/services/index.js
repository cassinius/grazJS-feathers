'use strict';

var messages = require('./messages');
var authentication = require('./authentication');
var user = require('./user');

module.exports = function () {
  var app = this;

  app.configure(authentication);
  app.configure(user);
  app.configure(messages);
};