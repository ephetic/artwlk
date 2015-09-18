import React from 'react';
import Container from '../components/Container';
// import MapSection from '../components/MapSection';
import NearbySection from '../components/NearbySection';
import NearbyList from '../components/NearbyList';
import TourSection from '../components/TourSection';
import TourDetail from '../components/TourDetail';
import TourList from '../components/TourList';
import SiteSection from '../components/SiteSection';
import SiteDetail from '../components/SiteDetail';
import SiteList from '../components/SiteList';
import CreateSection from '../components/CreateSection';
import FilterSection from '../components/FilterSection';
import SearchSection from '../components/SearchSection';
import MapMap from '../components/MapMap';
import CreateLocationSelector from '../components/CreateLocationSelector';
import Login from '../components/login-signup/Login';
import CreateTour from '../components/CreateTour';
import CreateTourSiteSelector from '../components/CreateTourSiteSelector';

import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name="app" path="/" handler={Container}>
    <Route name="nearby" handler={NearbySection} >
      <Route name="nearby-list" handler={NearbyList} />
      <Route name="map" path="/nearby/map" handler={MapMap} />
      <DefaultRoute handler={NearbyList} />
    </Route>
    {/*
    <Route name="nearby" handler={NearbySection} />
    <Route name="map" path="/nearby/map" handler={MapMap} />
    */}
    <Route name="tours" path="/tours" handler={TourSection}>
      <Route name="map-tours" path="/tours/map" handler={MapMap} />
      <Route name="map-tour" path="/tours/map/:tourId" handler={MapMap} />
      <Route name="tours-detail" path="/tours/:tourId" handler={TourDetail} />
      <DefaultRoute handler={TourList} />
    </Route>
    <Route name="sites" path="/sites" handler={SiteSection}>
      <Route name="map-sites" path="/sites/map" handler={MapMap} />
      <Route name="map-site" path="/sites/map/:siteId" handler={MapMap} />
      <Route name="sites-detail" path="/sites/:siteId" handler={SiteDetail} />
      <DefaultRoute handler={SiteList} />
    </Route>
    <Route name="create" handler={CreateSection} />
    <Route name="filter" handler={FilterSection} />
    <Route name="search" handler={SearchSection} />
    <Route name="create-locationselector" handler={CreateLocationSelector} />
    <Route name="login" handler={Login} />
    <Route name="create-tour" handler={CreateTour} />
    <Route name="create-tour-site-selector" handler={CreateTourSiteSelector} />
    <Route name="search-test" handler={SearchSection} />
    <DefaultRoute handler={NearbySection} />
    <NotFoundRoute handler={MapMap} />
  </Route>
);

// Authorized routes
import {willTransitionTo} from '../utils/auth';
CreateSection.willTransitionTo = willTransitionTo;
