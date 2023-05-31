import { useMap, MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import L from "leaflet";
import './leaflet.css'
import './root.css'
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { Fragment } from "react";
import coordsData from "./data/coords.json"
import { useStationData } from '../handlers/useStationData';
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

{/* https://github.com/pointhi/leaflet-color-markers */}

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});



export default function Root(): JSX.Element {
  // update this variable to change the display station
  const displayStation = 136;

  // store station location data in stationData
  const [stationData, isLoading, stationName, stationID] = useStationData(displayStation);
  
  // update this variable to change the display sensor
  const displaySensor = "23226";

  const [sensorData] = useSensorData(displaySensor); // Destructure the sensor data from the tuple
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const firstLocation = stationData.length > 0 ? stationData[0] : null;

  return(

    <Fragment>

    <p className="overlay-title">Traffic Visualizer</p>

    {/* <div className="overlay-filtering"> 
      <p className="overlay-filtering-title">Data filtering</p>
      <input type="radio" id="showMarkers" name="markers" checked />
      <label>Show Markers</label><br/>
      <input type="radio" id="hideMarkers" name="markers" />
      <label >Hide Markers</label><br/>   
    </div> */}

    <MapContainer
      center={firstLocation ? [firstLocation.latitude, firstLocation.longitude] : [65.24144, 25.758846]}
      maxBounds={[[70.182772, 18.506675], [59.712756, 32.559953]]}
      maxBoundsViscosity={0.9}
      zoomDelta={0}
      zoom={12}
      placeholder={<MapPlaceholder />}>


      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={firstLocation ? [firstLocation.latitude, firstLocation.longitude] : [65.24144, 25.758846]}>
        <Popup> Station name: {stationName} <br></br> Station id: {stationID} <br></br>Sensor: {sensorData.id}  <br></br>Sensor name:{sensorData.name}  <br></br>Unit: {sensorData.unit}  <br></br>Value: {sensorData.value} </Popup>
      </Marker>

      <Geoman />


      <LayersControl position="topright" collapsed={false} >
        <LayersControl.Overlay name="Show markers">
          <LayerGroup>
            {coordsData.map(coords => (
              <Marker 
              key = {coords.properties.id}
              position={[coords.geometry.coordinates[1], coords.geometry.coordinates[0]]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
              }}>
                <Popup>
                  {coords.properties.tasks}
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Show markers 2">
          <LayerGroup>
            {coordsData.map(coords => (
              <Marker 
              key = {coords.properties.id}
              position={[coords.geometry.coordinates[1], coords.geometry.coordinates[0]]}
              icon={greenIcon}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
              }}>
                <Popup>
                  {coords.properties.tasks}
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Show markers 3">
          <LayerGroup>
            {coordsData.map(coords => (
              <Marker 
              key = {coords.properties.id}
              position={[coords.geometry.coordinates[1], coords.geometry.coordinates[0]]}
              icon={redIcon}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
              }}>
                <Popup>
                  {coords.properties.tasks}
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Show markers 4">
          <LayerGroup>
          {coordsData.map(coords => (
              <Marker 
              key = {coords.properties.id}
              position={[coords.geometry.coordinates[1], coords.geometry.coordinates[0]]}
              icon={orangeIcon}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
              }}>
                <Popup>
                  {coords.properties.tasks}
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Show markers 5">
          <LayerGroup>
            
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Show markers 6">
          <LayerGroup>
            
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Show markers 7">
          <LayerGroup>
            
          </LayerGroup>
        </LayersControl.Overlay>
            
      
      </LayersControl>


    </MapContainer>

    </Fragment>

  )
}
