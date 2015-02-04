var _       = require('lodash');
var request = require('superagent');
var URI     = require('URIjs');

var BASE_URL = require('../../config').API_URL;

var getOnDemandStream = function(opts, cb) {
  var url = URI(BASE_URL + '/GetOnDemandStream');

  if (_.isFunction(opts)) {
    cb = opts;
  }

  if (!opts.token || !opts.id) {
    return cb(Error('You must provide a token and a game ID'));
  }

  url = url.query(opts).href();
  request.get(url)
  .end(function(err, res) {
    if (res.error) {
      return cb(new Error(res.body.msg));
    }

    if (res.body.status === 'Failed') {
      return cb(new Error(res.body.msg));
    }

    cb(null, res.body);
  });
};

module.exports = getOnDemandStream;

