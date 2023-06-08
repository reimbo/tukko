import { MapContainer, TileLayer } from "react-leaflet";
import './leaflet.css';
import './root.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { Fragment } from "react";
import { useSensorDataFetch } from "./scripts/sensorDataFetch";
import wimmaLabLogo from "/images/logo_round.png";
import iotitudeLogo from "/images/logo-iotitude.png";
// Components
import Geoman from "./components/Geoman"
import {  redIcon} from "./components/Icons"
/* import LeafletgeoSearch from "./components/LeafletgeoSearch"; */
import { DarkModeToggle } from "./components/DarkModeToggle";
import { getCombinedData } from "./scripts/combinedData";
import { MapLayers } from "./components/mapLayers";

function MapPlaceholder(): JSX.Element {
  return (
    <p>
      Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}


export default function Root(): JSX.Element {
  // Check if data is finished loading
  const isLoading = useSensorDataFetch();
  const combinedData = getCombinedData();
  
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
          center={ [62.2426, 25.7473]}
          maxBounds={[[72.182772, 18.506675], [58.712756, 33.559953]]}
          maxBoundsViscosity={0.9}
          zoomDelta={0}
          zoom={12}
          minZoom={5}
          placeholder={<MapPlaceholder />}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <Geoman />
        <DarkModeToggle/>
        <MapLayers combinedData={combinedData} redIcon={redIcon} />
      </MapContainer>
    </Fragment>

  )
}
