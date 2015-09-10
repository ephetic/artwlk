import React from 'react';
import classNames from 'classnames';

// styles
import '../styles/components/TopBarButton';

export default class TopBarButton extends React.Component {
  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick(event) {
    const router = this.context.router;
    router.transitionTo(event.target.dataset.route);
  }
  render() {
    const className = classNames('TopBarButton', {
      'TopBarButton--left': this.props.left,
      'TopBarButton--right': this.props.right,
    });
    return (
      <button className={className} data-route={this.props.route} onClick={this._handleClick}>{this.props.name}</button>
    );
  }
}

TopBarButton.propTypes = {
  name: React.PropTypes.string,
  route: React.PropTypes.string,
  left: React.PropTypes.bool,
  right: React.PropTypes.bool,
};
TopBarButton.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
