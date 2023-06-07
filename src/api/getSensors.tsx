import axios from 'axios';
import stationData from '../routes/data/stationData.json';
import { Sensor, SensorAPI } from '../interfaces/sensorInterfaces';

// This is the API link to fetch sensor data
const sensorsAPI = 'https://tie.digitraffic.fi/api/tms/v1/stations/';

// Store the list of fetched sensors here
const sensorList: Sensor[][] = [];

// Fetch the sensor data for a single station
async function fetchSingleStation(stationID: string): Promise<Sensor[]> {
  try {
    const response = await axios.get(`${sensorsAPI}${stationID}/data`);
    const sensorData: Sensor[] = response.data.sensorValues.map((sensor: SensorAPI) => {
      const { id, name, unit, value, stationId } = sensor;
      return {
        sensor_id: id,
        sensor_name: name,
        sensor_unit: unit,
        sensor_value: value,
        sensor_stationId: stationId,
      };
    });

    return sensorData;
  } catch (error) {
    console.error('Error fetching station data:', error);
    return [];
  }
}

// Fetch the sensor data for a list of stations
async function fetchAllStations(): Promise<Sensor[][]> {
  try {
    const promises = stationData.map((station) => fetchSingleStation(station.station_id));
    const sensorDataList = await Promise.all(promises);
    const filteredSensorDataList = sensorDataList.filter((sensorData) => sensorData.length > 0);
    return filteredSensorDataList;
  } catch (error) {
    console.error('Error fetching station data:', error);
    return [];
  }
}

// Main method to fetch the sensors data - Will use the cached data if available
async function FetchSensors() {
  // localStorage.removeItem('sensorData');
  try {
    const cachedSensorData = localStorage.getItem('sensorData');

    // Check if data exists in local storage before fetching
    if (cachedSensorData) {
      const sensorData = JSON.parse(cachedSensorData) as Sensor[][];
      processSensorData(sensorData);
      console.log('Using cached sensor data');
    } else {
      const response = await fetchAllStations();
      console.log(JSON.stringify(response[0][0].sensor_name))
      if (response.length > 0) {
        const sensorData = response;
        processSensorData(sensorData);
        // Store the updated data in local storage
        localStorage.setItem('sensorData', JSON.stringify(sensorData));
        console.log('Using fetched sensor data');
      }
    }
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    throw error;
  } 
}

// Process the sensor data and store it in the predefined arrays - which will be accessed in Root
function processSensorData(sensorData: Sensor[][]) {
  sensorList.push(...sensorData);
}

export { sensorList, FetchSensors };
