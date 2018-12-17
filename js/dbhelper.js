// Common database helper functions
class DBHelper {

  // Database UR
  static get DATABASE_URL() {
    const port = 8080
    return `./data/restaurants.json`;
  }

  // FETCH RESTAURANTS
  static fetchRestaurants(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', DBHelper.DATABASE_URL);
    // FUNCTION CALLED WHEN AN XMLHTTPREQUEST TRANSACTION COMPLETES SUCCESSFULLY
    xhr.onload = () => {
      if (xhr.status === 200) { // SERVER SUCCESS
        const json = JSON.parse(xhr.responseText);
        const restaurants = json.restaurants;
        callback(null, restaurants);
      } else { // SERVER ERROR
        const error = (`Request failed. Returned status of ${xhr.status}`);
        callback(error, null);
      }
    };
    xhr.send();
  }

  // FETCH RESTAURANT BY ID
  static fetchRestaurantById(id, callback) {
    // FETCH RESTAURANTS
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        const restaurant = restaurants.find(r => r.id == id);
        if (restaurant) { // RETREIVED THE RESTAURANT
          callback(null, restaurant);
        } else { // NON-EXISTANT RESTAURANT
          callback('Restaurant does not exist', null);
        }
      }
    });
  }

  // FETCH RESTAURANTS BY CUISINE
  static fetchRestaurantByCuisine(cuisine, callback) {
    // FETCH RESTAURANTS
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // FILTER BY CUISINE
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  // FETCH RESTAURANTS BY NEIGHBORHOOD
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // FETCH RESTAURANTS
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // FILTER RESTAURANTS BY NEIGHBORHOOD
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  // FETCH RESTAURANTS BY CUISINE, NEIGHBORHOOD
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // FETCH RESTAURANTS
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // FILTER BY CUISINE
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // FILTER BY NEIGHBORHOOD
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  // FETCH NEIGHBORHOODS
  static fetchNeighborhoods(callback) {
    // FETCH RESTAURANTS
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // GET NEIGHBORHOODS FROM RESTAURANTS
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // REMOVE DUPLICATES NEIGHBORHOODS
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  // FETCH CUISINES
  static fetchCuisines(callback) {
    // FETCH RESTAURANTS
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // GET CUISINES FROM RESTAURANT LIST
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // REMOVE DUPLICATES CUISINES
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  // RESTAURANT PAGE URL
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  // RESTAURANT IMAGE URL
  static imageUrlForRestaurant(restaurant) {
    return (`./img/${restaurant.photograph}`);
  }

  // Map marker for a restaurant
  static mapMarkerForRestaurant(restaurant, map) {
    // HTTPS://LEAFLETJS.COM/REFERENCE-1.3.0.HTML#MARKER
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng], {
      title: restaurant.name,
      alt: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant)
    })
    marker.addTo(newMap);
    return marker;
  }
}