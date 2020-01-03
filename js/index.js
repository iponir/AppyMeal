/* Google Metadata */
//client_id : 589433053841-5p63ee18j0p4gju48lnusclrvg6fnp8k.apps.googleusercontent.com
//*OAuth client -> client_secret : JxbpFD5QqGNUYSVB9S0KvUqL
//appyMealClient -> client_secret : cr_RGlaDilZPUHjb2wYNDcYp
//Web client -> client_secret :  gH7kY9aKQdM8t4jiptWnTNeR

/* Redis Metadata */
//app_id : 688594048297404

/* Redis Password */
//ssh appymeal.ga -> psswd: appymeal1


//RSync?
//EngineX -> Current Web Server 


//const redis = require('redis');

function googleLogin() {

    //TODO: Add functionality
}

function facebookLogin() { 

  //TODO: Add functionality
}

function switchPage() {
    window.location.href="main.html";
}

function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
    var myUserEntity = {};
    myUserEntity.Id = profile.getId();
    myUserEntity.Name = profile.getName();
    
    //Store the entity object in sessionStorage where it will be accessible from all pages of your site.
    sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));

    switchPage();
}

function checkIfLoggedIn() {
  if(sessionStorage.getItem('myUserEntity') == null){
    //Redirect to login page, no user entity available in sessionStorage
    window.location.href='main.html';
  } else {
    //User already logged in
    var userEntity = {};
    userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
    window.location.href='main.html';
  }
}

function GoogleSignOut() {

    var auth2 = gapi.auth2.getAuthInstance();
    console.log(auth2);
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    auth2.disconnect();
    window.location.href = "index.html";
}

function FacebookSignOut() {

  FB.logout(function(response) {
    // user is now logged out
  });
  window.location.href = "index.html";
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}

function checkLoginState() {

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

    window.location.href = "main.html";
}

function appyLogin() {
    
    //Used by access through the redis-cli > ssh appymeal.ga -> $redis-cli -> /*NOT REALLY*/
    var redis = require('redis');
    var client = redis.createClient(80, "localhost");

    client.on('connect', function() {
        console.log('connected');
    })
}