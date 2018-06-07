var map;

// Create a new blank array for all the listing markers
var markers = [];

      function initMap() {
        // Constructor creates a new map - only center and zoom are required
        map = new google.maps.Map(document.getElementById('map'), {
          // //GEOCOING CALABASAS
          // center: {lat: 34.1367208, lng: -118.6614809},
          // zoom: 11
          //GEOCOING LOS ANGELES
          // https://maps.googleapis.com/maps/api/geocode/json?address=Los+Angeles+CA&key=AIzaSyAYucQKiwjID1i4hWndBGOInAUmWmOCr6Q
          // center: {lat: 34.0522342, lng: -118.2436849},
          // zoom: 10
          //GEOCOING AGOURA
          center: {lat: 34.1533395, lng: -118.7616764},
          zoom: 13
        });

        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.
        var locations = [
          {title: 'Regency Agoura Hills Stadium', location: {lat: 34.14406494, lng: -118.7574765}},
          {title: 'Calabasas Tennis & Swim Center', location: {lat: 34.1562240802915, lng: -118.6374147197085}},
          {title: 'Hanami Sushi', location: {lat: 34.1449424, lng: -118.7000053}},
          {title: 'Islands Restaurant', location: {lat: 34.1438765, lng: -118.7620233}},
          {title: 'Bowlero', location: {lat: 34.1630409, lng: -118.6291227}}
        ];

        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          bounds.extend(markers[i].position);
        }
        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
      }

      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
    } //end initmap function

// ..an observable array tracks which objects are in the array
function ViewModel() {
    var self = this;
 
    self.location = ko.observableArray([
        { locationName: 'Location 01 from the ViewModel' },
        { locationName: 'Location 02 from the ViewModel' },
        { locationName: 'Location 03 from the ViewModel' },
        { locationName: 'Location 04 from the ViewModel' },
        { locationName: 'Location 05 from the ViewModel' }
    ]);
 
    // self.addPerson = function() {
    //     self.people.push({ name: "New at " + new Date() });
    // };
 
    // self.removePerson = function() {
    //     self.people.remove(this);
    // }
}
 
ko.applyBindings(new ViewModel());


