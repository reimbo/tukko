import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet";
import './leaflet.css'
import './root.css'

function MapPlaceholder() {
  return (
    <p>
      Map of London.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

export default function root(): JSX.Element {
  return(
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      placeholder={<MapPlaceholder />}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>  
  )
}
