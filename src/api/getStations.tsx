/**
 * This is the stations API module.
 * Usage: fetch all stations data from https://tie.digitraffic.fi/api/tms/v1/stations
 */
import axios from 'axios';
import { useState, useEffect } from 'react';

const stationList: string[] = [];
const stationLocation: { longitude: number, latitude: number, altitude: number }[] = [];
const stationName: string[] = [];
let isLoading = true;

// type Station = {
//   latitude: number;
//   longitude: number;
//   altitude?: number;
// };

async function fetchStations() {
  try {
    const response = await axios.get('https://tie.digitraffic.fi/api/tms/v1/stations');
    const stationData = response.data.features.map((feature: any) => {
      const { id, geometry, properties } = feature;
      return { id, geometry, properties };
    });
    
    for (const station of stationData) {
      stationList.push(station.id.toString());
      const [longitude, latitude, altitude] = station.geometry.coordinates;
      stationLocation.push({ latitude, longitude , altitude });
      stationName.push(station.properties.name);
    }
    
    // return { stationLocation, stationName, stationList };
  } catch (error) {
    console.error('Error fetching station data:', error);
    throw error;
  }finally {
    isLoading = false;
  }
}

function useStationData() {
  // const [stationData, setStationData] = useState<Station[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [stationName, setStationName] = useState<string>('');
  // const [stationID, setStationID] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStations();
        // console.log(locations.length+"locations***\n")
        

      } catch (error) {
        console.error('Error fetching station data:', error);
      } finally {
        isLoading = false;
      }
    };

    fetchData();
  }, []);

  // return [stationLocation, isLoading, stationName,stationList];
}

export { stationLocation, isLoading, stationName,stationList,useStationData, fetchStations };
