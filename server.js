var httpPort = 8080;

var long = 51.1552819;
var lat = 16.8978038;
var jump = 0.00100;

var express = require('express');
var morgan = require('morgan');
var app = express();
var expressWs = require('express-ws')(app);
var canProcessor = require('./canProcessor');

var sendToWWWClientsFunction = function( message ) {
  console.log("Sending message=" + message);
  expressWs.getWss('/').clients.forEach( function (client) {
    client.send(message);
  });
}
app.ws('/', function(ws, req) { });
app.ws('/vehicle', function( ws, req) {
  console.log("Vehicle Connected!");
  ws.on('message', function ( msg ) {
    canProcessor.processVehicleMessage(msg);
  });
});
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

canProcessor.initialize(sendToWWWClientsFunction);

setInterval(function () {
  console.log("Update Vehicle Info!");
  canProcessor.updateVehicleInfo();

}, 5000);


app.listen(httpPort);
console.log("App listening on port +" + String(httpPort));

