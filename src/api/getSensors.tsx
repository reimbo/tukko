import axios from 'axios';

interface Sensor {
  id: number;
  name: string;
  unit: string;
  value: number;
}

export async function fetchSingleStation(stationID: string) {
  try {
    const response = await axios.get(`https://tie.digitraffic.fi/api/tms/v1/stations/${stationID}/data`);
    const sensorData: Sensor[] = response.data.sensorValues.map((sensor: Sensor) => {
      const { id, name, unit, value } = sensor;
      return { id, name, unit, value };
    });
    return sensorData[0];
  } catch (error) {
    console.error('Error fetching station data:', error);
  }
}
