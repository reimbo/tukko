import { useMap, MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import L from "leaflet";
import './leaflet.css'
import './root.css'
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { Fragment } from "react";
import coordsData from "./data/coords.json";
import { stationLocation, stationName,stationList, fetchStations } from '../api/getStations';
import { fetchAllStations } from '../api/getSensors';
import React, {useState, useEffect} from 'react';
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import wimmaLabLogo from "./images/logo_round.png";
import iotitudeLogo from "./images/logo-iotitude.png";




/**
 * Variables for the map
 * stationLocation: array of objects containing the coordinates of the stations
 *    stationLocation[0].latitude: latitude of the first station
 *    stationLocation[0].longitude: longitude of the first station
 * stationName: array of strings containing the names of the stations
 *    stationName[0]: name of the first station
 * stationList: array of strings containing the ids of the stations
 *    stationList[0]: id of the first station
 */

/**
 * 
 * example marker popup with sensor data
 *  Station name: {stationName[0]} <br/>
 *  Station id: {stationList[0]} <br/>
 *  Sensor name: {sensorDataList[0].name} <br/>
 *  Unit: {sensorDataList[0].unit} <br/>
 *  Value: {sensorDataList[0].value}
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

// const greenIcon = new L.Icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

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
  // update this variable to change the number of display stations
  // const displayStation = 50;

  type SensorData = {
    id: number;
    name: string;
    unit: string;
    value: number;
  };

  const [sensorDataList, setSensorDataList] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  
  // console.log(stationLocation.length);
  // console.log(stationName.length);

  // update this variable to change the display sensor
  // const displaySensor = "23226";
  
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
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stationDataResponse = await fetchAllStations();
        if (stationDataResponse && stationDataResponse.length > 0) {
          setSensorDataList(stationDataResponse);
        }
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  if (isLoading) {
    return <p>Loading...</p>;
  }
  


  console.log(stationLocation.length+"locations***\n")
  console.log(stationName.length+"names***\n")
  // console.log(stationList.length+"ids***\n")
  console.log(sensorDataList.length+" sensor ***\n")



  //The combined data is passed to the MapContainer as props
  const combinedData = {
    stationLocation: stationLocation,
    stationList: stationList,
    stationName: stationName,
    sensorDataList: sensorDataList,

  }

  function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider({
        params: {
          'accept-language': 'EN,FI', 
          countrycodes: 'FI', 
        },
      });
  
      const searchControl = new GeoSearchControl({
        provider,
      });
  
      map.addControl(searchControl);
  
      return () => map.removeControl(searchControl);
    }, []);
  
    return null;
  }

  return(

    <Fragment>

    <p className="overlay-title">Traffic Visualizer</p>

    <div className="logosContainer">
      <a href="https://www.wimmalab.org/fi" target="_blank"><img className="wimmaLabLogo" src={wimmaLabLogo} alt="WIMMA Lab Logo"/></a>
      <a href="https://wimma-lab-2023.pages.labranet.jamk.fi/iotitude/core-traffic-visualizer/" target="_blank"><img className="iotitudeLogo" src={iotitudeLogo} alt="IoTitude Logo"/></a>
    </div>

    {/* <div className="overlay-filtering"> 
      <p className="overlay-filtering-title">Data filtering</p>
      <input type="radio" id="showMarkers" name="markers" checked />
      <label>Show Markers</label><br/>
      <input type="radio" id="hideMarkers" name="markers" />
      <label >Hide Markers</label><br/>   
    </div> */}

    

      <MapContainer
        center={[65.24144, 25.758846]}
        maxBounds={[[70.182772, 18.506675], [59.712756, 32.559953]]}
        maxBoundsViscosity={0.9}
        zoomDelta={0}
        zoom={6}
        minZoom={5}
        placeholder={<MapPlaceholder />}
      >

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"          
      />
      
      <Geoman />

      <LeafletgeoSearch />

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

        <LayersControl.Overlay name="Stations">
            <LayerGroup>
            {combinedData.stationList.map((stationId, index) => (
              <Marker 
                key={stationId}
                position={[
                  combinedData.stationLocation[index].latitude,
                  combinedData.stationLocation[index].longitude
                ]}
                eventHandlers={{
                  mouseover: (event) => event.target.openPopup()
                }}
                icon={orangeIcon}
              >
                <Popup>
                  Station name: {combinedData.stationName[index]} <br/>
                  Station id: {stationId} <br/>
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
