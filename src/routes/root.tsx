import { useMap, MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import L from "leaflet";
import './leaflet.css'
import './root.css'
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { Fragment } from "react";
import coordsData from "./data/coords.json"
import { stationLocation, isLoading, stationName,stationList, fetchStations } from '../api/getStations';
import { useSensorData } from '../handlers/fetchSensorData';
import {useState, useEffect} from 'react';

/**
 * Variables for the map
 * stationLocation: array of objects containing the coordinates of the stations
 * stationLocation[0].latitude: latitude of the first station
 * stationLocation[0].longitude: longitude of the first station
 * stationName: array of strings containing the names of the stations
 * stationName[0]: name of the first station
 * stationList: array of strings containing the ids of the stations
 * stationList[0]: id of the first station
 */


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
  // const displayStation = 136;

  // store station location data in stationData
  // const [stationLocation, isLoading, stationName,stationList]  = await useStationData();
  
  console.log(stationLocation.length);
  console.log(stationName.length);
  // update this variable to change the display sensor
  const displaySensor = "23226";

  const [sensorData] = useSensorData(displaySensor); // Destructure the sensor data from the tuple
  useEffect(() => {
    const fetchStationData = async () => {
      try {
        await fetchStations();
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };

    fetchStationData();
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const firstLocation = stationLocation.length > 0 ? stationLocation[0] : null;
  console.log(stationLocation.length+"locations***\n")
  console.log(stationName.length+"names***\n")
  console.log(stationList.length+"ids***\n")
  const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

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
        placeholder={<MapPlaceholder />}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={firstLocation ? [firstLocation.latitude, firstLocation.longitude] : [65.24144, 25.758846]}>
          <Popup>
            Station name: {stationName[0]} <br/>
            Station id: {stationList[0]} <br/>
            Sensor: {sensorData.id} <br/>
            Sensor name: {sensorData.name} <br/>
            Unit: {sensorData.unit} <br/>
            Value: {sensorData.value}
            </Popup>
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
                  Station name: {stationName[0]} <br/>
                  Station id: {stationList[0]} <br/>
                  Sensor: {sensorData.id} <br/>
                  Sensor name: {sensorData.name} <br/>
                  Unit: {sensorData.unit} <br/>
                  Value: {sensorData.value}
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
