var map;
      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 34.1367208, lng: -118.6614809},
          zoom: 13
        });
      }
