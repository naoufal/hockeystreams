var _       = require('lodash');
var request = require('superagent');
var URI     = require('URIjs');

var BASE_URL = require('../../config').API_URL;

var getHighlights = function(opts, cb) {
  var url = URI(BASE_URL + '/GetHighlights');

  if (_.isFunction(opts)) {
    cb = opts;
  }

  if (!cb) {
    throw new Error('You must provide a callback');
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
    if (res.error) {
      return cb(new Error(res.body.msg));
    }

    cb(null, res.body);
  });
};

module.exports = getHighlights;

