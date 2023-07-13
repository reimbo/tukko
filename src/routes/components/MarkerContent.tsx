import { Marker } from "react-leaflet";
import { Station, Roadwork } from "../../interfaces/Interfaces";
import React, { useState, Suspense } from "react";
import { getSwgImage } from "./MarkerIcon";

// Components
const StationTooltip = React.lazy(() => import("./Tooltip"));
import { Marker as M } from "leaflet";
import { getStationRoadworks } from "../scripts/getStationRoadworks";

let originalColors: string[] = [];
const colorHover = "hsl(100,50%,100%)";

export function MarkerContent({
  station,
  roadworks,
}: {
  station: Station;
  roadworks: Roadwork[];
}): JSX.Element | null {
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedStation, setSelectedStation] = useState<
    null | number | undefined
  >(null);
  const [marker, setMarker] = useState<null | M>(null);

  const stationRoadworks = getStationRoadworks(station, roadworks);

  if (
    (!station.sensors || station.sensors?.length === 0) &&
    stationRoadworks.length === 0
  )
    return null;

  return (
    <div>
      <Marker
        eventHandlers={(() => ({
          click: (e) => {
            const m = e.target as M;
            setSelectedStation(station.id);
            setMarker(m);
            setShowTooltip(true);
            m.openTooltip();
          },
          tooltipclose: (e) => {
            const m = e.target as M;
            if (!m.isPopupOpen()) {
              setSelectedStation(null);
              setMarker(null);
              setShowTooltip(false);
            }
          },
          popupopen: (e) => {
            const m = e.target as M;
            m.closeTooltip();
          },
          popupclose: (e) => {
            const m = e.target as M;
            if (!m.isTooltipOpen()) {
              setSelectedStation(null);
              setMarker(null);
              setShowTooltip(false);
            }
          },
          mouseover: (e) => {
            const markerElement = e.target.getElement();
            const svgElement = markerElement.getElementsByTagName(
              "svg"
            )[0] as SVGSVGElement;

            const pathElements = svgElement.getElementsByTagName("path");
            originalColors = Array.from(pathElements).map(
              (pathElement) => pathElement.style.fill
            );
            originalColors = Array.from(pathElements).map(
              (pathElement) => pathElement.style.fill
            );

            for (let i = 0; i < pathElements.length; i++) {
              const pathElement = pathElements[i] as SVGPathElement;
              pathElement.style.fill = colorHover;
            }
          },
          mouseout: (e) => {
            const markerElement = e.target.getElement();
            const svgElement = markerElement.getElementsByTagName(
              "svg"
            )[0] as SVGSVGElement;
            const pathElements = svgElement.getElementsByTagName("path");
            // Restore the original colors
            for (let i = 0; i < pathElements.length; i++) {
              const pathElement = pathElements[i] as SVGPathElement;
              pathElement.style.fill = originalColors[i];
            }
          },
        }))()}
        pmIgnore
        key={station.id}
        alt={station.name.replaceAll("_", " ")}
        position={[station.coordinates.latitude, station.coordinates.longitude]}
        icon={getSwgImage(station, stationRoadworks)}
      >
        {showTooltip && station.id === selectedStation && marker && (
          <Suspense>
            <StationTooltip
              station={station}
              roadworks={stationRoadworks}
              marker={marker}
            />
          </Suspense>
        )}
      </Marker>
    </div>
  );
}
