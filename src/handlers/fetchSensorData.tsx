import { useState, useEffect } from 'react';
import { fetchAllStations } from '../api/getSensors';

type SensorData = {
  id: number;
  name: string;
  unit: string;
  value: number;
};

export function useSensorData(): [SensorData[]] {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stationDataResponse = await fetchAllStations();
        if (stationDataResponse && stationDataResponse.length > 0) {
          setSensorData(stationDataResponse);
        }
      } catch (error) {
        console.error('Error fetching station data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return [sensorData];
}
