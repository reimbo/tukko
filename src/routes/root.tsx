import { MapContainer, TileLayer } from "react-leaflet";
import { Map } from "leaflet";
import "./leaflet.css";
import "./root.css";
import { Fragment, Suspense, useContext, useRef } from "react";
import { StationContext, Context} from "../context/StationContext";

// Components
import Geoman from "./components/Geoman";
/* import LeafletgeoSearch from "./components/LeafletgeoSearch"; */
import { DarkModeToggle } from "./components/DarkModeToggle";
import { MapLayers } from "./components/MapLayers";
import { FeedbackForm } from "./components/FeedbackForm";
import { LogosContainer } from "./components/LogosContainer";
import { LangToggle } from "./components/LangSelect";
import ModalData from "./components/ModalData";

function MapPlaceholder(): JSX.Element {
  return (
    <p>
      Tukko - Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  );
}

export default function Root(): JSX.Element {
  const { station } = useContext(StationContext) as Context
  const mapRef = useRef<Map | null>(null);

  window.addEventListener("touchstart", (e) => {
    if (!mapRef.current) return
    const pane: HTMLDivElement | null = document.querySelector('.leaflet-tooltip-pane')
    const feedback: HTMLDivElement | null = document.querySelector('.Collapsible')
    const toggle: HTMLElement | null = document.getElementById('toggleContainer')
    for (const div of [pane, feedback, toggle]) {
        if (div && div.contains(e.target as HTMLElement)) mapRef.current.dragging.disable()
    }
  })

  window.addEventListener("touchend", () => {
    if (!mapRef.current) return
    if (!mapRef.current.dragging.enabled()) mapRef.current.dragging.enable()
  })

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
        ref={mapRef}
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
      <Suspense>
        {station && <ModalData targetID={station.id.toString()} />}
      </Suspense>
    </Fragment>
  );
}
