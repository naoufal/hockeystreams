var assert = require('chai').assert;
var nock   = require('nock');
var URI    = require('URIjs');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('scores Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      scores_key: 'valid'
    });
  });

  it('should get scores successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/Scores?key=valid')
      .reply(200, FIXTURES.scores.success);

    HS.scores(function(err, res){
      done(err);
    });
  });

  it('should get scores for specific date successfully', function(done) {
    var filter_date = '02/01/2015';
    var path = URI('/Scores').query({
      date: filter_date,
      key: 'valid'
    }).href();

    var hs_api = nock('https://api.hockeystreams.com')
      .get(path)
      .reply(200, FIXTURES.scores.success_date);

    HS.scores({
      date: filter_date
    }, function(err, res){
      done(err);
    });
  });

  it('should get scores for specific team successfully', function(done) {
    var filter_team = 'Ottawa Senators';
    var path = URI('/Scores').escapeQuerySpace(false).query({
      team: filter_team,
      key: 'valid'
    }).href();

    var hs_api = nock('https://api.hockeystreams.com')
      .get(path)
      .reply(200, FIXTURES.scores.success_team);

    HS.scores({
      team: filter_team
    }, function(err, res){
      done(err);
    });
   });

  it('should fail to get scores if site is offline', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/Scores?key=valid')
      .reply(404);

    HS.scores({
      key: 'valid'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });


  it('should fail to get scores if date is misformatted', function(done) {
    HS.scores({
      date: '02-02-2015'
    }, function(err, res){
      var error = assert.isNotNull(err);
      done(error);
    });
  });

  it('should throw error if callback is not provided', function(done) {
    try {
      HS.scores();
    } catch (e) {
      var error = assert.isNotNull(e);
      done(error);
    }
  });
});

