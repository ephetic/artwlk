import React from 'react';
import {RouteHandler} from 'react-router';
import TopBarSection from './TopBarSection';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';

// styles
import '../styles/components/SiteSection';

// modal stuff
const appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();

export default class SiteSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalContent: null,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    // if on /sites/map
    if (this.props.path === '/sites'
      || this.props.path === '/sites/map'
      || this.props.path === '/sites/map/') {
      this.props.setCurrMap('allSites');
    }

    // if on /sites/map/:siteId
    if (this.props.params.siteId) {
      this.props.getCurrSite(this.props.params.siteId)
      .then(() => {
        this.props.setCurrMap('singleSite');
      });
    }

    // if on /sites/:siteId
  }

  openModal(modalContent) {
    if (modalContent === 'filter') {
      this.setState({modalContent: <FilterSection doFilterSearch={this.props.doFilterSearch} closeModal={this.closeModal}/>});
    } else {
      this.setState({modalContent: <SearchSection doSearch={this.props.doSearch} closeModal={this.closeModal} />});
    }
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const mapDetailRoute = `/sites/${this.props.params.siteId}`;
    const siteDetailRoute = `/sites/map/${this.props.params.siteId}`;
    const topBarRoutes = {
      'map': (
        <TopBarSection
          title="Sites"
          leftName="Filter"
          leftClick={this.openModal.bind(this, 'filter')}
          rightName="Map"
          rightRoute="/sites/map"
        />
      ),
      'mapDetail': (
        <TopBarSection
          title={this.props.currSite.name}
          leftName="Back"
          leftRoute="$back"
          rightName="Details"
          rightRoute={mapDetailRoute}
        />
      ),
      'siteDetail': (
        <TopBarSection
          title={this.props.currSite.name}
          leftName="Back"
          leftRoute="$back"
          rightName="Map"
          rightRoute={siteDetailRoute}
        />
      ),
    };

    const parsedUrl = () => {
      const url = this.props.path.split('/');

      if (url[2] === 'map' ) {
        return 'mapDetail';
      } else if (url[2]) {
        return 'siteDetail';
      } else if (url[1] === 'sites') {
        return 'map';
      }
    };

    return (
      <div className="SiteSection">
        {topBarRoutes[parsedUrl()]}
        <button onClick={this.openModal}>Search me</button>
        <RouteHandler
          {...this.state}
          {...this.props}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          {this.state.modalContent}
        </Modal>
      </div>
    );
  }
}

SiteSection.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

SiteSection.propTypes = {
  setCurrMap: React.PropTypes.func.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  currSite: React.PropTypes.object.isRequired,
  currMap: React.PropTypes.string.isRequired,
  sites: React.PropTypes.array.isRequired,
  doSearch: React.PropTypes.func.isRequired,
  doFilterSearch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  path: React.PropTypes.string.isRequired,
};
