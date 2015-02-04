var assert = require('chai').assert;
var nock   = require('nock');
var URI    = require('URIjs');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('getOnDemand Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should get on-demand successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetOnDemand?token=valid')
      .reply(200, FIXTURES.getOnDemand.success);

    HS.getOnDemand({
      token: 'valid'
    }, function(err, res){
      done(err);
    });
  });

  it('should get on-demand for specific date successfully', function(done) {
    var filter_date = '02/01/2015';
    var path = URI('/GetOnDemand').query({
      token: 'valid',
      date: filter_date
    }).href();

    var hs_api = nock('https://api.hockeystreams.com')
      .get(path)
      .reply(200, FIXTURES.getOnDemand.success_date);

    HS.getOnDemand({
      token: 'valid',
      date: filter_date
    }, function(err, res){
      done(err);
    });
  });

  it('should get on-demand for specific team successfully', function(done) {
    var filter_team = 'Ottawa Senators';
    var path = URI('/GetOnDemand').escapeQuerySpace(false).query({
      token: 'valid',
      team: filter_team
    }).href();

    var hs_api = nock('https://api.hockeystreams.com')
      .get(path)
      .reply(200, FIXTURES.getOnDemand.success_team);

    HS.getOnDemand({
      token: 'valid',
      team: filter_team
    }, function(err, res){
      done(err);
    });
   });

  it('should fail to get on-demand if site is offline', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetOnDemand?token=valid')
      .reply(404);

    HS.getOnDemand({
      token: 'valid'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });


  it('should fail to get on-demand if date is misformatted', function(done) {
    HS.getOnDemand({
      token: 'valid',
      date: '02-02-2015'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get on-demand if no token was provided', function(done) {
    HS.getOnDemand({}, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get on-demand if no options are provided', function(done) {
    HS.getOnDemand(function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should throw error if callback is not provided', function(done) {
    try {
      HS.getOnDemand();
    } catch (e) {
      var error = assert.isNotNull(e);
      done(error);
    }
  });
});

