import React from 'react';
import {GoogleMap, Marker} from 'react-google-maps';
import {onSitesWithinRadius, getLocation} from '../utils/geo';
import {addSite} from '../utils/sites';

// styles
import '../styles/components/MapSection';

export default class MapSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: new google.maps.LatLng(34.04935261524454, -118.24610710144043),
      markers: [],
    };

    // Bind methods in this section
    this._onMapClick = this._onMapClick.bind(this);
  } // Constructor

  componentDidMount() {
    getLocation().then((location) => {
      onSitesWithinRadius(location, 5, (siteId, latLng) => {
        const newMarkers = this.state.markers;
        this.setState({
          markers: newMarkers.concat([{
            position: {
              lat: latLng[0],
              lng: latLng[1]},
            key: siteId,
            defaultAnimation: 2}]
          ),
        });
      });
    });
  }

  _onMapClick(event) {
    addSite({
      coords: {
        latitude: event.latLng.G,
        longitude: event.latLng.K,
      },
    });
  }

 render() {
   return (
     <GoogleMap
       containerProps={{
         ...this.props,
         style: {
           height: '100%',
         },
       }}
       ref="map"
       defaultZoom={12}
       defaultCenter={{lat: 34.0147601, lng: -118.4934095}}
       onClick={this._onMapClick}>
       {this.state.markers.map((marker) => {
         return (
           <Marker {...marker} />
         );
       })}
     </GoogleMap>
   );
 }
}
