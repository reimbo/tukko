import { useMap } from "react-leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

function Geoman() {
  const map = useMap();
  map.pm.addControls({
    drawMarker: false,
    rotateMode: false,
    customControls: false,
    drawText: false,
    drawCircleMarker: false,
    drawPolyline: false,
    cutPolygon: false,
  });

  
  return null;
}

export default Geoman;
