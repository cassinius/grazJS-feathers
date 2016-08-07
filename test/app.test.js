'use strict';

import request from 'request';
import app from '../src/app';
import chai from 'chai';
let expect = chai.expect;

const HOST = "http://localhost";
const PORT = 3999;

const ROOT_URL = HOST + ":" + PORT;

describe('Feathers application tests', function() {

  before(function(done) {
    this.server = app.listen(PORT);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });


  describe('404 on root page', function() {

    it('shows a 404 HTML page', function(done) {
      request({
        url: ROOT_URL,
        headers: {
          'Accept': 'text/html'
        }
      }, function(err, res, body) {
        expect(res.statusCode).to.equal(404);
        done(err);
      });
    });


    it('shows a 404 JSON error without stack trace', function(done) {
      request({
        url: ROOT_URL,
        json: true
      }, function(err, res, body) {
        expect(res.statusCode).to.equal(404);
        expect(body.code).to.equal(404);
        expect(body.message).to.equal('Page not found');
        expect(body.name).to.equal('NotFound');
        done(err);
      });
    });

  });

});
