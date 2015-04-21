var Bootstrap = require('react-bootstrap');
var React = require('react');

var Dice = module.exports = React.createClass({
  diceRoll: function (e) {
    e.preventDefault();
    var value = this.rollDice();
    this.disableDiceRoll();
    this.setState({diceValue: value});
  },
  disableDiceRoll: function () {
    document.getElementById('rollDice').disabled = true;
  },
  displayName: 'Dice',
  getInitialState: function () {
    return {diceValue: 0};
  },
  render: function () {
    return (
      React.createElement('section', null,
        React.createElement(Bootstrap.Panel, {header: 'Player Dice', bsStyle: 'primary'},
          React.createElement('p', null, this.state.diceValue),
          React.createElement('button', {id: 'rollDice', onClick: this.diceRoll}, 'Roll!')
        )
      )
    );
  },
  rollDice: function () {
    // assuming 1 dice
    return 1 + Math.floor(Math.random() * 6);
  }
});
