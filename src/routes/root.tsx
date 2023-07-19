import { MapContainer, TileLayer } from "react-leaflet";
import "./leaflet.css";
import "./root.css";
import { Fragment, Suspense } from "react";

// Components
import Geoman from "./components/Geoman";
/* import LeafletgeoSearch from "./components/LeafletgeoSearch"; */
import { DarkModeToggle } from "./components/DarkModeToggle";
import { MapLayers } from "./components/MapLayers";
import { FeedbackForm } from "./components/FeedbackForm";
import { LogosContainer } from "./components/LogosContainer";

import { LangToggle } from "./components/LangSelect";

function MapPlaceholder(): JSX.Element {
  return (
    <p>
      Tukko - Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

export default function Root(): JSX.Element {
  return (
    <Fragment>
      <h1 id="overlay-title" className="overlay-title">
        Tukko
      </h1>
      <h2 className="overlay2-title">Traffic Visualizer</h2>
      <LogosContainer />
      <MapContainer
        center={[60.2, 24.9]}
        maxBoundsViscosity={0.9}
        zoomDelta={1}
        zoom={12}
        minZoom={7}
        maxZoom={17}
        placeholder={<MapPlaceholder />}
        doubleClickZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a target="_blank" href="https://wimma-lab-2023.pages.labranet.jamk.fi/iotitude/core-traffic-visualizer/80-Documents-and-reporting/gdpr-statement/">GDPR</a> | <a target="_blank" href="https://wimma-lab-2023.pages.labranet.jamk.fi/iotitude/core-traffic-visualizer/80-Documents-and-reporting/user-guide/">User Guide for Tukko</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Geoman />
        <DarkModeToggle />
        <Suspense>
          <FeedbackForm />
          <MapLayers />
          <div className="langContainer">
            <LangToggle />
          </div>
        </Suspense>
      </MapContainer>
    </Fragment>
  );
}
