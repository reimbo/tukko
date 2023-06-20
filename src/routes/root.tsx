import { MapContainer, TileLayer } from "react-leaflet";
import './leaflet.css';
import './root.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
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
      Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

export default function Root(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Station[] | null>(null);

  useEffect(() => {
    const data = async () => {
      try {
        const res: Station[] = await fetchData();
        setData(res);
      } catch (err) {
        console.log(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    data();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return(
    <Fragment >
      <h1 id="overlay-title" className="overlay-title">Travis</h1>
      <div className="logosContainer">
        <a href="https://www.wimmalab.org/fi" target="_blank"><img className="wimmaLabLogo" src={wimmaLabLogo} alt="WIMMA Lab Logo"/></a>
        <a href="https://wimma-lab-2023.pages.labranet.jamk.fi/iotitude/core-traffic-visualizer/" target="_blank"><img className="iotitudeLogo" src={iotitudeLogo} alt="IoTitude Logo"/></a>
      </div>
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
        <DarkModeToggle/>
        <FeedbackForm/>
        <MapLayers data={data} />
      </MapContainer>
    </Fragment>
  )
}
