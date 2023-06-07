import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import './leaflet.css'
import './root.css'
import { fetchStations }  from '../api/getStations';
import { sensorList,FetchSensors } from '../api/getSensors';
import stationData from '../routes/data/stationData.json';
import sensorsData from '../routes/data/sensorsData.json';
import {useState, useEffect, Fragment} from 'react';
import wimmaLabLogo from "/images/logo_round.png";
import iotitudeLogo from "/images/logo-iotitude.png";
import MarkerClusterGroup from 'react-leaflet-cluster'
// Components
import Geoman from "./components/Geoman"
import {  redIcon} from "./components/Icons"
/* import LeafletgeoSearch from "./components/LeafletgeoSearch"; */
import { DarkModeToggle } from "./components/DarkModeToggle";

function MapPlaceholder(): JSX.Element {
  return (
    <p>
      Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}








export default function Root(): JSX.Element {

// The Sensor data model is defined here - use these to search or filter the data
  interface Sensor {
    sensor_id: string;
    sensor_name: string;
    sensor_unit: string;
    sensor_value: string;
    sensor_stationId: string;
    sensor_traffic_value?: string;
  }
  
  // Fetch sensors data from the API and store in the sensorList
  const [_sensorDataList, setSensorDataList] = useState<Sensor[][]>([]);

  // Map will not show unless finished loading
  const [isLoading, setIsLoading] = useState(true);
  

  
  // Fetch sensors data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStations();
        await FetchSensors();
        setSensorDataList(sensorList);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // The combined data is passed to the MapContainer as props
  // CAUTION: These are prefetched station and sensor data - not real time data
  const combinedData = {
    // Store station longtitute and latitude data
    stationLocation: stationData.map((station) => station.station_location),
    // Store station IDs
    stationList: stationData.map((station) => station.station_id),
    // Store station names
    stationName: stationData.map((station) => station.station_name),
    // Store sensors data OHITUKSET_5MIN_LIUKUVA_SUUNTA1
    OHITUKSET_5MIN_LIUKUVA_SUUNTA1: sensorsData.flatMap((data: any) =>
      Array.isArray(data) ? data.filter((sensor: Sensor) =>
        ['OHITUKSET_5MIN_LIUKUVA_SUUNTA1', 'OHITUKSET_5MIN_LIUKUVA_SUUNTA2'].some(
          (name) => sensor.sensor_name === name
        )
      ) : []
    ),
    // Store KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1
    KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1: sensorsData.flatMap((data: any) =>
    Array.isArray(data) ? data.filter((sensor: Sensor) =>
      ['KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1', 'KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2'].some(
        (name) => sensor.sensor_name === name
      )
    ) : []
  )

  };
  
  // If data is still loading, show loading text
  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  return(

    <Fragment >

    <p className="overlay-title">Traffic Visualizer</p>
    <div className="logosContainer">
      <a href="https://www.wimmalab.org/fi" target="_blank"><img className="wimmaLabLogo" src={wimmaLabLogo} alt="WIMMA Lab Logo"/></a>
      <a href="https://wimma-lab-2023.pages.labranet.jamk.fi/iotitude/core-traffic-visualizer/" target="_blank"><img className="iotitudeLogo" src={iotitudeLogo} alt="IoTitude Logo"/></a>
    </div>

    <MapContainer
        center={[65.24144, 25.758846]}
        maxBounds={[[70.182772, 18.506675], [59.712756, 32.559953]]}
        maxBoundsViscosity={0.9}
        zoomDelta={0}
        zoom={5}
        minZoom={5}
        placeholder={<MapPlaceholder />}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
       
        
      <Geoman />

      <DarkModeToggle/>

      {/* <LeafletgeoSearch /> */}

      <LayersControl position="topright" collapsed={false} >

        <LayersControl.Overlay checked name="Show KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1">
          <MarkerClusterGroup>
          <LayerGroup>
            {combinedData.stationList.map((stationId:string, index:number) => (
            <Marker 
                key={stationId}
                position={[
                  combinedData.stationLocation[index].latitude,
                  combinedData.stationLocation[index].longitude
                ]}
                eventHandlers={{
                  mouseover: (event) => event.target.openPopup()
                }}
                icon={redIcon}
              >
                <Popup>
                  Station name: {combinedData.stationName[index]} <br/>
                  Station id: {stationId} <br/>
                  Sensor id: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_id} <br/>
                  Name: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_name} <br/>
                  Value: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_value} <br/>
                  Unit: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_unit} <br/>
                </Popup>
              </Marker>
              
            ))}
            </LayerGroup>
            
          </MarkerClusterGroup>
        </LayersControl.Overlay>
            
      
      </LayersControl>


    </MapContainer>
    

    </Fragment>

  )
}
