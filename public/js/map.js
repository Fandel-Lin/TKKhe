let historicalOverlay;
let map
let marker
let pos

function CenterControl(controlDiv, map){

  //Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '100px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.margin = '6px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '30px';
  controlText.style.paddingLeft = '13px';
  controlText.style.paddingRight = '13px';
  controlText.innerHTML = '!';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    map.setCenter(pos);
  })

}

// initial map
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: 22.99721, lng: 120.211818},
    streetViewControl: false,
  })

  var centerControlDiv = document.createElement('div')
  var centerControl = new CenterControl(centerControlDiv, map)
  
  centerControlDiv.index = 1
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv)

  marker = new google.maps.Marker({
    position: {lat: 22.99721, lng: 120.211818},
    map: map
  })

  let imageBounds = {
    north: 23.00242,
    south: 22.98685,
    east: 120.2185,
    west: 120.1980
  }

  historicalOverlay = new google.maps.GroundOverlay(
    '../images/ttk_map1.png',
    imageBounds);
  historicalOverlay.setMap(map)

  getGeolocation.then(pos => {
    map.setCenter(pos)
    marker.setPosition(pos)
  }).catch(msg => {
    console.log(msg)
  })

}

setInterval(() => {
  
  getGeolocation.then(pos => {
    marker.setPosition(pos)
  }).catch(msg => {
    console.log(msg)
  })
  
}, 10000)


let getGeolocation = new Promise((resolve, reject) => {
  if (!navigator.geolocation) {
    reject('Geolocation is not supported by your browser')
  }else{
    navigator.geolocation.getCurrentPosition((position) => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      resolve(pos)
    })
  }  
})
