/**
 * This is a sample API to test if the API is working.
 * Just run node sampleAPI.js in the terminal to see the results.
 */
import axios from 'axios';
const stationList = [];
const stationLocation = [];
const stationName = [];
async function fetchStations() {
    try {
        const response = await axios.get('https://tie.digitraffic.fi/api/tms/v1/stations');
        const stationData = response.data.features.map((feature) => {
            const { id, geometry, properties } = feature;
            return { id, geometry, properties };
        });
        console.log(stationData[0]);
        for (const station of stationData) {
            stationList.push(station.id);
            const [longitude, latitude, altitude] = station.geometry.coordinates;
            stationLocation.push({ latitude, longitude, altitude });
            stationName.push(station.properties.name);
        }
        console.log("Station IDs 1-3: \n" + stationList[0] + ", " + stationList[1] + ", " + stationList[2]);
        console.log("Station locations 1-3: ");
        console.log(formatCoordinates(stationLocation[0]));
        console.log(formatCoordinates(stationLocation[1]));
        console.log(formatCoordinates(stationLocation[2]));
        console.log("Station names 1-3: \n" + stationName[0] + ", " + stationName[1] + ", " + stationName[2]);
    }
    catch (error) {
        console.error('Error fetching station data:', error);
    }
}
function formatCoordinates(coordinates) {
    const { latitude, longitude } = coordinates;
    return `Latitude: ${latitude.toFixed(6)}, Longitude ${longitude.toFixed(6)}`;
}
fetchStations();
export { stationList, stationLocation, stationName };