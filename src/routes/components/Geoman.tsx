import { useMap } from "react-leaflet";
import { Map, Layer, Polygon, Polyline, Circle } from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

function Geoman() {
  const map: Map = useMap();

  map.pm.addControls({
    drawMarker: false,
    rotateMode: false,
    customControls: false,
    drawText: false,
    drawCircleMarker: false,
    drawPolyline: false,
    cutPolygon: false,
  });

  map.on("pm:create", function (e: { layer: Layer }) {
    const { layer } = e;

    if (layer instanceof Polygon || layer instanceof Polyline || layer instanceof Circle) {
      map.fitBounds(layer.getBounds());
    }
  });

  return null;
}

export default Geoman;
