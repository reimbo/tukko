import L from "leaflet";
import getTrafficColor from "../scripts/colourSpectrum";
import { Station } from "../../interfaces/Interfaces";

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

        return L.divIcon({
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
      
    } catch (error: any) {
        console.log(error.message);
    }
}