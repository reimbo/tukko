import L from "leaflet";

{/* https://github.com/pointhi/leaflet-color-markers */}

//Create a marker and defines its features
function createMarker(color: string) {
  return new L.Icon({
    iconUrl: `/images/marker-icon-2x-${color}.png`,
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

//Exports markers to MapLayers
export { createMarker };