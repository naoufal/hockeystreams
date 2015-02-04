var _       = require('lodash');
var request = require('superagent');
var URI     = require('URIjs');

var BASE_URL = require('../config').API_URL;

var createClient = function(options) {
  var HS = {};

  if (!options) {
    throw new Error('You must provide a HockeyStreams api key or scores key');
  }

  if (!options.key && !options.scores_key) {
    throw new Error('You must provide a HockeyStreams api key or scores key');
  }

  if (options.key) {
    // Login
    // -----
    HS.login = function(opts, cb) {
      var url = URI(BASE_URL + '/Login').href();

      if (_.isFunction(opts)) {
        cb = opts;
        return cb(new Error('You must provide a callback'));
      }

      if (!opts.username || !opts.password) {
        return cb(new Error('You must provide a username and password'));
      }

      request.post(url)
        .send({
          key: options.key,
          username: opts.username,
          password: opts.password,
        })
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end(function(err, res) {
          if (res.error) {
            return cb(new Error(res.body.msg));
          }

          cb(null, res.body);
        });
    };

    // Get Live
    // --------
    HS.getLive = require('./methods/get-live');
    // Get Live Stream
    // ---------------
    HS.getLiveStream = require('./methods/get-live-stream');

    // Get Locations
    // -------------
    HS.getLocations = require('./methods/get-locations');

    // Get On-Demand Dates
    // -------------------
    HS.getOnDemandDates = require('./methods/get-on-demand-dates');
    // Get On-Demand
    // -------------
    HS.getOnDemand = require('./methods/get-on-demand');
    // Get On-Demand Stream
    // --------------------
    HS.getOnDemandStream = require('./methods/get-on-demand-stream');

    // Get Highlights
    // --------------
    HS.getHighlights = require('./methods/get-highlights');
    // Get Condensed Games
    // -------------------
    HS.getCondensedGames = require('./methods/get-condensed-games');

    // List Teams
    // ----------
    HS.listTeams = require('./methods/list-teams');
  }

  if (options.scores_key) {
    // Scores
    // ------
    HS.scores = function(opts, cb) {
      var url = URI(BASE_URL + '/Scores');

      if (_.isFunction(opts)) {
        cb = opts;
        opts = {};
      }

      if (!cb) {
        throw new Error('You must provide a callback');
      }

      if (opts.date && !/\d{2}\/\d{2}\/\d{4}/.test(opts.date)) {
        return cb(new Error('Dates must be formatted as MM/DD/YYYY'));
      }

      // add API key
      opts.key = options.scores_key;

      url = url.query(opts).href();
      request.get(url)
        .end(function(err, res) {
          if (res.error) {
            return cb(new Error(res.body.msg));
          }

          cb(null, res.body);
        });
    };
  }

  return HS;
};

module.exports = {
  init: createClient
};

