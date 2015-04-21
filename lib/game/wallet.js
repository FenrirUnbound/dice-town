var Bootstrap = require('react-bootstrap');
var React = require('react');

var Wallet = module.exports = React.createClass({
  displayName: 'PlayerWallet',
  render: function () {
    return (
      React.createElement(Bootstrap.Panel, {header: 'Wallet', bsStyle: 'success'},
        React.createElement('p', null, '$$ ' + this.props.walletValue)
      )
    );
  }
});
