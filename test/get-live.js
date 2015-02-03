var _      = require('lodash');
var assert = require('chai').assert;
var nock   = require('nock');
var URI    = require('URIjs');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('getLive Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should get live feeds successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetLive?token=valid')
      .reply(200, FIXTURES.getLive.success);

    HS.getLive({
      token: 'valid',
    }, function(err, res){
      done(err);
    });
  });

  it('should get live feeds for specific date successfully', function(done) {
    var filter_date = '02/02/2015';
    var path = URI('/GetLive').query({
      token: 'valid',
      date: filter_date
    }).href();

    var hs_api = nock('https://api.hockeystreams.com')
      .get(path)
      .reply(200, FIXTURES.getLive.success_date);

    HS.getLive({
      token: 'valid',
      date: filter_date
    }, function(err, res){
      done(err);
    });
  });

  it('should fail to get live feeds if date is misformatted', function(done) {
    HS.getLive({
      token: 'valid',
      date: '02-02-2015'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get live feeds if invalid token is used', function(done) {
    var hs_api = nock("https://api.hockeystreams.com")
      .get("/GetLive?token=invalid")
      .reply(200, FIXTURES.getLive.fail);

    HS.getLive({
      token: 'invalid',
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get live feeds if no token was provided', function(done) {
    HS.getLive({}, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get live feeds if no options were was provided', function(done) {
    HS.getLive(function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });
});

