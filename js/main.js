
/************************************
   VERIFYING SERVICE WORKER SUPPORT
************************************/


if ('serviceWorker' in navigator) {
  console.log('Service Worker: Supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`))
  })
}

let restaurants;
let neighborhoods;
let cuisines;
var newMap;
var markers = [];


/************************************
GET NEIGHBORHOODS & CUISINES ON LOAD
************************************/


document.addEventListener('DOMContentLoaded', event => {
  initMap(); // Added
  fetchNeighborhoods();
  fetchCuisines();
});


/************************************
  FETCH NEIGHBORHOODS AND SET HTML
************************************/


// GLOBALLY DECLARED VARIABLE
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}


/************************************
        SET NEIGHBORHOOD HTML
************************************/


fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}


/************************************
      FETCH CUISINE AND SET HTML
************************************/


fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // GOT AN ERROR
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}


/************************************
            CUISINE HTML
************************************/


fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}


/************************************
            LEAFLET MAP
************************************/


initMap = () => {
  self.newMap = L.map('map', {
    center: [40.722216, -73.987501],
    zoom: 12,
    scrollWheelZoom: false
  });
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
    mapboxToken: 'pk.eyJ1IjoidGNkZXYiLCJhIjoiY2pwaHMwNGFkMHp2eDNwb2JhaDN4Nnh6ZCJ9.AgqzSdr1o93Jr5e2ZGFmnQ',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(newMap);

  updateRestaurants();
};


/************************************
  UPDATE PAGE & MAP FOR RESTAURANTS
************************************/


updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // GOT AN ERROR
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
}


/************************************
CLEAR RESTAURANTS, HTML, & MAP MARKERS
************************************/


resetRestaurants = restaurants => {
  // REMOVE RESTAURANTS
  self.restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // REMOVE MAP MARKERS
  if (self.markers) {
    self.markers.forEach(marker => marker.remove());
  }
  self.markers = [];
  self.restaurants = restaurants;
}


/************************************
    CREATE AND ADD RESTAURANT HTML
************************************/


fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}


/************************************
     CREATE RESTAURANT INFO CARD
************************************/


createRestaurantHTML = restaurant => {
  // MAKE ENTIRE RESTAURANT INFO CARD REFER TO RESTAURANT PAGE
  const aTag = document.createElement('a');
  aTag.href = DBHelper.urlForRestaurant(restaurant);
  const li = document.createElement('li');
  aTag.tabIndex = '3';
  aTag.appendChild(li);
  let altInfo = restaurant.name + ' restaurant, located in' + restaurant.neighborhood;

  // ADD IMAGE TO INFO CARD
  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.href = DBHelper.urlForRestaurant(restaurant);
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = altInfo;
  aTag.append(image);

  // ADD RESTAURANT NAME TO INFO CARD
  const name = document.createElement('h3');
  name.innerHTML = restaurant.name;
  aTag.append(name);

  // ADD NEIGHBORHOOD TO INFO CARD
  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  aTag.append(neighborhood);

  // ADD RESTAURANT ADDRESS TO INFO CARD
  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  aTag.append(address);

  // ADD VIEW DETAILS BUTTON TO INFO CARD
  const info = document.createElement('button');
  info.innerHTML = 'View details';
  // info.setAttribute('aria-label', `View details of ${restaurant.name}`)
  // info.setAttribute('role', 'button');
  info.href = DBHelper.urlForRestaurant(restaurant);
  aTag.append(info)

  return aTag;
}


/************************************
          ADD MARKER TO MAP
************************************/


addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.newMap);
    marker.on('click', onClick);
    function onClick() {
      window.location.href = marker.options.url;
    }
    self.markers.push(marker);
  });
}