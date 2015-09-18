import React from 'react';
import classNames from 'classnames';

// styles
import '../styles/components/TopBarButton';

export default class TopBarButton extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    if (this.props.route) {
      const router = this.context.router;
      if (this.props.route === '$back') {
        router.goBack();
      } else {
        router.transitionTo(event.target.dataset.route);
      }
    } else {
      this.props.click();
    }
  }
  render() {
    const className = classNames('TopBarButton', {
      'TopBarButton--left': this.props.left,
      'TopBarButton--right': this.props.right,
    });
    return (
      <button
        className={className}
        data-route={this.props.route}
        onClick={this.handleClick}
      >
        {this.props.name}
      </button>
    );
  }
}

TopBarButton.propTypes = {
  name: React.PropTypes.string,
  route: React.PropTypes.string,
  click: React.PropTypes.func,
  left: React.PropTypes.bool,
  right: React.PropTypes.bool,
};
TopBarButton.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
