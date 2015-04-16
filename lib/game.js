var Dice = require('./game/dice');
var React = require('react');
var Wallet = require('./game/wallet');
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
        React.createElement(Dice, null),
        React.createElement(Wallet, {walletValue: 0})
      )
    );
  }
});

React.render(
  React.createElement(Game, {gameId: document.getElementById('gameId').value}),
  document.getElementById('content')
);
