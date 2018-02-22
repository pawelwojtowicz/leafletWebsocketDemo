var writeToScreen = function (message) {
    document.body.innerHTML += message + "<br>";
}


var mymap = L.map('mapid').setView([51.1552819, 16.8978038], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', 
{
maxZoom: 18,
attribution: 'Trapeze test implementation',
id: 'mapbox.streets'
}).addTo(mymap);

L.marker([51.1552819, 16.8978038]).addTo(mymap);


var websockerAddress = "ws://"+window.location.host;

//var websocket = new WebSocket(websockerAddress);
//websocket.onerror = function(evt) { writeToScreen(" Connection Error"); };
//websocket.onopen = function(evt) { writeToScreen("Connected!!");};
//websocket.onmessage = function(evt) { 
	//map.setView(new L.LatLng(evt.data.longitude, evt.data.latitude), 8);
//writeToScreen(evt.data);
//};
