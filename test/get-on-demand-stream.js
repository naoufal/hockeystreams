var assert = require('chai').assert;
var nock   = require('nock');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('getOnDemandStream Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should get on-demand stream successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetOnDemandStream?token=valid&id=34725')
      .reply(200, FIXTURES.getOnDemandStream.success);

    HS.getOnDemandStream({
      token: 'valid',
      id: 34725
    }, function(err, res){
      done(err);
    });
  });

  it('should get on-demand stream at specific location successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetOnDemandStream?token=valid&id=34725&location=Europe')
      .reply(200, FIXTURES.getOnDemandStream.success_location);

    HS.getOnDemandStream({
      token: 'valid',
      id: 34725,
      location: 'Europe'
    }, function(err, res){
      var is_europe = assert.strictEqual(res.streams[0].location, 'Europe');
      done(is_europe);
    });
  });

  it('should fail to get on-demand stream if site is offline', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetOnDemandStream?token=valid&id=34725')
      .reply(404);

    HS.getOnDemandStream({
      token: 'valid',
      id: 34725
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });


  it('should fail to get on-demand stream without id', function(done) {
    HS.getOnDemandStream({
      token: 'valid'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get on-demand stream if invalid token is used', function(done) {
    var hs_api = nock("https://api.hockeystreams.com")
      .get("/GetOnDemandStream?token=invalid&id=12345")
      .reply(200, FIXTURES.getOnDemandStream.fail);

    HS.getOnDemandStream({
      token: 'invalid',
      id: 12345,
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get on-demand stream if no token was provided', function(done) {
    HS.getOnDemandStream({}, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get on-demand stream if no options were was provided', function(done) {
    HS.getOnDemandStream(function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });
});

