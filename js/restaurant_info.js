let restaurant;
var newMap;


/************************************
    INITIALIZE MAP ON PAGE LOAD
************************************/


document.addEventListener('DOMContentLoaded', event => {
  initMap();
});


/************************************
             LEAFLET MAP
************************************/


initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // GOT AN ERROR
      console.error(error);
    } else {
      self.newMap = L.map('map', {
        center: [restaurant.latlng.lat, restaurant.latlng.lng],
        zoom: 16,
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
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.newMap);
    }
  });
};


/************************************
  RETREIVE RESTAURANT FROM PAGE URL
************************************/


fetchRestaurantFromURL = callback => {
  if (self.restaurant) { // RESTAURANT FETCHED
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { 
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}


/************************************
    CREATE AND ADD RESTAURANT HTML
************************************/


fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  let altInfo = restaurant.name + ' restaurant, located in ' + restaurant.neighborhood;
  image.className = 'restaurant-img';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = altInfo;

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // RESTAURANT HOURS
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // RESTAURANT REVIEW
  fillReviewsHTML();
}


/************************************
   CREATE AND ADD RESTAURANT HOURS
************************************/


fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');
    
    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);
    hours.appendChild(row);
  }
}


/************************************
        CREATE AND ADD REVIEWS
************************************/


fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h3');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}


/************************************
        CREATE AND ADD REVIEWS
************************************/


createReviewHTML = review => {
  const li = document.createElement('li');
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
  li.appendChild(date);

  const commentHeader = document.createElement('div');
  commentHeader.id = 'comment-header';
  commentHeader.appendChild(name);
  commentHeader.appendChild(date);
  li.appendChild(commentHeader);


  const rating = document.createElement('p');
  rating.className = 'rating';
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);
  
  const reviewRestaurant = document.createElement('div');
  reviewRestaurant.className = 'review-comments';
  commentHeader.setAttribute('tabindex', '3')
  reviewRestaurant.appendChild(rating);
  reviewRestaurant.appendChild(comments);
  li.appendChild(reviewRestaurant);

  return li;
}


/************************************
            ADD BREADCRUMB
************************************/


fillBreadcrumb = (restaurant = self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}


/************************************
 GET PARAMETER BY NAME FROM PAGE URL
************************************/


getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}