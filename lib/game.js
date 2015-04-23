var React = require('react');
var PlayerPanel = require('./game/player-panel');
var $ = require('zepto-browserify').$;

var Game = module.exports = React.createClass({
  displayName: 'Game',
  componentDidMount: function () {
  },
  fetchGameData: function () {
    // boilerplate
    $.ajax({
      url: '/api/games/'+this.props.gameId,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(data);
      }
    });
  },
  getInitialState: function () {
    return {};
  },
  render: function () {
    return (
      React.createElement('section', null,
        React.createElement('h2', null, this.props.gameId),
        React.createElement(PlayerPanel, null)
      )
    );
  }
});

React.render(
  React.createElement(Game, {gameId: document.getElementById('gameId').value}),
  document.getElementById('content')
);
