import axios, { AxiosResponse } from "axios";
// import test from '../../data/combined.json';

// StationData interface has been changed dramatically so using type any temporary for now
export const fetchStation = async (stationId: string): Promise<any[]> => {
  const baseUrl = window.API_URL + `/tms/station/` + stationId;
  const response: AxiosResponse<any[]> = await axios.get(baseUrl);
  const data: any[] = response.data;
  return data;
};
