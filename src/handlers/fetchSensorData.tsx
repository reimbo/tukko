import { useState, useEffect } from 'react';
import { fetchSingleStation } from '../api/getSensors';

type SensorData = {
  id: number;
  name: string;
  unit: string;
  value: number;
};

export function useSensorData(stationID: string): SensorData[] {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensors = await fetchSingleStation(stationID);
        if (sensors !== undefined) {
          const { id, name, unit, value } = sensors;
          setSensorData([{ id, name, unit, value }]);
        }
      } catch (error) {
        console.error('Error fetching station data:', error);
      }
    };

    fetchData();
  }, [stationID]);

  return sensorData;
}
