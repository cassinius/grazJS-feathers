'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('chatroom service', function() {
  it('registered the chatrooms service', () => {
    assert.ok(app.service('chatrooms'));
  });
});
