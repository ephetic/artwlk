import React from 'react';
import {getAllSites} from '../utils/sites';

import '../styles/components/CreateTourSiteSelector';

export default class CreateTourSiteSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
    };

    this.done = this.done.bind(this);
  }

  componentWillMount() {
    this.props.setTopBar({
      title: 'Create',
    });
  }

  componentDidMount() {
    getAllSites().then(sites => {
      this.setState({sites}, () => {
        this.state.sites.forEach((n, i) => {
          if (this.props.selectedSites.find(site => site.id === n.id)) {
            this.refs['site' + i].getDOMNode().checked = true;
          }
        });
      });
    });
  }

  done() {
    const selected = this.state.sites.filter((n, i) =>
      this.refs['site' + i].getDOMNode().checked
    );
    this.props.selectSites(selected);
    this.context.router.transitionTo('create-tour');
  }


  render() {
    const list = this.state.sites.map((n, i) =>
      (<li className="CreateTourSiteSelector__form-checkbox-item">
        <label className="CreateTourSiteSelector__form-checkbox-item-label">
          <input
            type="checkbox"
            className="CreateTourSiteSelector__form-checkbox-item-input"
            ref={'site' + i}
          />
            {n.name}
        </label>
      </li>)
    );

    return (
      <div className="CreateTourSiteSelector">
        <ul className="CreateTourSiteSelector__form-checkbox">
          {list}
        </ul>
        <button className="CreateTourSiteSelector__button" onClick={this.done}>Done</button>
      </div>
    );
  }
}

CreateTourSiteSelector.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
  selectSites: React.PropTypes.func.isRequired,
  selectedSites: React.PropTypes.array.isRequired,
};

CreateTourSiteSelector.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
