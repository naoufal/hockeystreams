var _             = require('lodash');
var assert        = require('chai').assert;
var nock          = require('nock');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('login Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should login succesfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .post('/Login')
      .reply(200, FIXTURES.login.success);

      HS.login({
        username: 'good-username',
        password: 'good-password'
      }, function(err, res){
        done(err);
      });
  });

  it('should fail to login if with bad username/password', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .post('/Login')
      .reply(400, FIXTURES.login.fail);

    HS.login({
      username: 'bad-username',
      password: 'bad-password'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to login if site is offline', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .post('/Login')
      .reply(404);

    HS.login({
      username: 'good-username',
      password: 'good-password'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });


  it('should fail to login if no username is specified', function() {
    HS.login({
      password: 'good-password'
    }, function(err, res){
      assert.isNotNull(err);
    });
  });

  it('should fail to login if no password is specified', function() {
    HS.login({
      username: 'good-username'
    }, function(err, res){
      assert.isNotNull(err);
    });
  });

  it('should fail to login if no object is specified', function() {
    HS.login(function(err, res){
      assert.isNotNull(err);
    });
  });
});

