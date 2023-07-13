import axios, { AxiosResponse } from "axios";
import { Station, Roadwork } from "../../interfaces/Interfaces.ts";
// import test from '../../data/combined.json';

export const fetchData = async (): Promise<Station[]> => {
  try {
    const url = window.API_URL + "/stations";
    const response: AxiosResponse = await axios.get(url, {
      params: { collectionStatus: "GATHERING" },
    });

    // const fetchedData: StationData = test
    // const data: Station[] = Array.from(Object.values(fetchedData.stations))

    const stations: Station[] = response.data;
    return stations;
  } catch (error: any) {
    console.error("Error fetching stations:", error.message);
    return [];
  }
};

// StationData interface has been changed dramatically so using type any temporary for now
export const fetchStation = async (stationId: string): Promise<any[]> => {
  const baseUrl = `${window.API_URL}/tms/station/` + stationId;
  const response: AxiosResponse<any[]> = await axios.get(baseUrl);
  const data: any[] = response.data;
  return data;
};

export const fetchRoadworks = async (): Promise<Roadwork[]> => {
  try {
    const url = window.API_URL + "/roadworks";
    const response: AxiosResponse = await axios.get(url);
    const roadworks: Roadwork[] = response.data;
    return roadworks;
  } catch (error: any) {
    console.error("Error fetching roadworks:", error.message);
    return [];
  }
};
