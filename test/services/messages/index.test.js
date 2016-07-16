'use strict';

import chai from 'chai';
import app from '../../../src/app';

let expect = chai.expect;


describe('messages service', function() {

  it('registered the messages service', () => {
    expect(app.service('messages')).not.to.be.undefined;
  });

});
