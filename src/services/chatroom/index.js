'use strict';

const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'chatrooms.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/chatrooms', service(options));

  // Get our initialize service to that we can bind hooks
  const chatroomService = app.service('/chatrooms');

  // Set up our before hooks
  chatroomService.before(hooks.before);

  // Set up our after hooks
  chatroomService.after(hooks.after);
};
