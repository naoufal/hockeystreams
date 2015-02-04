var assert = require('chai').assert;
var nock   = require('nock');
var URI    = require('URIjs');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('getHighlights Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should get highlights  successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetHighlights?token=valid')
      .reply(200, FIXTURES.getHighlights.success);

    HS.getHighlights({
      token: 'valid'
    }, function(err, res){
      done(err);
    });
  });

  it('should get highlights  for specific date successfully', function(done) {
    var filter_date = '02/01/2015';
    var path = URI('/GetHighlights').query({
      token: 'valid',
      date: filter_date
    }).href();

    var hs_api = nock('https://api.hockeystreams.com')
      .get(path)
      .reply(200, FIXTURES.getHighlights.success_date);

    HS.getHighlights({
      token: 'valid',
      date: filter_date
    }, function(err, res){
      done(err);
    });
  });

  it('should get highlights for specific team successfully', function(done) {
    var filter_team = 'Ottawa Senators';
    var path = URI('/GetHighlights').escapeQuerySpace(false).query({
      token: 'valid',
      team: filter_team
    }).href();

    var hs_api = nock('https://api.hockeystreams.com')
      .get(path)
      .reply(200, FIXTURES.getHighlights.success_team);

    HS.getHighlights({
      token: 'valid',
      team: filter_team
    }, function(err, res){
      done(err);
    });
   });

  it('should fail to get highlights if site is offline', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetHighlights?token=valid')
      .reply(404);

    HS.getHighlights({
      token: 'valid'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get highlights  if date is misformatted', function(done) {
    HS.getHighlights({
      token: 'valid',
      date: '02-02-2015'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get highlights  if no token was provided', function(done) {
    HS.getHighlights({}, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get highlights  if no options are provided', function(done) {
    HS.getHighlights(function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });


  it('should throw error if callback is not provided', function(done) {
    try {
      HS.getHighlights();
    } catch (e) {
      var error = assert.isNotNull(e);
      done(error);
    }
  });
});

