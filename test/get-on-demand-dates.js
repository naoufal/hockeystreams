var assert = require('chai').assert;
var nock   = require('nock');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('getOnDemandDates Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should get on-demand dates successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetOnDemandDates?token=valid')
      .reply(200, FIXTURES.getOnDemandDates.success);

    HS.getOnDemandDates({
      token: 'valid'
    }, function(err, res){
      done(err);
    });
  });

  it('should fail to get on-demand dates if invalid token is used', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetOnDemandDates?token=invalid')
      .reply(200, FIXTURES.getOnDemandDates.fail);

    HS.getOnDemandDates({
      token: 'invalid'
    }, function(err, res){
      done(err);
    });
  });

  it('should fail to get on-demand dates if site is offline', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetOnDemandDates?token=valid')
      .reply(404);

    HS.getOnDemandDates({
      token: 'valid'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get on-demand dates if no token was provided', function(done) {
    HS.getOnDemandDates(function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should throw error if callback is not provided', function(done) {
    try {
      HS.getOnDemandDates();
    } catch (e) {
      var error = assert.isNotNull(e);
      done(error);
    }
  });
});

