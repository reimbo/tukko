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

{/* images/markers */}
const blueIcon = new L.Icon({
   iconUrl: 'images/marker-icon-2x-blue.png',
   shadowUrl: 'images/marker-shadow.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
   iconUrl: 'images/marker-icon-2x-green.png',
   shadowUrl: 'images/marker-shadow.png',
   iconSize: [25, 41],
   iconAnchor: [12, 41],
   popupAnchor: [1, -34],
   shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'images/marker-icon-2x-red.png',
  shadowUrl: 'images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const orangeIcon = new L.Icon({
  iconUrl: 'images/marker-icon-2x-orange.png',
  shadowUrl: 'images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});




export default function Root(): JSX.Element {

// The Sensor data model is defined here - use these to search or filter the data
  interface Sensor {
    sensor_id: string;
    sensor_name: string;
    sensor_unit: string;
    sensor_value: string;
    sensor_stationId: string;
  }
  
  // The real time sensor data is fetched from the API and stored in the sensorList state
  const [sensorDataList, setSensorDataList] = useState<Sensor[][]>([]);

  // The status of the data fetching 
  const [isLoading, setIsLoading] = useState(true);
  
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



  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  // initialize a default first station location to check if data is available
  const firstLocation = stationLocation.length > 0 ? stationLocation[0] : null;



  // The combined data is passed to the MapContainer as props
  // CAUTION: These are prefetched station and sensor data - not real time data
  const combinedData = {
    stationLocation: stationData.map((station) => station.station_location),
    stationList: stationData.map((station) => station.station_id),
    stationName: stationData.map((station) => station.station_name),
    KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1: sensorsData.flatMap((data: any) =>
      Array.isArray(data) ? data.filter((sensor: Sensor) =>
        ['OHITUKSET_5MIN_LIUKUVA_SUUNTA1', 'OHITUKSET_5MIN_LIUKUVA_SUUNTA2'].some(
          (name) => sensor.sensor_name === name
        )
      ) : []
    )
  };

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
        <Marker position={firstLocation ? [firstLocation.latitude, firstLocation.longitude] : [65.24144, 25.758846]}>
          <Popup>
            Starting point !!! <br/>
            Station name: {stationName[0]} <br/>
            Station id: {stationList[0]} <br/>
            Sensor name: {sensorDataList[0][0].sensor_name} <br/>
            Unit: {sensorDataList[0][0].sensor_unit} <br/>
            Value: {sensorDataList[0][0].sensor_value}
            </Popup>
        </Marker>
      <Geoman />

      <LeafletgeoSearch />

      <LayersControl position="topright" collapsed={false} >
      <LayersControl.Overlay name="Show markers">
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
          >
            <Popup>
              Station name: {combinedData.stationName[index]} <br/>
              Station id: {stationId} <br/>
              Sensor name: {sensorList[index][8].sensor_name} <br/>
              

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

        <LayersControl.Overlay name="Show KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1">
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
