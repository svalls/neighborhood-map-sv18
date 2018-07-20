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

function mapError() {
  alert("Map could not be loaded at this moment. Please try again");
}




/***** GOOGLE MAP *****/

function initMap() {
  // Constructor creates a new map - only center and zoom are required
  map = new google.maps.Map(document.getElementById('map'), {
    // https://maps.googleapis.com/maps/api/geocode/json?address=Santa+Barbara,+CA&key=AIzaSyAYucQKiwjID1i4hWndBGOInAUmWmOCr6Q
    //SANTA BARBARA
    center: {lat: 34.4208305, lng: -119.6981901},
    zoom: 13
  });


  // LOCATION LISTINGS ON THE MAP
  var locations = [
    {title: 'Santa Barbara Zoo', location: {lat: 34.420408, lng: -119.666354}},
    {title: 'Stearns Wharf', location: {lat: 34.4100065, lng: -119.6855487}},
    {title: 'Paseo Nuevo', location: {lat: 34.419035, lng: -119.699953}},
    {title: 'Brophy Bros. Seafood Restaurant', location: {lat: 34.4039826, lng: -119.6933294}},
    {title: 'Los Agaves Mexican Restaurant', location: {lat: 34.4374508, lng: -119.7273891}},
    {title: 'Figueroa Mountain Brewing Co.', location: {lat: 34.4146164, lng: -119.6908184}},
    {title: 'Santa Barbara Museum Of Natural History', location: {lat: 34.4409134, lng: -119.7144601}},
    {title: 'McConnells Fine Ice Creams', location: {lat: 34.4194911, lng: -119.6987739}},
    {title: 'MOXI, The Wolf Museum of Exploration + Innovation', location: {lat: 34.413437, lng: -119.691698}},
    {title: 'Helena Avenue Bakery', location: {lat: 34.4144445, lng: -119.6906718}}
  ];


  // LOCATION CONSTRUCTOR
  var Location = function(data) {
      var self = this;
      self.title = data.title;
      // self.location = data.location;
      self.lat = data.location.lat;
      self.lng = data.location.lng;
      self.address = '';
      self.city = '';
      // self.showLocation = ko.observable();
  };


  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // MARKER DEFAULT COLOR
  var defaultIcon = makeMarkerIcon('cc66ff');

  // MARKER MOUSEOVER COLOR
  var highlightedIcon = makeMarkerIcon('33cccc');


// USE LOCATION ARRAY TO CREATE ARRAY MARKERS ON INITIALIZE
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
      icon: defaultIcon,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    // MARKER EVENT LISTENER MOUSEOVER
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    // MARKER EVENT LISTENER MOUSEOUT
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  } //end for loop
} //end initmap function


// DISPLAYS INFOWINDOW WHEN MARKER IS CLICKED
function populateInfoWindow(marker, infowindow) {
  var contentString;

  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker = null;
    });
  } //end if statement


  /***** FOURSQUARE AJAX REQUEST *****/
  var lat = marker.position.lat();
  var lng = marker.position.lng();

  // https://discussions.udacity.com/t/jsonp-on-foursquare-not-working/187829/2
  var foursquareId = '2BLMYYLLXG2GREZT2C0CJ3RBEIXLT0WUHJ3ESGWWHPJYW1DA',
      foursquareSecret = 'QRJ3YCDAS5UVLTDMXADKNMBNJE5NQUFW2YK5XYMWRCE03PAA',
      version = 20160908,
      foursquareUrl = 'https://api.foursquare.com/v2/venues/search?ll=' + lat + ',' + lng + '&client_id=' + foursquareId + '&client_secret=' + foursquareSecret + '&v=' + version + '&m=foursquare';

  // https://discussions.udacity.com/t/wikipedia-api-usage/209707/3
  // https://discussions.udacity.com/t/ajax-foursquare-request-function/203175
  $.ajax({
    url: foursquareUrl,
    dataType: 'json',
  }).done(function(data) {
    // get venue info
    var results = data.response.venues[0];
    // get venue address
    var venueAddress = results.location.formattedAddress[0];
    // get venue city, state, zip code
    var venueCity = results.location.formattedAddress[1];
    //+ '<br>' +
    var contentString =
    '<div>' + '<h3>' + marker.title + '</h3>' + '</div>' +
    '<div>' + venueAddress + '</div>' +
    '<div>' + venueCity + '</div>';
    infowindow.setContent(contentString);
    console.log(contentString);
  }).fail(function() {
    // alert user of API error
    '<div>' + 'Information is currently not available.' + '</div>'
    console.log('Information is currently not available.');
  }); // end ajax request

} //end populateInfoWindow



// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  // console.log('makeMarkerIcon function');
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
} //end makeMarkerIcon function




/***** VIEWMODEL *****/

// KO OBSERVABLE ARRAY - tracks which objects are in the array
function ViewModel(){

  var self = this;
  
  self.filter = ko.observable();

  self.locations = ko.observableArray([
    { name: '1. Santa Barbara Zoo' },
    { name: '2. Stearns Wharf' },
    { name: '3. Paseo Nuevo' },
    { name: '4. Brophy Bros. Seafood Restaurant' },
    { name: '5. Los Agaves Mexican Restaurant' },
    { name: '6. Figueroa Mountain Brewing Co.' },
    { name: '7. Santa Barbara Museum Of Natural History' },
    { name: '8. McConnells Fine Ice Creams' },
    { name: '9. MOXI, The Wolf Museum of Exploration + Innovation' },
    { name: '10. Helena Avenue Bakery' }]);
    //  
    
  self.visibleLocations = ko.computed(function(){
    return self.locations().filter(function(location){
      if(!self.filter() || location.name.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
        return location;
      });
    },self);
  }

  // https://stackoverflow.com/questions/2730929/how-to-trigger-the-onclick-event-of-a-marker-on-a-google-maps-v3/2731781#2731781
  self.showInfowindow = function (index, infowindow, marker) {
    // console.log(index, infowindow, marker);
    google.maps.event.trigger(markers[index], 'click');
  };


ko.applyBindings(new ViewModel()); //end viewmodel


