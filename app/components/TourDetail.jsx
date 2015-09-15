import React from 'react';
import {distance} from '../utils/movement';
import moment from 'moment';

// styles
import '../styles/components/TourDetail';

export default class TourDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrTour(this.props.params.tourId);
  }

  render() {
    const tour = this.props.currTour;
    let sites;
    if (tour) {
      const _tour = this.props.tours.find(t => t.id === tour.id);
      if (_tour) {
        sites = _tour.sites.map(site => (
          <div>
            <li>{site.name}</li>
            <li><img src={site.imageUrl}></img></li>
            <li>Artist: {site.artist}</li>
          </div>
        ));
      }
    }
    return (
      <div className="TourDetail">
        <img src="" />
        <h3>{tour.title}</h3><br/>
        <span>Duration: {moment.duration(tour.duration, 'seconds').humanize()}</span><br/>
        <span>Distance: {distance.pretty(tour.distance)}</span><br/>
        <span># of sites: {tour.sites && tour.sites.length}</span><br/>
        <span>Description: {tour.descriptions}</span>
        <ul>
          <strong>Sites</strong>
          {sites}
        </ul>
        <ul>
          <li><strong>Comments</strong></li>
          <li>Comment One</li>
          <li>Comment Two</li>
        </ul>
      </div>
    );
  }
}

TourDetail.propTypes = {
  getTours: React.PropTypes.func.isRequired,
  getCurrTour: React.PropTypes.func.isRequired,
  getLocation: React.PropTypes.func.isRequired,
  tours: React.PropTypes.array,
  currSite: React.PropTypes.sting,
  currTour: React.PropTypes.object,
  params: React.PropTypes.object,
};
