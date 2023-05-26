import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet";
import './leaflet.css'
import './root.css'

function MapPlaceholder() {
  return (
    <p>
      Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

export default function root(): JSX.Element {
  return(
    <MapContainer
      center={[62.24144, 25.758846]}
      maxBounds={[[70.182772,18.506675],[59.712756,32.559953]]}
      maxBoundsViscosity={0.9}
      zoomDelta={0}
      zoom={7}
      placeholder={<MapPlaceholder />}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>  
  )
}
