'use strict';

var chatroom = require('./chatroom');
var messages = require('./messages');
var authentication = require('./authentication');
var user = require('./user');

module.exports = function () {
  var app = this;

  app.configure(authentication);
  app.configure(user);
  app.configure(messages);

  console.log("Message service initialized.");
  app.configure(chatroom);
};