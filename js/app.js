var map;
// Create a new blank array for all the listing markers
var markers = [];



//OPEN SIDE MENU
function openSidebar() {
document.getElementById("sidebar").classList.toggle("open");
console.log("open sidebar");
}
//CLOSE SIDE MENU
function closeSidebar() {
document.getElementById("sidebar").classList.remove("open");
console.log("close sidebar");
}



// KO OBSERVABLE ARRAY - tracks which objects are in the array
function ViewModel() {
    var self = this;
 
    self.location = ko.observableArray([
        { locationName: 'Santa Barbara Zoo' },
        { locationName: 'Stearns Wharf' },
        { locationName: 'Paseo Nuevo' },
        { locationName: 'Brophy Bros.' },
        { locationName: 'Los Agaves' }
    ]);
 
    // self.addPerson = function() {
    //     self.people.push({ name: "New at " + new Date() });
    // };
 
    // self.removePerson = function() {
    //     self.people.remove(this);
    // }
}
 
ko.applyBindings(new ViewModel());



//GET GOOGLE MAP
function initMap() {
  // Constructor creates a new map - only center and zoom are required
  map = new google.maps.Map(document.getElementById('map'), {
    // https://maps.googleapis.com/maps/api/geocode/json?address=Santa+Barbara,+CA&key=AIzaSyAYucQKiwjID1i4hWndBGOInAUmWmOCr6Q
    //SANTA BARBARA
    center: {lat: 34.4208305, lng: -119.6981901},
    zoom: 13
  });

  // These are the real estate listings that will be shown to the user.
  var locations = [
    {title: 'Santa Barbara Zoo', location: {lat: 34.4195492, lng: -119.6680014}},
    {title: 'Stearns Wharf', location: {lat: 34.4100065, lng: -119.6855487}},
    {title: 'Paseo Nuevo', location: {lat: 34.4206196, lng: -119.6957234}},
    {title: 'Brophy Bros.', location: {lat: 34.4038483, lng: -119.6939244}},
    {title: 'Los Agaves', location: {lat: 34.4274939, lng: -119.6866179}}
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


