var user_id, user_name, accessToken;

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/zh_TW/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Facebook SDK setup
window.fbAsyncInit = function() {
  FB.init({
    appId            : '193212224643038',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.0'
  });

  FB.getLoginStatus(function(response) {

      if (response.status === 'connected') {
          // Login and connect to app
          user_id = response.authResponse.userID;
          accessToken = response.authResponse.accessToken;
          FB.api('/me', function(response) {
            user_name = response.name;
            console.log('FB login success. Good to see you, ' + user_name + '.');
            setProfile();
          })

      } else if (response.status === 'not_authorized') {
          console.log("Login but not connect, please authorizing first.");

      } else {
          console.log("Still not login in facebook, please loging first.");

      }
  });
}

// Set profile images
function setProfile(){
  FB.api(
    '/me/picture?redirect=false&type=normal',
    function(response) {
      $("#profile_image").attr("src", response.data.url)
      $("#profile_image").css({
        "width": "40%",
        "border-radius": "8px",
        "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      })
      $("#user_name").text(user_name)
  })
}

// Post message on Facebook, this function was no longer supportted.
function postToWall(image, cap, des, msg) {
    var args = {
        method: 'feed',
        name: 'TKKhe',
        link: 'https://luffy.ee.ncku.edu.tw:10118/',
        picture: image,
        caption: cap,
        description: des,
        message: msg
    };
    FB.api('/me/feed', 'post', args, onPostToWallCompleted);
    console.log("waiting...");
}

function onPostToWallCompleted(response) {
    if (!response || response.error) {
      console.log('Error occured: ' + response.error.message);
    } else {
      console.log('post success, ID: ' + response.id);
    }
}

// Check user permission scope
function checkPermission(permission) {
  FB.api('/me/permissions', function(response) {
    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i]["permission"]==permission) {
        return true;
      }
    }
    return false;
  })
}
