```
    __               __                   __
   / /_  ____  _____/ /_____  __  _______/ /_________  ____ _____ ___  _____
  / __ \/ __ \/ ___/ //_/ _ \/ / / / ___/ __/ ___/ _ \/ __ `/ __ `__ \/ ___/
 / / / / /_/ / /__/ ,< /  __/ /_/ (__  ) /_/ /  /  __/ /_/ / / / / / (__  )
/_/ /_/\____/\___/_/|_|\___/\__, /____/\__/_/   \___/\__,_/_/ /_/ /_/____/
                           /____/
```
hockeystreams
==================

A node.js wrapper for the [HockeySteams API](https://www.hockeystreams.com/api).

[![NPM Version](https://img.shields.io/npm/v/hockeystreams.svg)](https://www.npmjs.org/package/hockeystreams)
[![Build Status](https://travis-ci.org/naoufal/hockeystreams.svg?branch=master)](https://travis-ci.org/naoufal/hockeystreams)
[![Coverage Status](https://coveralls.io/repos/naoufal/hockeystreams/badge.svg)](https://coveralls.io/r/naoufal/hockeystreams)

## Install

```shell
npm i --save hockeystreams
```
## Requirements
#### API Key
The HockeyStreams API requires an API Key which can be obtained [here](https://www.hockeystreams.com/api).

## Documentation

### Functions
- [`init`](https://github.com/naoufal/hockeystreams#initoptions)
- [`login`](https://github.com/naoufal/hockeystreams#loginoptions-callback)
- [`getLive`](https://github.com/naoufal/hockeystreams#getliveoptions-callback)
- [`getLiveStream`](https://github.com/naoufal/hockeystreams#getlivestreamoptions-callback)
- [`getLocations`](https://github.com/naoufal/hockeystreams#getlocationscallback)
- [`getOnDemandDates`](https://github.com/naoufal/hockeystreams#getondemanddatesoptions-callback)
- [`getOnDemand`](https://github.com/naoufal/hockeystreams#getondemandoptions-callback)
- [`getOnDemandStream`](https://github.com/naoufal/hockeystreams#getondemandstreamoptions-callback)
- [`getHighlights`](https://github.com/naoufal/hockeystreams#gethighlightsoptions-callback)
- [`getCondensedGames`](https://github.com/naoufal/hockeystreams#getcondensedgamesoptions-callback)
- [`listTeams`](https://github.com/naoufal/hockeystreams#listteamsoptions-callback)
- [`scores`](https://github.com/naoufal/hockeystreams#scoresoptions-callback)

## Functions

### init(options)
Initializes the HockeyStreams API wrapper.  The methods returned will depend on which keys are passed as options.

_NOTE: Keys can be obtained on the [HockeyStreams API page](https://www.hockeystreams.com/api)._

__Arguments__
- `options` - An _Object_ containing `key` and/or `scores_key`.

__Examples__
```js
var HS = require('hockeystreams').init({
  key: 'YOUR HOCKEYSTREAMS API KEY',
  scores_key: 'YOUR HOCKEYSTREAMS SCORES API KEY'
});
```
<hr>

### login(options, callback)
Authenticates a user, and returns their membership status, as well as a authentication token to use for retrieving the rest of the resources.

__Arguments__
- `options`  - An _Object_ containing `username` and `password`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.login({
  username: 'USERS USERNAME',
  password: 'USERS PASSWORD'
}, function(err, res){
  // Do your thing
});
```
<hr>

### getLive(options, callback)
Retrieve a list of live streams.

__Arguments__
- `options`  - An _Object_ containing a user `token` and optionally a `date`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.getLive({
  date: 'MM/DD/YYY',  // => Optional
  token: 'USER TOKEN' // => Retrieved from login method
}, function(err, res){
  // Do your thing
});
```
<hr>

### getLiveStream(options, callback)
Retrieve a specific live stream, with sources (iStream, WMV and Flash).

__Arguments__
- `options`  - An _Object_ containing an live game `id`, a user `token` and optionally a `location`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.getLiveStream({
  id: '12345',                             // => Required
  location: 'North America - East Canada', // => Optional
  token: 'USER TOKEN'                      // => Retrieved from login method
}, function(err, res){
  // Do your thing
});
```
<hr>

### getLocations(callback)
Retrieve a list of availalbe streaming locations for live streams.

__Arguments__
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.getLocations(function(err, res){
  // Do your thing
});
```
<hr>

### getOnDemandDates(options, callback)
Retrieve a list of dates where on demand feeds are available.

__Arguments__
- `options`  - An _Object_ containing a user `token`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.getOnDemandDates({
  token: 'USER TOKEN' // => Retrieved from login method
}, function(err, res){
  // Do your thing
});
```
<hr>

### getOnDemand(options, callback)
Retrieve a list of on demand streams.

__Arguments__
- `options`  - An _Object_ containing a user `token` and optionally a `date` and/or a `team`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.getOnDemand({
  date: 'MM/DD/YYYY',      // => Optional
  team: 'Ottawa Senators', // => Optional
  token: 'USER TOKEN'      // => Retrieved from login method
}, function(err, res){
  // Do your thing
});
```
<hr>

### getOnDemandStream(options, callback)
Retrieve a specific on demand stream, with sources (iStream, WMV and Flash).

__Arguments__
- `options`  - An _Object_ containing an on-demand `id`, a user `token` and optionally a `location`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.getOnDemandStream({
  id: '12345',                             // => Required
  location: 'North America - East Canada', // => Optional
  token: 'USER TOKEN'                      // => Retrieved from login method
}, function(err, res){
  // Do your thing
});
```
<hr>

### getHighlights(options, callback)
Retrieve a list of highlights.

__Arguments__
- `options`  - An _Object_ containing a user `token` and optionally a `date` and/or a `team`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.getHighlights({
  date: 'MM/DD/YYYY',      // => Optional
  team: 'Ottawa Senators', // => Optional
  token: 'USER TOKEN'      // => Retrieved from login method
}, function(err, res){
  // Do your thing
});
```
<hr>

### getCondensedGames(options, callback)
Retrieve a list of condensed games.

__Arguments__
- `options`  - An _Object_ containing a user `token` and optionally a `date` and/or a `team`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.getCondensedGames({
  date: 'MM/DD/YYYY',      // => Optional
  team: 'Ottawa Senators', // => Optional
  token: 'USER TOKEN'      // => Retrieved from login method
}, function(err, res){
  // Do your thing
});
```
<hr>

### listTeams(options, callback)
Get a list of all previous live or on-demand teams.

__Arguments__
- `options`  - An _Object_ containing a user `token` and optionally a `league`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.listTeams({
  league: 'NHL',      // => Optional
  token: 'USER TOKEN' // => Retrieved from login method
}, function(err, res){
  // Do your thing
});
```
<hr>

### scores(options, callback)
Scores API.

__Arguments__
- `options`  - An _Object_ containing a scores api `key` and optionally a `date` and/or `event`.
- `callback` - A _Function_ with `error` and `response` arguments.

__Examples__
```js
HS.scores({
  date: 'MM/DD/YYYY',   // => Optional
  'event': 'NHL'        // => Optional
}, function(err, res){
  // Do your thing
});
```
<hr>
