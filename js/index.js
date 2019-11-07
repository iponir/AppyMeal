/* Google Metadata */
//client_id : 589433053841-5p63ee18j0p4gju48lnusclrvg6fnp8k.apps.googleusercontent.com
//*OAuth client -> client_secret : JxbpFD5QqGNUYSVB9S0KvUqL
//appyMealClient -> client_secret : cr_RGlaDilZPUHjb2wYNDcYp
//Web client -> client_secret :  gH7kY9aKQdM8t4jiptWnTNeR

/* Redis Metadata */
//app_id : 688594048297404

/* Redis Password */
//ssh appymeal.ga -> psswd: appymeal1


function googleLogin() {

}

function onSignIn(googleUser) {

    try { 
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

        window.open("secIndex.html",'_self');

    } catch(error) {
        console.log(error);
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  
function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

function facebookLogin() { 

}

function appyLogin() {

}