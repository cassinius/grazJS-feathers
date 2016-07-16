'use strict';

import chai from 'chai';
import app from '../../../src/app';

let expect = chai.expect;


describe('user service', function() {

  it('registered the users service', () => {
    expect(app.service('users')).not.to.be.undefined;
  });

});
