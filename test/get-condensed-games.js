var assert = require('chai').assert;
var nock   = require('nock');
var URI    = require('URIjs');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('getCondensedGames Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should get condensed games for specific date successfully', function(done) {
    var filter_date = '02/01/2015';
    var path = URI('/GetCondensedGames').query({
      token: 'valid',
      date: filter_date
    }).href();

    var hs_api = nock('https://api.hockeystreams.com')
      .get(path)
      .reply(200, FIXTURES.getCondensedGames.success_date);

    HS.getCondensedGames({
      token: 'valid',
      date: filter_date
    }, function(err, res){
      done(err);
    });
  });

  it('should get condensed games for specific team successfully', function(done) {
    var filter_team = 'Ottawa Senators';
    var path = URI('/GetCondensedGames').escapeQuerySpace(false).query({
      token: 'valid',
      team: filter_team
    }).href();

    var hs_api = nock('https://api.hockeystreams.com')
      .get(path)
      .reply(200, FIXTURES.getCondensedGames.success_team);

    HS.getCondensedGames({
      token: 'valid',
      team: filter_team
    }, function(err, res){
      done(err);
    });
   });

  it('should fail to get condensed games if site is offline', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetCondensedGames?token=valid')
      .reply(404);

    HS.getCondensedGames({
      token: 'valid'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get condensed games if date is misformatted', function(done) {
    HS.getCondensedGames({
      token: 'valid',
      date: '02-02-2015'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get condensed games if no token was provided', function(done) {
    HS.getCondensedGames({}, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should fail to get condensed games if no options are provided', function(done) {
    HS.getCondensedGames(function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });


  it('should throw error if callback is not provided', function(done) {
    try {
      HS.getCondensedGames();
    } catch (e) {
      var error = assert.isNotNull(e);
      done(error);
    }
  });
});

