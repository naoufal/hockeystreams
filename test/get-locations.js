var assert = require('chai').assert;
var nock   = require('nock');

var HockeyStreams = require('../index');

var FIXTURES = require('./fixtures/index');

describe('getLocations Method', function() {
  var HS;

  before(function() {
    HS = require('../index.js').init({
      key: 'valid-key',
      scores_key: 'valid-scores-key'
    });
  });

  it('should get locations successfully', function(done) {
    var hs_api = nock('https://api.hockeystreams.com')
      .get('/GetLocations')
      .reply(200, FIXTURES.getLocations.success);

    HS.getLocations(function(err, res){
      done(err);
    });
  });

  it('should throw error if callback is not provided', function(done) {
    try {
      HS.getLocations();
    } catch (e) {
      var error = assert.isNotNull(e);
      done(error);
    }
  });
});

