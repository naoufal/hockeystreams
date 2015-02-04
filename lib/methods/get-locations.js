var request = require('superagent');
var URI     = require('URIjs');

var BASE_URL = require('../../config').API_URL;

var getLocations = function(cb) {
  var url = URI(BASE_URL + '/GetLocations').href();

  if (!cb) {
    throw new Error('You must provide a callback');
  }

  request.get(url)
  .end(function(err, res) {
    if (res.error) {
      return cb(new Error(res.body.msg));
    }

    cb(null, res.body);
  });
};

module.exports = getLocations;

