module.exports = {
  login: {
    success: require('./login/success.json'),
    fail: require('./login/fail.json')
  },
  getLive: {
    success: require('./get-live/success.json'),
    success_date: require('./get-live/success_date.json'),
    fail: require('./get-live/fail.json')
  },
  getLiveStream: {
    success: require('./get-live-stream/success.json'),
    success_location: require('./get-live-stream/success_location.json'),
    fail: require('./get-live-stream/fail.json')
  },
  getLocations: {
    success: require('./get-locations/success.json'),
    fail: require('./get-live/fail.json')
  },
  getOnDemandDates: {
    success: require('./get-on-demand-dates/success.json'),
    fail: require('./get-live/fail.json')
  },
  listTeams: {
    success: require('./list-teams/success.json'),
    success_league: require('./list-teams/success_league.json'),
    fail: require('./get-live/fail.json')
  }
};

