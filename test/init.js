var _             = require('lodash');
var assert        = require('chai').assert;
var HockeyStreams = require('../index');

describe('init Method', function() {
  var METHODS;

  before(function() {
    METHODS = [
      'login',
      'getLive',
      'getLiveStream',
      'getLocations',
      'getOnDemandDates',
      'getOnDemand',
      'getOnDemandStream',
      'getHighlights',
      'getCondensedGames',
      'listTeams'
    ];
  });

  it('should initialize all methods', function() {
    var HS = HockeyStreams.init({
      key: 'FAKE KEY',
      scores_key: 'FAKE KEY'
    });

    assert.isObject(HS);
    // assert all methods exist
    _.each(METHODS, function(m) {
      assert.isFunction(HS[m]);
    });

    // assert scores method exists
    assert.isFunction(HS.scores);
  });

  it('should initialize all but scores method', function() {
    var HS = HockeyStreams.init({
      key: 'FAKE KEY'
    });

    assert.isObject(HS);

    // assert all methods exist
    _.each(METHODS, function(m) {
      assert.isFunction(HS[m]);
    });

    // assert score method doesn't exist
    assert.isUndefined(HS.scores);
  });

  it('should only initialize scores method', function() {
    var HS = HockeyStreams.init({
      scores_key: 'FAKE KEY'
    });

    assert.isObject(HS);
    assert.isFunction(HS.scores);

    // assert all other methods don't exist
    _.each(METHODS, function(m) {
      assert.isUndefined(HS[m]);
    });

  });

  it('should fail to initialize if no keys are specified', function() {
    try {
      var HS = HockeyStreams.init({});
    } catch(err) {
      assert.instanceOf(err, Error);
    }
  });

  it('should fail to initialize if no object specified', function() {
    try {
      var HS = HockeyStreams.init();
    } catch(err) {
      assert.instanceOf(err, Error);
    }
  });
});

