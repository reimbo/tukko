/**
 * Custom handler to display the station location on the map.
 * Using the station location from the getStations API module.
 */
import { useState, useEffect } from 'react';
import { fetchStations } from '../api/getStations';

type Station = {
  latitude: number;
  longitude: number;
  altitude?: number;
};

export function useStationData(station:number): [Station[], boolean, string, string] {
  const [stationData, setStationData] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stationName, setStationName] = useState<string>('');
  const [stationID, setStationID] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locations = (await fetchStations()).stationLocation;
        if (locations.length > 0) {
          const { latitude, longitude, altitude } = locations[station];
          setStationData([{ latitude, longitude, altitude }]);
        }
        
        const names = (await fetchStations()).stationName;
        if (names.length > 0) {
          const stationName = names[station];
          setStationName(stationName);
        }
        const list = (await fetchStations()).stationList;
        if (list.length > 0) {
          const stationID = list[station];
          setStationID(stationID);
        }

      } catch (error) {
        console.error('Error fetching station data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return [stationData, isLoading, stationName,stationID];
}
