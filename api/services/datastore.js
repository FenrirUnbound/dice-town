var q = require('q');
var url = require('url');
var wreck = require('wreck');

function create() {
  return registerGame()
  .then(function (gameData) {
    return gameData.gameId;
  });
}

function get(gameId) {
  var targetUrl = url.format({
    host: process.env.GAME_HOST,
    pathname: '/api/games/dice_town/' + gameId,
    protocol: 'http'
  });

  return q.ninvoke(wreck, 'get', targetUrl, {json: true})
  .spread(function completeDatastoreRequest(response, payload) {
    return payload;
  });
}

function registerGame() {
  var targetUrl = url.format({
    host: process.env.GAME_HOST,
    pathname: '/api/games/dice_town',
    protocol: 'http'
  });

  return q.ninvoke(wreck, 'post', targetUrl, {json: true})
  .spread(function (response, payload) {
    return payload;
  });
}

function save(gameId, gameData) {
  var targetUrl = url.format({
    host: process.env.GAME_HOST,
    pathname: '/api/games/dice_town/' + gameId,
    protocol: 'http'
  });
  var payload = JSON.stringify(gameData);

  return q.ninvoke(wreck, 'put', targetUrl, {json: true, payload: payload})
  .spread(function (response, payload) {
    return gameData;
  });

}

module.exports = {
  createGame: create,
  fetchGame: get,
  saveGame: save
};
