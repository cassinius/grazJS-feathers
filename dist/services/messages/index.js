'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

var _feathersNedb = require('feathers-nedb');

var _feathersNedb2 = _interopRequireDefault(_feathersNedb);

var _hooks = require('./hooks');

var _hooks2 = _interopRequireDefault(_hooks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var app = this;

  var db = new _nedb2.default({
    filename: _path2.default.join(app.get('nedb'), 'messages.db'),
    autoload: true
  });

  var options = {
    Model: db,
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/messages', (0, _feathersNedb2.default)(options));

  // Get our initialize service to that we can bind hooks
  var messagesService = app.service('/messages');

  // Set up our before hooks
  messagesService.before(_hooks2.default.before);

  // Set up our after hooks
  messagesService.after(_hooks2.default.after);
};