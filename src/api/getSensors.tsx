import axios from 'axios';
import stationData from '../routes/data/stationData.json';

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

export async function fetchAllStations() {
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
