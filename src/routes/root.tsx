import { useMap, MapContainer, TileLayer } from "react-leaflet";
import './leaflet.css'
import './root.css'
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

function MapPlaceholder(): JSX.Element {
  return (
    <p>
      Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

function Geoman() {
  const map = useMap();
  map.pm.addControls({
    drawMarker: false,
    rotateMode: false,
    customControls: false,
    drawText: false,
    drawCircleMarker: false,
    drawPolyline: false,
    cutPolygon: false
  });
  return null;
}

export default function root(): JSX.Element {
  return(
    <MapContainer
      center={[65.24144, 25.758846]}
      maxBounds={[[70.182772,18.506675],[59.712756,32.559953]]}
      maxBoundsViscosity={0.9}
      zoomDelta={0}
      zoom={6}
      placeholder={<MapPlaceholder />}>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Geoman />

    </MapContainer>
  )
}
