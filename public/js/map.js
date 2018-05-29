let historicalOverlay
let userPositionIcon
let map
let nearestAttraction
let attractions = [{
    name: '台南火車站',
    position: {lat: 22.99721, lng: 120.211818},
    type: 'parking',
    distance: Number.MAX_SAFE_INTEGER, 
    content: 'aaa,'
  },{
    name: '成大電機系',
    position: {lat: 22.996891, lng: 120.222337},
    type: 'parking',
    distance: Number.MAX_SAFE_INTEGER,  
    content: 'aaa,'
  },{
    name: '赤崁樓',
    position: {lat: 22.997470, lng: 120.202749},
    type: 'parking',
    distance: Number.MAX_SAFE_INTEGER,
    content: 'aaa,'
  }

]
function TutorControl(controlDiv, map){

  //Set CSS for the control border.
  var controlUI = document.createElement('div')
  controlUI.style.backgroundColor = '#fff'
  controlUI.style.border = '2px solid #fff'
  controlUI.style.borderRadius = '100px'
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlUI.style.cursor = 'pointer'
  controlUI.style.margin = '9px'
  controlUI.style.textAlign = 'center'
  controlUI.title = 'Click to start tutorial'
  controlDiv.appendChild(controlUI)

  // Set CSS for the control interior.
  var controlText = document.createElement('div')
  controlText.style.color = 'rgb(25,25,25)'
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlText.style.color = '#663300'
  controlText.style.fontSize = '25px'
  controlText.style.lineHeight = '45px'
  controlText.style.paddingLeft = '10px'
  controlText.style.paddingRight = '4px'
  controlText.innerHTML = '<i class="volume up icon"></i>'
  controlUI.appendChild(controlText)

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    console.log('aaa')
  })

}

function MapControl(controlDiv, map){

  //Set CSS for the control border.
  var controlUI = document.createElement('div')
  controlUI.style.backgroundColor = '#fff'
  controlUI.style.border = '2px solid #fff'
  controlUI.style.borderRadius = '100px'
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlUI.style.cursor = 'pointer'
  controlUI.style.margin = '9px'
  controlUI.style.textAlign = 'center'
  controlUI.title = 'Click to swtich the map'
  controlDiv.appendChild(controlUI)

  // Set CSS for the control interior.
  var controlText = document.createElement('div')
  controlText.style.color = 'rgb(25,25,25)'
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlText.style.color = '#663300'
  controlText.style.fontSize = '25px'
  controlText.style.lineHeight = '45px'
  controlText.style.paddingLeft = '10px'
  controlText.style.paddingRight = '4px'
  controlText.innerHTML = '<i class="map icon"></i>'
  controlUI.appendChild(controlText)

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    console.log('aaa')
  })

}

function CenterControl(controlDiv, map){

  //Set CSS for the control border.
  var controlUI = document.createElement('div')
  controlUI.style.backgroundColor = '#fff'
  controlUI.style.border = '2px solid #fff'
  controlUI.style.borderRadius = '100px'
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlUI.style.cursor = 'pointer'
  controlUI.style.margin = '9px'
  controlUI.style.textAlign = 'center'
  controlUI.title = 'Click to recenter the map'
  controlDiv.appendChild(controlUI)

  // Set CSS for the control interior.
  var controlText = document.createElement('div')
  controlText.style.color = 'rgb(25,25,25)'
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlText.style.color = '#663300'
  controlText.style.fontSize = '25px'
  controlText.style.lineHeight = '45px'
  controlText.style.paddingLeft = '10px'
  controlText.style.paddingRight = '4px'
  controlText.innerHTML = '<i class="crosshairs icon"></i>'
  controlUI.appendChild(controlText)

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    getGeolocation().then( pos =>{
      map.setCenter(pos)
      userPositionIcon.setPosition(pos)
      setAttr(pos)
    })
  })

}

// initial map
function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: {lat: 22.99721, lng: 120.211818},
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false
  })

  var tutorControlDiv = document.createElement('div')
  var mapControlDiv = document.createElement('div')
  var centerControlDiv = document.createElement('div')
 
  var tutuorControl = new TutorControl(tutorControlDiv, map)
  var mapControl = new MapControl(mapControlDiv, map)
  var centerControl = new CenterControl(centerControlDiv, map)
  
  tutorControlDiv.index = 1
  mapControlDiv.index = 2
  centerControlDiv.index = 3
  
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(tutorControlDiv)
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(mapControlDiv)
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv)
  
  
  //user position
  userPositionIcon = new google.maps.Marker({
    position: {lat: 22.99721, lng: 120.211818},
    map: map
  })

  //old map
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

  //set attractions
  let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  let icons = {
    parking: iconBase + 'parking_lot_maps.png'
  }

  //create attractions
  attractions.forEach((attraction) =>  {
    var infowindow = new google.maps.InfoWindow({
      content: attraction.content
    })

    var marker = new google.maps.Marker({
      position: attraction.position,
      icon: icons[attraction.type],
      map: map,
      title: attraction.content
    })
    
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    })
    
  })

  //geolocation
  if (navigator.geolocation) {
    getGeolocation().then(pos => {
      map.setCenter(pos)
      userPositionIcon.setPosition(pos)
      setAttr(pos)
    }).catch(msg => {
      console.log(msg)
    })
  } else{
    consol.log('Geolocation is not supported by your browser')
  }

}

let getGeolocation = () => {
  return new Promise((resolve) =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      resolve(pos)

    })
  })
}

//find nearest attraction

/* usage: getGeolocation()
** .then(user => updateDistance(user))
** .then(msg => console.log(msg))
**
** ["update", "update"................]
*/


let updateDistance = user => {
  return Promise.all(
    attractions.map(attr => {
      let delLat = attr.position.lat - user.lat
      let delLng = attr.position.lng - user.lng
      attr.distance = Math.sqrt(delLat*delLat + delLng*delLng)
      return Promise.resolve('updated')
    })
  )
}

let nearestAttr = (user) =>{ 
  return new Promise((resolve) =>{
    updateDistance(user).then(() => {
      let attrArr = attractions.map(attr =>{
        return Promise.resolve(attr.distance)
      })

      Promise.all(attrArr).then(distances => {
        attractions.forEach(attr => {
          if (attr.distance == Math.min(...distances)){
            resolve(attr)  
          }
        })
      })
    })  
  })
}

let setAttr = (user) => {
  nearestAttr(user).then(attr=>{
    $('#nearestAttraction').html('<i class="flag icon"></i><p>'+attr.name+'</p>')
    $('#exp-title').html('<i class="edit icon"></i><p>'+attr.name+'</p>')
    nearestAttraction = attr
  })
}
$(document).ready(() => {

  $('#nearestAttraction').click(()=>{
    map.setCenter(nearestAttraction.position) 
  })

  $('.edit').click(() => {
    if($('#experience').css('display') == 'none'){
      $('#experience').show()
    }else{
      $('#experience').hide()
    }
  })

  $('#experience .times').click(() => $('#experience').hide())

  $(".custButton.light").click(() => $('#experience').hide())

  $(".custButton.dark").click(() => {
    event.preventDefault();//取消reload
    $('#exp-content').html('<p>收到嘍～</p>')


    $.ajax({
      method: "get",
      url: "./experience",
      data: {
        experience: $("#experience textarea").val(),
      },
      success: function(data) {
        console.log(data)  
      }
    })
  })  

})
