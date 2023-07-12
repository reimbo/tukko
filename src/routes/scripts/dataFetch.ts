import axios, { AxiosResponse } from "axios";
import { Station } from '../../interfaces/Interfaces.ts';
// import test from '../../data/combined.json';

export const fetchData = async (): Promise<Station[]> => {
  try {
  const url = window.API_URL + '/stations';
  const response: AxiosResponse = await axios.get(url);

  // const fetchedData: StationData = test
  // const data: Station[] = Array.from(Object.values(fetchedData.stations))

  const stations: Station[] = response.data;
  return stations;
  } catch (error: any){
    console.error('Error fetching stations:', error.message);
    return [];
  }
}

// StationData interface has been changed dramatically so using type any temporary for now
export const fetchStation = async (stationId: string): Promise<any[]> => {
  const baseUrl = "http://localhost:3001/tms/station/" + stationId;
  const response: AxiosResponse<any[]> = await axios.get(baseUrl);
  const data: any[] = response.data;
  return data;
};