var Bootstrap = require('react-bootstrap');
var Dice = require('./dice');
var Properties = require('./properties');
var React = require('react');
var Wallet = require('./wallet');

var PlayerPanel = module.exports = React.createClass({
  displayName: 'Player Panel',
  getDefaultProps: function () {
    return {
      wallet: 0
    };
  },
  render: function () {
    var walletValue = this.props.wallet;

    return (
      React.createElement('section', null,
        React.createElement('section', {className: 'player-panel-row'},
          React.createElement('div', {className: 'col-xs-6 player-panel' },
            React.createElement(Wallet, {walletValue: walletValue})
          ),
          React.createElement('div', {className: 'col-xs-6'},
            React.createElement(Dice, null)
          )
        ),
        React.createElement('section', null,
          React.createElement('div', {className: 'col-xs-12'},
            React.createElement(Properties, {className: 'col-xs-10'})
          )
        )
      )
    );
  }
});
