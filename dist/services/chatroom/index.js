'use strict';

var path = require('path');
var NeDB = require('nedb');
var service = require('feathers-nedb');
var hooks = require('./hooks');

module.exports = function () {
  var app = this;

  var db = new NeDB({
    filename: path.join(app.get('nedb'), 'chatrooms.db'),
    autoload: true
  });

  var options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/chatrooms', service(options));

  // Get our initialize service to that we can bind hooks
  var chatroomService = app.service('/chatrooms');

  // Set up our before hooks
  chatroomService.before(hooks.before);

  // Set up our after hooks
  chatroomService.after(hooks.after);
};