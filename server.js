var httpPort = 8080;

var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));  



app.listen(httpPort);
console.log("App listening on port +" + String(httpPort));