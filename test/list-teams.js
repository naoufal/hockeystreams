var _      = require('lodash');
var assert = require('chai').assert;
var nock   = require('nock');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('listTeams Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should get teams list successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/ListTeams?token=valid')
      .reply(200, FIXTURES.listTeams.success);

    HS.listTeams({
      token: 'valid'
    }, function(err, res){
      done(err);
    });
  });

  it('should get NHL teams list successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/ListTeams?token=valid&league=NHL')
      .reply(200, FIXTURES.listTeams.success_league);

    HS.listTeams({
      token: 'valid',
      league: 'NHL'
    }, function(err, res){
      var error;
      _.each(res.teams, function(t) {
        if (t.league !== 'NHL') {
          error = new Error('Some of the teams returned are not in the NHL');
        }
      });

      done(error);
    });
  });

  it('should fail to get teams list if site is offline', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/ListTeams?token=valid')
      .reply(404);

    HS.listTeams({
      token: 'valid'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get teams list if invalid token is used', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/ListTeams?token=invalid')
      .reply(200, FIXTURES.listTeams.fail);

    HS.listTeams({
      token: 'invalid'
    }, function(err, res){
      done(err);
    });
  });

  it('should fail to get teams list if no token was provided', function(done) {
    HS.listTeams(function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should throw error if callback is not provided', function(done) {
    try {
      HS.listTeams();
    } catch (e) {
      var error = assert.isNotNull(e);
      done(error);
    }
  });
});

