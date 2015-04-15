var q = require('q');
var url = require('url');
var wreck = require('wreck');

function create() {
  return registerGame()
  .then(function (gameData) {
    return {
      gameId: gameData.gameId
    }
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

module.exports = {
  createGame: create
};
