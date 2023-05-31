import { useMap, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './leaflet.css';
import './root.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
// import { useStationData } from '../handlers/useStationData';
import { useSensorData } from '../handlers/fetchSensorData';

function MapPlaceholder(): JSX.Element {
  return (
    <p>
      Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
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

export default function Sensor(): JSX.Element {
  // update this variable to change the display station
//   const displayStation = 136;

  // store station location data in stationData
//   const [stationData, isLoading, stationName, stationID] = useStationData(displayStation);
  
  // update this variable to change the display sensor
  const displaySensor = "23226";

  const [sensorData, isLoading] = useSensorData(displaySensor); // Destructure the sensor data from the tuple
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

//   const firstLocation = stationData.length > 0 ? stationData[0] : null;

  return (
    <MapContainer
      center={ [65.24144, 25.758846]}
      maxBounds={[[70.182772, 18.506675], [59.712756, 32.559953]]}
      maxBoundsViscosity={0.9}
      zoomDelta={0}
      zoom={12}
      placeholder={<MapPlaceholder />}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={ [65.24144, 25.758846]}>
        <Popup> <br></br>Sensor: {sensorData.id}  <br></br>Sensor name:{sensorData.name}  <br></br>Unit: {sensorData.unit}  <br></br>Value: {sensorData.value} </Popup>
      </Marker>

      <Geoman />
    </MapContainer>
  );
}
