import { MapContainer, TileLayer } from "react-leaflet";
import './leaflet.css';
import './root.css';
import { Fragment, useEffect, useState } from "react";
import wimmaLabLogo from "/images/logo_round.png";
import iotitudeLogo from "/images/logo-iotitude.png";

// Components
import Geoman from "./components/Geoman"
/* import LeafletgeoSearch from "./components/LeafletgeoSearch"; */
import { DarkModeToggle } from "./components/DarkModeToggle";
import { MapLayers } from "./components/mapLayers";
import { FeedbackForm } from "./components/FeedbackForm";
import { Loader } from "./components/Loader"

import { fetchData } from "./scripts/dataFetch";
import { Station } from "../interfaces/sensorInterfaces";

function MapPlaceholder(): JSX.Element {
  return (
    <p>
      Travis - Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

export default function Root(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Station[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res: Station[] = await fetchData();
        setData(res);
      } catch (err) {
        console.log(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;
  else return(
    <Fragment >
      <h1 id="overlay-title" className="overlay-title">Travis</h1>
      <div className="logosContainer">
        <a href="https://www.wimmalab.org/fi" target="_blank"><img className="wimmaLabLogo" src={wimmaLabLogo} alt="WIMMA Lab Logo"/></a>
        <a href="https://wimma-lab-2023.pages.labranet.jamk.fi/iotitude/core-traffic-visualizer/" target="_blank"><img className="iotitudeLogo" src={iotitudeLogo} alt="IoTitude Logo"/></a>
      </div>

      <DarkModeToggle/>
      <MapContainer
          center={ [62.2426, 25.7473]}
          maxBounds={[[71.09190036570573, 30.5869948880607], [59.8363114968474, 21.063569244498865]]}
          maxBoundsViscosity={0.9}
          zoomDelta={1}
          zoom={12}
          minZoom={7}
          maxZoom={17}
          placeholder={<MapPlaceholder />}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        <Geoman />
        <FeedbackForm/>
        <MapLayers data={data} />
        
      </MapContainer>
    </Fragment>
  )
}
