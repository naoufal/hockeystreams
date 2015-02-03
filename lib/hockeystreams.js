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
          if (err) {
            return cb(err);
          }

          if (res.error) {
            return cb(new Error(res.body.msg));
          }

          cb(null, res.body);
        });
    };

    // Get Live
    // --------
    HS.getLive = function(opts, cb) {
      var url = URI(BASE_URL + '/GetLive');

      if (_.isFunction(opts)) {
        cb = opts;
        return cb(new Error('You must provide a callback'));
      }

      if (!opts.token) {
        return cb(new Error('You must provide a token'));
      }
      if (opts.date && !/\d{2}\/\d{2}\/\d{4}/.test(opts.date)) {
        return cb(new Error('Dates must be formatted as MM/DD/YYYY'));
      }

      url = url.query(opts).href();
      request.get(url)
      .end(function(err, res) {
        if (err) {
          return cb(err);
        }

        if (res.body.status === 'Failed') {
          return cb(new Error(res.body.msg));
        }

        cb(null, res.body);
      });
    };

    // Get Live Stream
    // ---------------
    HS.getLiveStream = function(opts, cb) {
      var url = URI(BASE_URL + '/GetLiveStream');

      if (!opts.token || !opts.id) {
        throw new Error('You must provide a token and a game ID');
      }

      if (_.isFunction(opts)) {
        cb = opts;
      }

      if (!cb) {
        throw new Error('You must provide a callback');
      }

      url = url.query(opts).href();
      request.get(url)
      .end(function(err, res) {
        if (err) {
          return cb(err);
        }

        cb(null, res.body);
      });
    };

    // Get Locations
    // -------------
    HS.getLocations = function(cb) {
      var url = URI(BASE_URL + '/GetLocations').href();

      if (!cb) {
        throw new Error('You must provide a callback');
      }

      request.get(url)
      .end(function(err, res) {
        if (err) {
          return cb(err);
        }

        cb(null, res.body);
      });
    };

    // Get On-Demand Dates
    // -------------------
    HS.getOnDemandDates = function(opts, cb) {
      var url = URI(BASE_URL + '/GetOnDemandDates');

      if (!opts.token) {
        throw new Error('You must provide a token');
      }

      if (_.isFunction(opts)) {
        cb = opts;
      }

      if (!cb) {
        throw new Error('You must provide a callback');
      }

      url = url.query(opts).href();
      request.get(url)
      .end(function(err, res) {
        if (err) {
          return cb(err);
        }

        cb(null, res.body);
      });
    };

    // Get On-Demand
    // -------------
    HS.getOnDemand = function(opts, cb) {
      var url = URI(BASE_URL + '/GetOnDemand');

      if (!opts.token) {
        throw new Error('You must provide a token and a game ID');
      }

      if (_.isFunction(opts)) {
        cb = opts;
      }

      if (!cb) {
        throw new Error('You must provide a callback');
      }

      if (opts.date && !/\d{2}\/\d{2}\/\d{4}/.test('12/12/2014')) {
        cb(new Error('Dates must be formatted as MM/DD/YYYY'));
      }

      url = url.query(opts).href();
      request.get(url)
      .end(function(err, res) {
        if (err) {
          return cb(err);
        }

        cb(null, res.body);
      });
    };

    // Get On-Demand Stream
    // --------------------
    HS.getOnDemandStream = function(opts, cb) {
      var url = URI(BASE_URL + '/GetOnDemandStream');

      if (!opts.token || !opts.id) {
        throw new Error('You must provide a token and a game ID');
      }

      if (_.isFunction(opts)) {
        cb = opts;
      }

      if (!cb) {
        throw new Error('You must provide a callback');
      }

      url = url.query(opts).href();
      request.get(url)
      .end(function(err, res) {
        if (err) {
          return cb(err);
        }

        cb(null, res.body);
      });
    };

    // Get Highlights
    // --------------
    HS.getHighlights = function(opts, cb) {
      var url = URI(BASE_URL + '/GetHighlights');

      if (!opts.token) {
        throw new Error('You must provide a token and a game ID');
      }

      if (_.isFunction(opts)) {
        cb = opts;
      }

      if (!cb) {
        throw new Error('You must provide a callback.');
      }

      if (opts.date && !/\d{2}\/\d{2}\/\d{4}/.test('12/12/2014')) {
        cb(new Error('Dates must be formatted as MM/DD/YYYY'));
      }

      url = url.query(opts).href();
      request.get(url)
      .end(function(err, res) {
        if (err) {
          return cb(err);
        }

        cb(null, res.body);
      });
    };

    // Get Condensed Games
    // -------------------
    HS.getCondensedGames = function(opts, cb) {
      var url = URI(BASE_URL + '/GetCondensedGames');

      if (!opts.token) {
        throw new Error('You must provide a token and a game ID');
      }

      if (_.isFunction(opts)) {
        cb = opts;
      }

      if (!cb) {
        throw new Error('You must provide a callback');
      }

      if (opts.date && !/\d{2}\/\d{2}\/\d{4}/.test('12/12/2014')) {
        cb(new Error('Dates must be formatted as MM/DD/YYYY'));
      }

      url = url.query(opts).href();
      request.get(url)
      .end(function(err, res) {
        if (err) {
          return cb(err);
        }

        cb(null, res.body);
      });
    };

    // List Teams
    // ----------
    HS.listTeams = function(opts, cb) {
      var url = URI(BASE_URL + '/ListTeams');

      if (!opts.token) {
        throw new Error('You must provide a token and a game ID');
      }

      if (_.isFunction(opts)) {
        cb = opts;
      }

      url = url.query(opts).href();
      request.get(url)
      .end(function(err, res) {
        if (err) {
          return cb(err);
        }

        cb(null, res.body);
      });
    };
  }

  if (options.scores_key) {
    // Scores
    // ------
    HS.scores = function(opts, cb) {
      var url = URI(BASE_URL + '/Scores');

      if (_.isFunction(opts)) {
        cb   = opts;
        opts = {};
      }

      if (!cb) {
        throw new Error('You must provide a callback');
      }

      if (opts.date && !/\d{2}\/\d{2}\/\d{4}/.test('12/12/2014')) {
        cb(new Error('Dates must be formatted as MM/DD/YYYY'));
      }

      // add API key
      opts.key = options.scores_key;

      url = url.query(opts).href();
      request.get(url)
        .end(function(err, res) {
          if (err) {
            return cb(err);
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

