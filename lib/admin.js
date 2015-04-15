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
        my.setState({
          gameId: data.gameId
        });
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
  }
});

React.render(
  React.createElement(Admin, null),
  document.getElementById('content')
)
