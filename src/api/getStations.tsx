import axios from 'axios';
import { useEffect } from 'react';

const stationList: string[] = [];
const stationLocation: { longitude: number, latitude: number, altitude: number }[] = [];
const stationName: string[] = [];
let isLoading = true;

async function fetchStations() {
  try {
    const response = await axios.get('https://tie.digitraffic.fi/api/tms/v1/stations');
    const stationData = response.data.features.map((feature: any) => {
      const { id, geometry, properties } = feature;
      return { id, geometry, properties };
    });

    // Extract the required data from stationData
    for (const station of stationData) {
      stationList.push(station.id.toString());
      const [longitude, latitude, altitude] = station.geometry.coordinates;
      stationLocation.push({ latitude, longitude, altitude });
      stationName.push(station.properties.name);
    }

    // Store the updated data in local storage
    // localStorage.setItem('stationData', JSON.stringify(stationData));

  } catch (error) {
    console.error('Error fetching station data:', error);
    throw error;
  } finally {
    isLoading = false;
  }
}

function useStationData() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchStations();
      } catch (error) {
        console.error('Error fetching station data:', error);
      } finally {
        isLoading = false;
      }
    };

    fetchData();
  }, []);
}

export { stationLocation, isLoading, stationName, stationList, useStationData, fetchStations };
