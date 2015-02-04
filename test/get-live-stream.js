var assert = require('chai').assert;
var nock   = require('nock');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('getLiveStream Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should get live stream successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetLiveStream?token=valid&id=34725')
      .reply(200, FIXTURES.getLiveStream.success);

    HS.getLiveStream({
      token: 'valid',
      id: 34725
    }, function(err, res){
      done(err);
    });
  });

  it('should get live stream at specific location successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetLiveStream?token=valid&id=34725&location=Europe')
      .reply(200, FIXTURES.getLiveStream.success_location);

    HS.getLiveStream({
      token: 'valid',
      id: 34725,
      location: 'Europe'
    }, function(err, res){
      var is_europe = assert.strictEqual(res.streams[0].location, 'Europe');
      done(is_europe);
    });
  });

  it('should fail to get live stream if site is offline', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetLiveStream?token=valid&id=34725')
      .reply(404);

    HS.getLiveStream({
      token: 'valid',
      id: 34725,
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });


  it('should fail to get live stream without id', function(done) {
    HS.getLiveStream({
      token: 'valid'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get live stream if invalid token is used', function(done) {
    var hs_api = nock("https://api.hockeystreams.com")
      .get("/GetLiveStream?token=invalid&id=12345")
      .reply(200, FIXTURES.getLiveStream.fail);

    HS.getLiveStream({
      token: 'invalid',
      id: 12345,
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get live stream if no token was provided', function(done) {
    HS.getLiveStream({}, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get live stream if no options were was provided', function(done) {
    HS.getLiveStream(function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });
});

