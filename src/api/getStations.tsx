/**
 * This is the stations API module.
 * Usage: fetch all stations data from https://tie.digitraffic.fi/api/tms/v1/stations
 */
import axios from 'axios';

const stationList: number[] = [];
const stationLocation: { longitude: number, latitude: number, altitude: number }[] = [];
const stationName: string[] = [];

async function fetchStations() {
  try {
    const response = await axios.get('https://tie.digitraffic.fi/api/tms/v1/stations');
    const stationData = response.data.features.map((feature: any) => {
      const { id, geometry, properties } = feature;
      return { id, geometry, properties };
    });
    console.log(stationData[0]);
    for (const station of stationData) {
      stationList.push(station.id);
      const [longitude, latitude, altitude] = station.geometry.coordinates;
      stationLocation.push({ latitude, longitude , altitude });
      stationName.push(station.properties.name);
    }
  } catch (error) {
    console.error('Error fetching station data:', error);
  }

  return {stationLocation, stationName};
}


export { fetchStations };
