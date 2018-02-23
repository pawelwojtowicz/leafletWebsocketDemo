var app = angular.module("canMap", ["leaflet-directive"]);

app.service('backendInfoService', [ function() {
  var vm = this;
  vm.listeners = [];
  var websockerAddress = "ws://"+window.location.host;

  var ws = new WebSocket(websockerAddress);
  
  
  ws.onmessage = function( message ) {
    var vhInfo = JSON.parse(message.data);
    vm.listeners.forEach( function( clbk ) {
      clbk(vhInfo);
    });
  };
  
  vm.registerVhInfoListener = function( listener) {
    vm.listeners.push( listener);
  }
}]);

app.controller('mapController', [ 'backendInfoService', function(backendInfoService) {
  var vm = this;
  
  vm.tiles = {
    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  };
  
  vm.vhPosition = {
    lat: 51.1552819,
    lng: 17.8978038,
    zoom: 15
  };
  
  vm.updateVhPosition = function( vhInfo ) {
    vm.vhPosition.lat = vhInfo.latitude;
    vm.vhPosition.lng = vhInfo.longitude;
    console.log("new position" + JSON.stringify(vm.vhPosition));
  };
  
  //backendInfoService.registerVhInfoListener( vm.updateVhPosition );

}]);

app.controller('speedController', [ 'backendInfoService', function(backendInfoService) {
  var vm = this;
  
  vm.speed = 0;
  
  
  vm.updateSpeed = function( vhInfo ) {
    vm.speed = vhInfo.speed;
  };
  
  backendInfoService.registerVhInfoListener( vm.updateSpeed );

}]);