var writeToScreen = function (message) {
    document.body.innerHTML += message + "<br>";
}

var position = {longitude: 51.1552819, latitude:16.8978038};

var mymap = L.map('mapid').setView([position.longitude, position.latitude], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', 
{
maxZoom: 18,
attribution: 'Trapeze test implementation',
id: 'mapbox.streets'
}).addTo(mymap);

L.marker([position.longitude, position.latitude]).addTo(mymap);


var websockerAddress = "ws://"+window.location.host;

var websocket = new WebSocket(websockerAddress);
//websocket.onerror = function(evt) { writeToScreen(" Connection Error"); };
//websocket.onopen = function(evt) { writeToScreen("Connected!!");};
websocket.onmessage = function(evt) { 
	//map.setView(new L.LatLng(evt.data.longitude, evt.data.latitude), 8);
	//map.panTo(new L.LatLng(40.737, -73.923));
	position = JSON.parse(evt.data);
	mymap.panTo(new L.LatLng(position.longitude, position.latitude));
	L.marker([position.longitude, position.latitude]).addTo(mymap);
//writeToScreen(evt.data);
};
