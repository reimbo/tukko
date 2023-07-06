import { LayersControl, Marker, LayerGroup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Station } from "../../interfaces/sensorInterfaces";
import React, { useState, Suspense } from "react";

// Components
const StationTooltip = React.lazy(() => import("./Tooltip"));
import { Marker as M } from "leaflet";
import L from "leaflet";
import getTrafficColor from "../scripts/colourSpectrum";

export function MapLayers({
  data,
}: {
  data: Station[] | null;
}): JSX.Element | null {
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedStation, setSelectedStation] = useState<
    null | number | undefined
  >(null);
  const [marker, setMarker] = useState<null | M>(null);

  let originalColors: string[] = [];
  const MarkerList = data?.map((station) => {
    let colorDirection1 = "gray";
    let colorDirection2 = "gray";
    let colorHover = "hsl(100,50%,100%)";

    const findSensorValue = (sensorId: number): number | undefined => {
      return station.sensorValues.find((value) => value.id === sensorId)?.value;
    };

    try {
      const sensorValue5158 = findSensorValue(5158);
      if (sensorValue5158 !== undefined) {
        colorDirection1 = getTrafficColor(sensorValue5158);
      }
    } catch (error) {
      //console.error("Error retrieving sensor value 5158:", error);
    }

    try {
      const sensorValue5161 = findSensorValue(5161);
      if (sensorValue5161 !== undefined) {
        colorDirection2 = getTrafficColor(sensorValue5161);
      }
    } catch (error) {
      //console.error("Error retrieving sensor value 5161:", error);
    }

    const svgIcon = L.divIcon({
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="31px" height="40px" viewBox="0 0 102.30963 133.72514" version="1.1" id="svg5">
        <g id="g450" transform="translate(-76.460176,-68.607115)">
        <path
        xmlns="http://www.w3.org/2000/svg"
        d="m 129.4992,68.607117 c -28.04582,0 -53.039022,22.769503 -53.039022,50.815333 0,23.12458 37.581502,65.92356 51.154622,82.90981 -0.18282,-133.641124 4.48377,-74.00643 1.8844,-133.725143 z"
        id="path191"
        style="
          fill: ${colorDirection1};
          opacity: 0.70;
          stroke: #000000;
          stroke-width: 1mm;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m 128.50552,68.813498 c 25.61443,-0.01145 50.2643,22.562696 50.2643,50.608522 0,23.12458 -37.58151,65.92356 -51.15463,82.90981 0.18282,-133.641121 -1.13341,-133.483369 0.89033,-133.518332 z"
        id="path404"
        style="
          fill: ${colorDirection2};
          opacity: 0.70;
          stroke: #000000;
          stroke-width: 1mm;
          stroke-dasharray: none;
          stroke-opacity: 1;
        "
      />      
      </svg>`,
      className: "customMarker",
      iconSize: [24, 40],
      iconAnchor: [20, 40],
    });
    if (station.sensorValues.length > 0)
      return (
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
          position={[station.coordinates[0], station.coordinates[1]]}
          icon={svgIcon}
        >
          {showTooltip && station.id === selectedStation && marker && (
            <Suspense>
              <StationTooltip station={station} marker={marker} />
            </Suspense>
          )}
        </Marker>
      );
  });

  if (data && data.length > 0) {
    return (
      <LayersControl position="topright" collapsed={false}>
        <LayersControl.Overlay name="Show station data" checked>
          <MarkerClusterGroup pmIgnore>
            <LayerGroup>{MarkerList}</LayerGroup>
          </MarkerClusterGroup>
        </LayersControl.Overlay>
      </LayersControl>
    );
  } else return null;
}
