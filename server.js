
'use strict';

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

function appyLoginNode() {
    	//Access through the redis-cli > ssh appymeal.ga -> $redis-cli
    	var client = redis.createClient(8080, "localhost");
    	
    	client.on('connect', function() {
        	console.log('connected');
    })
}

//App -> Express Server Launch

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

