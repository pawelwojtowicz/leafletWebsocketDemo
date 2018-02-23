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
  console.log( "updateGPS - "+ canPayload);
  
  var latHexString = "";
  var lonHexString = "";
  
  for ( i = 0 ; i < 16 ; ) {
    if ( i < 8 ) {
      latHexString = canPayload[i+1] + latHexString;
      latHexString = canPayload[i] + latHexString;
    } else {
      lonHexString = canPayload[i+1] + lonHexString;
      lonHexString = canPayload[i] + lonHexString;
    }
    
    i += 2;
  }
  
  vehicleData.longitude = Buffer(lonHexString,'hex').readFloatBE(0);
  vehicleData.latitude  = Buffer(latHexString,'hex').readFloatBE(0);
  
  
  console.log("lat="+ latHexString + " lon="+ lonHexString);
}

function updateSpeed( canPayload ) {

}


exports.initialize = function( externalUpdateProcedure ) {
  updateProcedure = externalUpdateProcedure;
}

exports.processVehicleMessage = function ( message) {
  var messageLength = message.length;
  var begin = -1;
  var updateNeeded = true;
  
  for ( i = 0; i< messageLength ; ++i ) {
    var character = message[i];
  
    if ( character === '{') {
      begin = i;
    } else if ( begin !== -1 && character === '}' ) {
      var singleMessage = message.substring( begin,(i+1>messageLength)?i:i+1);
      var canObject = JSON.parse(singleMessage);
      console.log( "can ID = " + String(canObject.c));
      
      if ( canObject.c === 2000 ) {
        updateGPSPosition( canObject.d);
        updateNeeded = true;
      } else if ( canObject.c === 1999 ) {
        updateSpeed(canObject.d);
        updateNeeded = true;
      }
      
      if ( updateNeeded ) {
        updateVehicleInfo();
      }
      begin = -1;
    }
  }
}