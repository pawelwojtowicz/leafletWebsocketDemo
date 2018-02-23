var app = angular.module("canMap", ["leaflet-directive", "ngWebsocket"]);

app.service('backendInfoService', [ "$rootScope", "$websocket", function($rootScope, $websocket) {
  var vm = this;
  vm.listeners = [];

  var ws = $websocket.$new({
      url: "ws://" + window.location.host ,
      //mock: true,
      reconnect: true
  });
  
  ws.$on("$message", function (message) {
    //console.log(message);
    var vhInfo = JSON.parse(message);
    //console.log("new position" + JSON.stringify(vhInfo));
    vm.listeners.forEach( function( clbk ) {
      clbk(vhInfo);
    });
    
    if(!$rootScope.$$phase) { // prevents triggering a $digest if there's already one in progress
      $rootScope.$digest();
    }
  });
  
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
    lng: 16.8978038,
    zoom: 18
  };
  
  vm.updateVhPosition = function( vhInfo ) {
    vm.vhPosition.lat = vhInfo.latitude;
    vm.vhPosition.lng = vhInfo.longitude;
    
    vm.busMark = {
        bus1: {
            lat: vm.vhPosition.lat,
            lng: vm.vhPosition.lng,
            message: "Bus",
            focus: true,
            draggable: false
        }
    };
    
    console.log("new position" + JSON.stringify(vm.vhPosition));
  };
  
  backendInfoService.registerVhInfoListener( vm.updateVhPosition );

}]);

app.controller('speedController', [ 'backendInfoService', function(backendInfoService) {
  var vm = this;
  
  vm.speed = 0;
  
  
  vm.updateSpeed = function( vhInfo ) {
    vm.speed = vhInfo.speed;
    console.log("new speed" + vm.speed);
  };
  
  backendInfoService.registerVhInfoListener( vm.updateSpeed );

}]);