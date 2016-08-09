'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _feathers = require('feathers');

var _feathers2 = _interopRequireDefault(_feathers);

var _feathersConfiguration = require('feathers-configuration');

var _feathersConfiguration2 = _interopRequireDefault(_feathersConfiguration);

var _feathersHooks = require('feathers-hooks');

var _feathersHooks2 = _interopRequireDefault(_feathersHooks);

var _feathersRest = require('feathers-rest');

var _feathersRest2 = _interopRequireDefault(_feathersRest);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _feathersSocketio = require('feathers-socketio');

var _feathersSocketio2 = _interopRequireDefault(_feathersSocketio);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _services = require('./services');

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _feathers2.default)();

app.configure((0, _feathersConfiguration2.default)(_path2.default.join(__dirname, '..')));

app.use((0, _compression2.default)()).options('*', (0, _cors2.default)()).use((0, _cors2.default)()).use(_bodyParser2.default.json()).use(_bodyParser2.default.urlencoded({ extended: true })).configure((0, _feathersHooks2.default)()).configure((0, _feathersRest2.default)()).configure((0, _feathersSocketio2.default)()).configure(_services2.default).configure(_middleware2.default);

module.exports = app;