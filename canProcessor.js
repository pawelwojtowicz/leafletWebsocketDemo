var vehicleData = { longitude : 51.1552819 , 
                    latitude : 16.8978038 ,
                    speed : 150 };
                    
var updateProcedure = null;

function updateVehicleInfo() {
  if (updateProcedure !== null) {
    var vehicleDataJSONString = JSON.stringify(vehicleData);
    updateProcedure(vehicleDataJSONString);
  }
}

function updateGPSPosition( canPayload) {
  vehicleData.longitude = Buffer(canPayload.substring(0,8),'hex').readFloatBE(0);
  vehicleData.latitude  = Buffer(canPayload.substring(8,16),'hex').readFloatBE(0);
}

function updateSpeed( canPayload ) {
  var speedHex = "0x"+canPayload.substring(4,6) + canPayload.substring(2,4);
  var speed = parseInt(speedHex) * 1/256;
  
  vehicleData.speed = speed;
}

exports.initialize = function( externalUpdateProcedure ) {
  updateProcedure = externalUpdateProcedure;
}

exports.processVehicleMessage = function ( message) {
  var messageLength = message.length;
  var begin = -1;
  var updateNeeded = false;
  
  console.log(message);
  
  for ( var i = 0; i< messageLength ; ++i ) {
    var character = message[i];
  
    if ( character === '{') {
      begin = i;
    } else if ( begin !== -1 && character === '}' ) {
      var singleMessage = message.substring( begin,(i+1>messageLength)?i:i+1);
      var canObject = JSON.parse(singleMessage);
            
      if ( canObject.c === 2000 ) {
        updateGPSPosition( canObject.d);
        updateNeeded = true;
      } else if ( canObject.c === 419361024 ) {
        updateSpeed(canObject.d);
        updateNeeded = true;
      }
      
      begin = -1;
    }
  }
  
  if ( 0 ) {
    updateVehicleInfo();
  }
}

exports.updateVehicleInfo = function() {
  if (updateProcedure !== null) {
    var vehicleDataJSONString = JSON.stringify(vehicleData);
    updateProcedure(vehicleDataJSONString);
  }
}
