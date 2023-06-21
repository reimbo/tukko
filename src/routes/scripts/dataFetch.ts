// import axios, { AxiosResponse } from "axios";
import test from '../data/combined.json';
import { Station, StationData } from '../../interfaces/sensorInterfaces.ts'

export const fetchData = async (): Promise<Station[]> => {
  // const baseUrl: string = import.meta.env.VITE_BACKEND_BASE_URL;
  // const fetchedData: AxiosResponse<StationData> = await axios.get(`${baseUrl}/tms/stations/data`);
  const fetchedData: StationData = test

  const data: Station[] = Array.from(Object.values(fetchedData.stations))
  return data;
};
