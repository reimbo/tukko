import axios, { AxiosResponse } from 'axios';
import { Station } from '../../interfaces/Interfaces';

export default (stationId: number): Promise<Station | undefined> => {
  const url = window.API_URL + '/stations/' + stationId;

  return axios.get(url)
    .then((response: AxiosResponse<Station[]>) => response.data[0])
    .catch((error: any) => {
      console.error('Error fetching station:', error);
      return undefined;
    });
};
