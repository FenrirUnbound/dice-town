var React = require('react');

var Wallet = module.exports = React.createClass({
  displayName: 'PlayerWallet',
  render: function () {
    return (
      React.createElement('section', null,
        React.createElement('form', null,
          React.createElement('fieldset', null,
            React.createElement('legend', null, 'Wallet'),
            React.createElement('font', null, '$$ ' + this.props.walletValue)
          )
        )
      )
    );
  }
});
