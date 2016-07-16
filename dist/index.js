'use strict';

var app = require('./app');
var port = app.get('port');
var server = app.listen(port);

server.on('listening', function () {
  return console.log('Feathers application started on ' + app.get('host') + ':' + port);
});