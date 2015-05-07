var Game = require('fenrirunbound-skuld');
var React = require('react');
var $ = require('zepto-browserify').$;

var Admin = module.exports = React.createClass({
  displayName: 'Admin',
  createGame: function () {
    var my = this;
    $.ajax({
      url: '/api/games',
      type: 'POST',
      dataType: 'json',
      success: function (data) {
        var gameId = data.gameId;
        my.setState({
          gameId: gameId,
          gameState: data
        });
        return my.joinGame(gameId);
      }
    });
  },
  getInitialState: function () {
    return {gameId: -1};
  },
  handleSubmit: function (e) {
    e.preventDefault();
    return this.createGame();
  },
  joinGame: function () {
    var my = this;
    Game.joinGame(this.state.gameState, {
      playerId: 1
    })
    .then(function (data) {
      return my.saveGame(data);
    })
    .done();
  },
  render: function () {
    return (
      React.createElement('form', {onSubmit: this.handleSubmit},
        React.createElement('fieldSet', null,
          React.createElement('legend', null, 'Create Game'),
          React.createElement('button', null, 'Create Game')
        ),
        React.createElement('fieldSet', null,
          React.createElement('legend', null, 'Game List'),
          React.createElement('h2', null, this.state.gameId)
        )
      )
    );
  },
  saveGame: function (gameData) {
    var my = this;
    var gameId = my.state.gameId;
    $.ajax({
      url: '/api/games/' + gameId,
      type: 'PUT',
      // TODO: only as a string due to player object being empty objects
      dataType: 'string',
      data: JSON.stringify(gameData),
      success: function (data) {
        my.setState({
          gameState: data
        });
      }
    });
  }
});

React.render(
  React.createElement(Admin, null),
  document.getElementById('content')
)
