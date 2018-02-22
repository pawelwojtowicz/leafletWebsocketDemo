var httpPort = 8080;

var long = 51.1552819;
var lat = 16.8978038;
var jump = 0.0000001;

var express = require('express');
var morgan = require('morgan');
var app = express();
var expressWs = require('express-ws')(app);

app.ws('/', function(ws, req) { });

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

setInterval(function () {
	long = long+jump;
	lat = lat + jump;
	var newPosition = { longitude : long , latitude : lat};
	var message = JSON.stringify(newPosition);
	console.log(message);
	expressWs.getWss('/').clients.forEach( function (client) {
		client.send(message);
	});
}, 5000);


app.listen(httpPort);
console.log("App listening on port +" + String(httpPort));

