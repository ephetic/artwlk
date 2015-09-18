import React from 'react';
import {RouteHandler} from 'react-router';
import TopBarSection from './TopBarSection';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';
import {getLocation} from '../utils/geo';
// import TourList from './TourList';

// styles
import '../styles/components/TourSection';

const appElement = document.getElementById('app');

Modal.setAppElement(appElement);
Modal.injectCSS();

export default class TourSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalContent: false,
    };
    this.siteDetailClick = this.siteDetailClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    // if on /tours/map
    if (this.props.path === '/tours'
      || this.props.path === '/tours/map'
      || this.props.path === '/tours/map/') {
      this.props.setCurrMap('allTours');
    }

    // if on /tours/map/:tourId
    if (this.props.params.tourId) {
      this.props.getCurrSite(this.props.params.tourId)
        .then(() => {
          this.props.setCurrMap('singleTour');
        });
    }

    // if on /tours/:tourId
  }

  componentDidMount() {
    getLocation().then(this.props.getSites);
    this.props.getCurrSite(this.props.params.siteId);
  }

  siteDetailClick(event) {
    const router = this.context.router;
    router.transitionTo('tours-detail', { siteId: event.target.dataset.route });
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
    const mapTourDetailRoute = `/tours/${this.props.params.tourId}`;
    const tourDetailRoute = `/tours/map/${this.props.params.tourId}`;
    const topBarRoutes = {
      'mapTour': (
        <TopBarSection
          title="Tours"
          leftName="Filter"
          leftClick={this.openModal.bind(this, 'filter')}
          rightName="Map"
          rightRoute="/tours/map"
        />
      ),
      'mapTourDetail': (
        <TopBarSection
          title={this.props.currTour.title}
          leftName="Back"
          leftRoute="tours"
          rightName="Details"
          rightRoute={mapTourDetailRoute}
        />
      ),
      'tourDetail': (
        <TopBarSection
          title={this.props.currTour.title}
          leftName="Back"
          leftRoute="tours"
          rightName="Map"
          rightRoute={tourDetailRoute}
        />
      ),
    };

    const parsedUrl = () => {
      const url = this.props.path.split('/');
      if (url[2] === 'map' ) {
        return 'mapTourDetail';
      } else if (url[2]) {
        return 'tourDetail';
      } else if (url[1] === 'tours') {
        return 'mapTour';
      }
    };

    return (
      <div className="TourSection">
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

TourSection.propTypes = {
  setCurrMap: React.PropTypes.func.isRequired,
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  doSearch: React.PropTypes.func.isRequired,
  doFilterSearch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  currTour: React.PropTypes.object,
  path: React.PropTypes.string,
};
