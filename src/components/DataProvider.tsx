import { createContext, useState, useEffect } from 'react';
import StationStatic from '../interfaces/Station';
import staticDataJson from '../data/station_data.json'
import { StationData, Station } from '../interfaces/sensorInterfaces';
import stationDataJson from '../data/combined.json'

interface DataContextValue {
  staticData: StationStatic[] | null;
  backendData: Station[] | null;
}

export const DataContext = createContext<DataContextValue | null>(null);

export const DataProvider = ({ children }: { children: JSX.Element }) => {
  const [staticData, setStaticData] = useState<StationStatic[] | null>(null);
  const [backendData, setBackendData] = useState<Station[] | null>(null);

  useEffect(() => {
    // Static data
    const fetchJsonData = async (): Promise<void> => {
      try {
        const response = staticDataJson;
        const data: StationStatic[] = response;
        setStaticData(data);
      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    };

    // Sensor fetch
    const fetchBackendData = async (): Promise<void> => {
      try {
        const response: StationData = stationDataJson;
        const data: Station[] = Array.from(Object.values(response.stations))
        setBackendData(data);
      } catch (error) {
        console.error('Error loading backend data:', error);
      }
    };

    Promise.all([fetchJsonData(), fetchBackendData()]);
  }, []);

  const contextValue: DataContextValue = {
    staticData,
    backendData
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
