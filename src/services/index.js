'use strict';
const chatroom = require('./chatroom');
const messages = require('./messages');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function() {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(messages);


  console.log("Message service initialized.");
  app.configure(chatroom);
};
