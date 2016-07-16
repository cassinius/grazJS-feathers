'use strict';

var path = require('path');
var NeDB = require('nedb');
var service = require('feathers-nedb');
var hooks = require('./hooks');

module.exports = function () {
  var app = this;

  var db = new NeDB({
    filename: path.join(app.get('nedb'), 'users.db'),
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
  app.use('/users', service(options));

  // Get our initialize service to that we can bind hooks
  var userService = app.service('/users');

  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
};