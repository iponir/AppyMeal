
//'use strict';
//
//Constants
const express = require('express');
const http = require('http');
const https = require('https');
const redis = require('redis');
const path = require('path');
const fs = require('fs');
const index = require('./index.js');
//const modular = require('./js/modular.js');

const PORT = 8080;
const HOST = '127.0.0.1';
const app = express();

console.log(module);

//App -> Express Server Launch
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendfile('index.html');
});
app.listen(PORT, HOST);
console.log(`\nRunning on http://${HOST}:${PORT}`);


//App HTTP Server Launch
/*
http.createServer(function(req, res){
    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
	console.log(res);
    });
}).listen(8080);
console.log("\n");
console.log("Running on -> http://localhost:8080");
*/


/*


function googleLogin() {

    //TODO: Add functionality
}

function switchPage() {

   app.post('/auth', function(req, res) {
	   // Your logic and then redirect
	   res.redirect('main.html');
   });

res.send('<script>window.location.href="main.html";</script>');
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

function facebookLogin() { 

    //TODO: Add functionality
}

function appyLogin() {
    
    //Used by access through the redis-cli > ssh appymeal.ga -> $redis-cli
    var redis = require('redis');
    var client = redis.createClient(8080, "localhost");

    client.on('connect', function() {
        console.log('connected');
    })
}

function appyLoginNode() {
    	//Access through the redis-cli > ssh appymeal.ga -> $redis-cli
    	var client = redis.createClient(8080, "localhost");
    	
    	client.on('connect', function() {
        	console.log('connected');
    })
}

*/
