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
  ws.on('message', function ( msg ) {
    canProcessor.processVehicleMessage(msg)
  });
});
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

canProcessor.initialize(sendToWWWClientsFunction);

setInterval(function () {
  var stringOfMessages = '{\"c\":2000, \"d\":\"0123456789abcdef\", \"t\":32123433}{\"c\":1999, \"d\":\"fedcba9876543210\", \"t\":32123431}';
  console.log(stringOfMessages);
  canProcessor.processVehicleMessage(stringOfMessages);
}, 1000);


app.listen(httpPort);
console.log("App listening on port +" + String(httpPort));

