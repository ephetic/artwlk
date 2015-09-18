import React from 'react';
import SiteList from './SiteList';
import TourList from './TourList';


// styles
// import '../styles/components/NearbyList';

export default class NearbyList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>Sites</h2>
        <SiteList
          limit="2"
          {...this.state}
          {...this.props}
        />
        <h2>Tours</h2>
        <TourList
          limit="2"
          {...this.state}
          {...this.props}
        />
      </div>
    );
  }
}

SiteList.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

SiteList.propTypes = {
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  setCurrMap: React.PropTypes.func.isRequired,
  limit: React.PropTypes.string,
};
