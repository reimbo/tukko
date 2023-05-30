import { useState, useEffect } from 'react';
import { fetchStations } from '../api/getStations';

type Station = {
  latitude: number;
  longitude: number;
  altitude?: number;
};

export function useStationData(station:number): [Station[], boolean] {
  const [stationData, setStationData] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locations = await fetchStations();
        if (locations.length > 0) {
          const { latitude, longitude, altitude } = locations[station];
          setStationData([{ latitude, longitude, altitude }]);
        }
      } catch (error) {
        console.error('Error fetching station data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return [stationData, isLoading];
}
