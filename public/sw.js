let CACHE_NAME = 'ttkhe'
const cacheFile = [
  "./",
  "./index.html",
  "./css/index.css",
  "css/skel.css",
  "css/style.css",
  "css/style-xlarge.css",
  "./js/index.js",
]
 

//install(when user first open our website)
self.addEventListener('install', event => {
  //set cache
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(cacheFile))
    //.then(() => self.skipWaiting())
  )
})

// activate
self.addEventListener('activate', event => {
  console.log(`activate ${CACHE_NAME}, now ready to handle fetches`)
  //clear old cache  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(item => {
          if (item !== CACHE_NAME) {
            return caches.delete(item)
          }
        })
      )
    })
  )
})
//fetch and save new response from server into caches
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      //if there is response in cache 
      if (response) {
        return response;
      }

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      let fetchRequest = event.request.clone();
      //send request to server
      return fetch(fetchRequest).then(
        //handle response from server
        (response) => {
          // Check if we received a valid response
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          let responseToCache = response.clone();
          
          //put response from server into cache 
          caches.open(CACHE_NAME)
            .then((cache) => {
               cache.put(event.request, responseToCache);
            })
          
          return response
        }
      )
    })
  )
})
