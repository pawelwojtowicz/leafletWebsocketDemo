var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', 
{
maxZoom: 18,
attribution: 'Trapeze test implementation',
id: 'mapbox.streets'
}).addTo(mymap);

L.marker([51.5, -0.09]).addTo(mymap);