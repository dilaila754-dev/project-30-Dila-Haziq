let map = L.map('map',{

  zoomControl:false,
  scrollWheelZoom:false

}).setView([4.2125,101.6230],18);

L.tileLayer(

'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',

{
  maxZoom:20
}

).addTo(map);

L.imageOverlay(

"images/ikm_lumut_layout.png",

[
  [4.2150,101.6200],
  [4.2100,101.6270]
],

{
  opacity:0.85
}

).addTo(map);

// MARKERS

for(let key in locations){

  L.marker(locations[key])

    .addTo(map)

    .bindPopup(locationNames[key]);

}