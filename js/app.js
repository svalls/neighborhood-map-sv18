var map;
      function initMap() {
      	console.log("mapa")
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById("map"), {
          center: {lat: 34.4208305, lng: -119.6981901},
          zoom: 13
        });
      }


function openSidebar() {
document.getElementById("sidebar").classList.toggle("open");
console.log("open sidebar");
}

function closeSidebar() {
document.getElementById("sidebar").classList.remove("open");
console.log("close sidebar");
}
