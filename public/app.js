const version = '1.0.3'

$(() => {
  //pwa:service worker register
  if('serviceWorker' in navigator) {  
    navigator.serviceWorker.register('./sw.js').then(reg =>{
        if(localStorage.getItem('sw_version') !== version){
            reg.update().then(()=>localStorage.setItem('sw_version', version))
        }
    }).catch(err => {console.log('Service Worker Error', err)})
  }
  
  const fetchData = () => {
  }

  fetchData()
})

