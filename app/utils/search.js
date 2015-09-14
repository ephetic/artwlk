import {getLocation, onSitesWithinRadius} from './geo';
import {findToursBySiteId, getTourById} from './tours';
import {getSiteByKey} from './sites';

const geocode = locationText => {
  return new Promise(resolve => {
    (new google.maps.Geocoder).geocode({address: locationText}, ([{geometry: {location: latLng}}], status) => {
      if (status !== 'OK') return reject(status);
      const {G: latitude, K: longitude} = latLng;
      resolve({coords: {latitude, longitude}});
    });
  });
};

export const onSearch = ({searchText, locationText}, handleSearchResult) => {
  // for all nearby sites, filter sites by search text and display those sites and tours that contain them.
  const query = searchText.toLowerCase().split(' ');
  const location = locationText ? geocode(locationText) : getLocation();
  location.then((center) => {
    const foundSites = {};
    const foundTours = {};
    onSitesWithinRadius(center, 10, siteId => {
      if (siteId in foundSites) return;
      foundSites[siteId] = true;

      // find tours matching query
      findToursBySiteId(siteId)
      .then(tourIds => {
        tourIds.forEach(tourId => {
          if (tourId in foundTours) return;
          foundTours[tourId] = true;
          getTourById(tourId).then(tour => {
            tour.id = tourId;
            const {title, descriptions} = tour;
            const attributes = [title, descriptions].map(attr => attr.toLowerCase());
            if (attributes.some(attr => query.some(q => attr.indexOf(q) !== -1))) {
              handleSearchResult('tour', tour);
            }
          });
        });
      });

      // find sites matching query
      getSiteByKey(siteId)
      .then(site => {
        const {name, artist, category} = site;
        site.id = siteId;
        const attributes = [name, artist].concat(Object.keys(category).filter(key => category[key])).map(attr => attr.toLowerCase());
        if (attributes.some(attr => query.some(q => attr.indexOf(q) !== -1))) {
          handleSearchResult('site', site);

          // find tours referenced by this site
          findToursBySiteId(siteId)
          .then(tourIds => {
            tourIds.forEach(tourId => {
              if (tourId in foundTours) return;
              foundTours[tourId] = true;
              getTourById(tourId).then(tour => {
                tour.id = tourId;
                handleSearchResult('tour', tour);
              });
            });
          });
        }
      });
    });
  });
};
