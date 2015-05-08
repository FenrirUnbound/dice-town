var React = require('react');
var PlayerPanel = require('./game/player-panel');
var Q = require('q');
var $ = require('zepto-browserify').$;

var Game = module.exports = React.createClass({
  displayName: 'Game',
  componentDidMount: function () {
    var my = this;

    my.fetchGameData()
    .then(function (gameData) {
      my.setState({
        gameState: gameData
      });
      return gameData;
    })
    .done();
  },
  determineSelf: function () {
    return 1;
  },
  fetchGameData: function () {
    var deferred = Q.defer();

    $.ajax({
      url: '/api/games/'+this.props.gameId,
      type: 'GET',
      dataType: 'json',
      error: function (jxhr, type, error) {
        return deferred.reject(error);
      },
      success: function (data) {
        return deferred.resolve(data);
      }
    });

    return deferred.promise;
  },
  getInitialState: function () {
    var playerId = this.determineSelf();
    var falseGameData = {
      players: {}
    };

    falseGameData[playerId] = {};

    return {
      gameData: falseGameData
    };
  },
  render: function () {
    var playerId = this.determineSelf();
    var playerData = this.state.gameData.players[playerId];

    return (
      React.createElement('section', null,
        React.createElement('h2', null, this.props.gameId),
        React.createElement(PlayerPanel, null, playerData)
      )
    );
  }
});

React.render(
  React.createElement(Game, {gameId: document.getElementById('gameId').value}),
  document.getElementById('content')
);
