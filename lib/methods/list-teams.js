var _       = require('lodash');
var request = require('superagent');
var URI     = require('URIjs');

var BASE_URL = require('../../config').API_URL;

var listTeams = function(opts, cb) {
  var url = URI(BASE_URL + '/ListTeams');

  if (_.isFunction(opts)) {
    cb = opts;
  }

  if (!opts.token) {
    return cb(new Error('You must provide a token and a game ID'));
  }


  url = url.query(opts).href();
  request.get(url)
  .end(function(err, res) {
    if (res.error) {
      return cb(new Error(res.body.msg));
    }

    cb(null, res.body);
  });
};

module.exports = listTeams;

