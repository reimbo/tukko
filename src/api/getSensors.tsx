import axios from 'axios';
import stationData from '../routes/data/stationData.json';


//Storing sensor data in this format
interface Sensor {
  sensor_id: string;
  sensor_name: string;
  sensor_unit: string;
  sensor_value: string;
  sensor_stationId: string;
}

// this is the api link to fetch sensor data
const sensorsAPI = 'https://tie.digitraffic.fi/api/tms/v1/stations/';

// store the list of fetched sensor here
const sensorList: Sensor[] = [];

async function fetchSingleStation(stationID: string) {
  try {
    const response = await axios.get(`${sensorsAPI}${stationID}/data`);
    const sensorData = response.data.sensorValues.map((sensor: Sensor) => {
      const { sensor_id, sensor_name, sensor_unit, sensor_value, sensor_stationId } = sensor;
      return { sensor_id, sensor_name, sensor_unit, sensor_value, sensor_stationId };
    });
    return sensorData;
  } catch (error) {
    console.error('Error fetching station data:', error);
    return undefined;
  }
}

async function fetchAllStations() {
  try {
    const promises = stationData.map((station) => fetchSingleStation(station.station_id));
    const sensorDataList = await Promise.all(promises);
    const filteredSensorDataList = sensorDataList.filter((sensorData) => sensorData !== undefined);
    return filteredSensorDataList;
  } catch (error) {
    console.error('Error fetching station data:', error);
    return [];
  }
}

async function FetchSensors() {
  try {
    const cachedSensorData = localStorage.getItem('sensorData');

    // check if data exists in local storage before fetching
    if (cachedSensorData) {
      const sensorData = JSON.parse(cachedSensorData) as Sensor[];
      processSensorData(sensorData);
      console.log('Using cached sensor data');
    } else {
      const response = await fetchAllStations();

      if (response !== undefined) {
        const sensorData = response.flatMap((sensors: Sensor[]) =>
          sensors.map((sensor: Sensor) => {
            const {  sensor_id, sensor_name, sensor_unit, sensor_value, sensor_stationId } = sensor;
            return {  sensor_id, sensor_name, sensor_unit, sensor_value, sensor_stationId};
          })
        );

        // Store the updated data in local storage
        localStorage.setItem('sensorData', JSON.stringify(sensorData));
        console.log('Using fetched station data');
      }
    }
  } catch (error) {
    console.error('Error fetching station data:', error);
    throw error;
  } 
}


function processSensorData(sensorData: Sensor[]) {
  const processedData: (Sensor | Sensor[])[] = sensorData.map((sensor: Sensor | Sensor[]) => {
    if (Array.isArray(sensor) && sensor.length > 0) {
      return sensor.map((s) => ({
        sensor_id: s.sensor_id,
        sensor_name: s.sensor_name,
        sensor_unit: s.sensor_unit,
        sensor_value: s.sensor_value,
        sensor_stationId: s.sensor_stationId,
      }));
    } else {
      const s = sensor as Sensor;
      return {
        sensor_id: s.sensor_id,
        sensor_name: s.sensor_name,
        sensor_unit: s.sensor_unit,
        sensor_value: s.sensor_value,
        sensor_stationId: s.sensor_stationId,
      };
    }
  });

  sensorList.push(...processedData.flat(2));
}


export { sensorList, FetchSensors };
