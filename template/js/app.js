$(() => {
  //pwa:service worker register
  if('serviceWorker' in navigator) {  
    navigator.serviceWorker.register('/service-worker.js')  
    .then(() => { console.log('Service Worker Registed'); })
  }
  
  
  const fetchData = () => {
    $.get('./data', res => {
    
    })
  }
  fetchData()
  $('#fetch-data').click(() => fetchData())




})
