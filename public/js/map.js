// This example uses a GroundOverlay to place an image on the map
//       // showing an antique map of Newark, NJ.
var historicalOverlay;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 22.99712, lng: 120.222532}
  })
  /*
  var imageBounds = {
    north: 22,99712
    south: 22.965,
    east: 120.21244,
    west: 120.22655
    }*/
  var imageBounds = {
    north: 23.073941,
    south: 22.965,
    east: 120.22654,
    west: 120.10655
  }

  historicalOverlay = new google.maps.GroundOverlay(
    'https://luffy.ee.ncku.edu.tw:10111/images/ttk_map1.png',
    imageBounds);
  historicalOverlay.setMap(map)
}
/*
var historicalOverlay
var map

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.99712, lng: 120.222532},
    zoom: 17  
  })

   
  historicalOverlay = new google.maps.GroundOverlay(
    imageBounds)
  historicalOverlay.setMap(map)

  }*/
