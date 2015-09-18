# Art Wlk
####An application for users discover and plot public art sites on a map.

##Problem
Public art is hard to find without knowledge of the location of the art piece.

##Strategy
Art Wlk allows users to share and discover the location of public art pieces through an easy to use interface.

## Developer Documentation

####Tools Used:
* [React](https://facebook.github.io/react/index.html)
* [ES6](https://github.com/lukehoban/es6features)
* [Webpack](https://webpack.github.io/)
* [Babel](https://babeljs.io/)
* [Firebase](https://www.firebase.com/)
* [Google Maps APIs](https://developers.google.com/maps/?hl=en/)
* [Imgur API] (https://imgur.com/)

####To start contributing to the Art Wlk codebase:

#####Imgur
  * **Get an Imgur API key** - Create and Imgur account and register an app to get a client ID.

#####Google Developer Console API Dependencies:
  * **Google Maps JavaScript API v3** - Google Maps functionality via JS
  * **Google Maps Embed API** - Embeds your maps on different pages
  * **Directions API** - Path calculation and rendering
  * **Geocoding API** - Coordinate calculation via address strings or Latitude/Longitude tuples

#####Facebook API:
  * **Facebook API for Auth** - Set up a FB API through their dev dashboard and paste the api key into Firebase’s dashboard
  
#####Starting up the project environment
  1. Fork the repo
  2. Clone your fork locally
  3. Input your Google Maps API key in the appropriate file (found in the tree diagram below)
  4. Input your Imgur API key (found in the tree diagram below)
  5. Input the FB API key into the Firebase dashboard.
  5. npm install - server dependencies
  6. npm start - run the app on a local server
  7. Visit http://localhost:3000/ on your browser

##Overview:
Art Wlk uses React and ES6 for the views. ES6 syntax is made possible by Babel and is used throughout the majority of the codebase. Firebase is used to store site, tour, and user information and the Imgur API for photo hosting. We use Webpack as our module bundler and build system. Note that because of ES6 and Webpack, we are able to import npm modules into the front-end.

```
.
├── README.md
├── app //Main app directory
│   ├── components //React Components
│   │   ├── Container.jsx
│   │   ├── ContainerNav.jsx
│   │   ├── CreateLocationSelector.jsx
│   │   ├── CreateSection.jsx
│   │   ├── CreateTour.jsx
│   │   ├── CreateTourSiteSelector.jsx
│   │   ├── FilterSection.jsx
│   │   ├── MapMap.jsx
│   │   ├── MapSection.jsx
│   │   ├── NearbySection.jsx
│   │   ├── PhotoUpload.jsx
│   │   ├── SearchSection.jsx
│   │   ├── SiteDetail.jsx
│   │   ├── SiteList.jsx
│   │   ├── SiteSection.jsx
│   │   ├── TopBarButton.jsx
│   │   ├── TopBarSection.jsx
│   │   ├── TourDetail.jsx
│   │   ├── TourList.jsx
│   │   ├── TourSection.jsx
│   │   └── login-signup
│   ├── config 
│   │   └── routes.js //React Router routes
│   ├── main.jsx //Root react component. Loads in all of the routes from routes.js
│   ├── styles
│   │   ├── components
│   │   └── utils
│   └── utils //Javascript (non-React) utility/helper functions
│       ├── auth.js
│       ├── geo.js
│       ├── movement.js
│       ├── photo.js  //IMGUR CLIENT ID HERE
│       ├── search.js
│       ├── sites.js
│       ├── tours.js
│       └── users.js
├── config.js
├── firebase.json
├── karma.conf.js
├── package.json
├── public
│   ├── index.html  //GOOGLE MAPS API KEY HERE
│   └── src
│       ├── fonts
│       └── images
├── server
│   └── bundle.js
├── server.js
├── webpack.config.js
└── webpack.production.config.js
```
