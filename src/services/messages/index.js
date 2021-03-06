'use strict';

import path from 'path';
import NeDB from 'nedb';
import service from 'feathers-nedb';
import hooks from './hooks';

module.exports = function(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'messages.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/messages', service(options));

  // Get our initialize service to that we can bind hooks
  const messagesService = app.service('/messages');

  // Set up our before hooks
  messagesService.before(hooks.before);

  // Set up our after hooks
  messagesService.after(hooks.after);
};
