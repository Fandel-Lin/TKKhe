$(() => {
  //pwa:service worker register
  if('serviceWorker' in navigator) {  
    navigator.serviceWorker.register('../sw.js')  
    .then(reg => {console.log('Service Worker Registed', reg) })
    .catch(err => {console.log('Service Worker Error', err)})
  }
  
  const fetchData = () => {
    $.get('./data', res => {
      console.log(res) 
    })
  }

  fetchData()
})

