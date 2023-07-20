import L from "leaflet";
import getTrafficColor from "../scripts/colourSpectrum";
import { Station } from "../../interfaces/Interfaces";

const createIcon = (html: string) => {
  return L.divIcon({
    html: html,
    className: "customMarker",
    iconSize: [24, 40],
    iconAnchor: [20, 40],
  });
};

const rwIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1.15em" viewBox="0 0 640 512" style="position:absolute;bottom:-1px;left:-11px">
        <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path 
          style="
            fill: yellow; 
            stroke:#000000; 
            opacity: 1; 
            stroke-width: 6mm; 
            stroke-opacity: 1;
          " 
        d="M213.2 32H288V96c0 17.7 14.3 32 32 32s32-14.3 32-32V32h74.8c27.1 0 51.3 17.1 60.3 42.6l42.7 120.6c-10.9-2.1-22.2-3.2-33.8-3.2c-59.5 0-112.1 29.6-144 74.8V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7 14.3 32 32 32c2.3 0 4.6-.3 6.8-.7c-4.5 15.5-6.8 31.8-6.8 48.7c0 5.4 .2 10.7 .7 16l-.7 0c-17.7 0-32 14.3-32 32v64H86.6C56.5 480 32 455.5 32 425.4c0-6.2 1.1-12.4 3.1-18.2L152.9 74.6C162 49.1 186.1 32 213.2 32zM496 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 240a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0-192c-8.8 0-16 7.2-16 16v80c0 8.8 7.2 16 16 16s16-7.2 16-16V288c0-8.8-7.2-16-16-16z"/>
        </svg>
`;

export function getSwgImage(station: Station) {
  try {
    let colorDirection1 = "gray";
    let colorDirection2 = "gray";
    const findSensorValue = (sensorId: number): number | undefined => {
      return station.sensors?.find((sensor) => sensor.id === sensorId)?.value;
    };
    const sensorValue5158 = findSensorValue(5158);
    if (sensorValue5158 !== undefined) {
      colorDirection1 = getTrafficColor(sensorValue5158);
    }

    const sensorValue5161 = findSensorValue(5161);
    if (sensorValue5161 !== undefined) {
      colorDirection2 = getTrafficColor(sensorValue5161);
    }

    let baseIcon = `
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
            </svg>
        `;
    if (station.roadworks && station.roadworks.length !== 0) baseIcon += rwIcon;
    return createIcon(baseIcon);
  } catch (error: any) {
    console.log(error.message);
  }
}
