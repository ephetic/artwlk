import React from 'react';
import {GoogleMap, Marker, InfoWindow, DirectionsRenderer} from 'react-google-maps';
// import {getLocation} from '../utils/geo';

// styles
import '../styles/components/MapSection';

export default class MapMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: [],
      markers: [],
    };
    setTimeout(this.onComponentDidMount.bind(this), 0);
    // this.onMapClick = this.onMapClick.bind(this);
    this.renderInfoWindow = this.renderInfoWindow.bind(this);
    this.renderSingleSite = this.renderSingleSite.bind(this);
    this.renderSingleTour = this.renderSingleTour.bind(this);
  }

  componentWillReceiveProps(props) {
    if (
      this.props.currMap !== props.currMap ||
      this.props.sites.length !== props.sites.length ||
      this.props.tours.length !== props.tours.length ||
      this.props.currTour !== props.currTour ||
      this.props.currSite !== props.currSite
    ) this.renderMap(props);
  }

  onComponentDidMount() {
    console.log('onComponentDidMount');
    this.renderMap(this.props);
  }

  onComponentWillMount() {
    console.log('onComponentWillMount');
    this.renderMap(this.props);
  }

  renderMap(props) {
    // if route matches single tour or site, do that, else do tours, sites, or both
    const route = props.routes[props.routes.length - 1];
    if (route.path.match('nearby') || route.path.match('sites')) {
      const sites = route.paramNames.indexOf('siteId') !== -1 ? [props.currSite] : props.sites;
      this.setState({markers: sites.map(this.renderSingleSite)});
    }
    if (route.path.match('nearby') || route.path.match('tours')) {
      const tours = route.paramNames.indexOf('tourId') !== -1 ? [props.currTour] : props.tours;
      this.setState({directions: []}, () => tours.forEach(this.renderSingleTour));
    }
    // if (props.currMap === 'all' || props.currMap === 'allSites' || props.currMap === 'singleSite') {
    //   const sites = props.currMap === 'singleSite' ? [props.currSite] : props.sites;
    //   this.setState({markers: sites.map(this.renderSingleSite)});
    // }
    // if (props.currMap === 'all' || props.currMap === 'allTours' || props.currMap === 'singleTour') {
    //   const tours = props.currMap === 'singleTour' ? [props.currTour] : props.tours;
    //   this.setState({directions: []}, () => tours.forEach(this.renderSingleTour));
    // }
  }

  renderSingleSite(site) {
    const marker = {
      siteInfo: site,
      icon: this.props.iconSets(site.category),
      position: {
        lat: site.coords.latitude,
        lng: site.coords.longitude,
      },
      key: site.siteId,
      defaultAnimation: 2,
      showInfo: site.showInfo,
    };

    return (
      <Marker {...marker}
        onClick={this.props.onMarkerClick.bind(this, site)}>
        {marker.showInfo ? this.renderInfoWindow(site) : null}
      </Marker>
    );
  }

  renderSingleTour(tour) {
    const DirectionsService = new google.maps.DirectionsService();
    const route = tour.sites.map((siteObj) => {
      const {latitude, longitude} = siteObj.coords;
      return {
        location: new google.maps.LatLng(latitude, longitude),
        stopover: true,
      };
    });

    const first = route.shift();
    const last = route.length ? route.pop() : first;

    DirectionsService.route({
      origin: first.location,
      destination: last.location,
      travelMode: google.maps.TravelMode.WALKING,
      optimizeWaypoints: true,
      waypoints: route,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: this.state.directions.concat(<DirectionsRenderer directions={result} />),
        });
      } else {
        console.log(`error fetching directions ${ status }`);  // eslint-disable-line no-console
      }
    });
  }

  renderInfoWindow(marker) {
    return (
      <InfoWindow
        key={`${marker.id}_info_window`}
        onCloseclick={this.props.handleCloseClick.bind(this, marker)}
        onBlur={this.props.handleCloseClick.bind(this, marker)}
      >
        <div>
          <strong>{marker.name}</strong>
          <br />
          <img src={marker.imageUrl}></img>
          <p>by {marker.artist}</p>
          <p>{marker.description}</p>
          <p>{marker.imageUrl}</p>
        </div>
      </InfoWindow>
    );
  }

  render() {
    return (
      <div className="MapSection">
        <GoogleMap
          containerProps={{
            ...this.props,
            style: {
              height: '100%',
              position: 'absolute',
              top: 0, bottom: 0, right: 0, left: 0,
            },
          }}
          className="MapSection__map"
          ref="map"
          defaultZoom={12}
          defaultCenter={{lat: 34.0147601, lng: -118.4934095}}
        >
          {this.state.markers}
          {this.state.directions}
        </GoogleMap>
      </div>
    );
  }
}

MapMap.propTypes = {
  params: React.PropTypes.object,
  path: React.PropTypes.string,
  getTours: React.PropTypes.func.isRequired,
  getSites: React.PropTypes.func.isRequired,
  tours: React.PropTypes.array.isRequired,
  sites: React.PropTypes.array.isRequired,
  onMarkerClick: React.PropTypes.func.isRequired,
  handleCloseClick: React.PropTypes.func.isRequired,
  iconSets: React.PropTypes.func.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  currSite: React.PropTypes.object,
  currTour: React.PropTypes.object,
  currMap: React.PropTypes.string,
  setMarkers: React.PropTypes.func.isRequired,
};
