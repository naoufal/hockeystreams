var _       = require('lodash');
var request = require('superagent');
var URI     = require('URIjs');

var BASE_URL = require('../../config').API_URL;

var getOnDemandDates = function(opts, cb) {
  var url = URI(BASE_URL + '/GetOnDemandDates');

  if (_.isFunction(opts)) {
    cb = opts;
  }

  if (!cb) {
    throw new Error('You must provide a callback');
  }


  if (!opts.token) {
    return cb(new Error('You must provide a token'));
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

module.exports = getOnDemandDates;

