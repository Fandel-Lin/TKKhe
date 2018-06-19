let localStorage = window.localStorage

$('document').ready(function() {
  // Chenge planes
  $("#Sign_Up").click(function(){
    $(".plane1").toggle();
    $(".plane2").toggle();
  });
  $("#back").click(function(){
    $(".plane1").toggle();
    $(".plane2").toggle();
  });

  // Facebook login
  $("#FB_login").click(function(){
    FB.login(function(response){
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
         $(".plane1").hide();
         $(".plane2").hide();
         $(".plane3").show();
         setProfile();
         // Send user id to the server
         $.ajax({
           method: "post",
           url: "/user_login",
           data: {
             user_id    : response.id,
             user_name  : response.name
             // get whatever you need
           },
           success: function() {
           }
         })
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
    });
  });
})

// Facebook SDK setup
var user_id, user_name, accessToken;
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
          localStorage.setItem('user_id', user_id)
          accessToken = response.authResponse.accessToken;
          
          FB.api('/me', function(response) {
            localStorage.setItem('user_name', response.name)
            user_name = response.name;
            setProfile();
          })
          $(".plane1").hide();
          $(".plane2").hide();
          $(".plane3").show();

      } else if (response.status === 'not_authorized') {
          // Login but not connect

      } else {
          // Not login

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

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/zh_TW/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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
