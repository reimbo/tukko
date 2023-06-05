import axios from 'axios';
import stationData from '../routes/data/stationData.json';

// let isLoadingSensorData = false;
interface Station {
  station_id: string;
  station_name: string;
  station_location:{
    latitude: number;
    longitude: number;
  }
}

interface Sensor {
  id: number;
  name: string;
  unit: string;
  value: number;
}

async function fetchSingleStation(stationID: string) {
  try {
    const response = await axios.get(`https://tie.digitraffic.fi/api/tms/v1/stations/${stationID}/data`);
    const sensorData: Sensor[] = response.data.sensorValues.map((sensor: Sensor) => {
      const { id, name, unit, value } = sensor;
      return { id, name, unit, value };
    });
    return sensorData[0];
  } catch (error) {
    console.error('Error fetching station data:', error);
    return undefined;
  }
}

async function fetchAllStations() {
  try {
    const promises = stationData.map((station: Station) => fetchSingleStation(station.station_id));
    const sensorDataList = await Promise.all(promises);
    const filteredSensorDataList = sensorDataList.filter(sensorData => sensorData !== undefined) as Sensor[];
    return filteredSensorDataList;
  } catch (error) {
    console.error('Error fetching station data:', error);
    return [];
  }
}

export async function fetchSensors() {
  try {
    const cachedSensorData = localStorage.getItem('sensorData');

    // check if data exists in local storage before fetching
    if (cachedSensorData) {
      const sensorData = JSON.parse(cachedSensorData);
      
      console.log('Using cached sensor data');
    } else {
      const response = await fetchAllStations();
      
      if(response !== undefined) {


        const sensorData = response.map( sensors => sensors.map( sensor => {  
          const { id, name, unit, value, stationId } = sensor;
          return { id, name, unit, value, stationId};
          }));


        // Store the updated data in local storage
        // localStorage.setItem('sensorData', JSON.stringify(sensorData));
        console.log('Using fetched station data');
      }
      
    }
  } catch (error) {
    console.error('Error fetching station data:', error);
    throw error;
  } finally {
    // show loading status if failed to fetch data
    // isLoadingSensorData = false;
  }
}
