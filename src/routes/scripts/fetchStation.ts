import axios, { AxiosResponse } from 'axios';
import StationStatic from '../../interfaces/Station';

export default (stationId: number): Promise<StationStatic | undefined> => {
  const url = window.API_URL + '/stations/' + stationId + '?includeSensors=true';

  return axios.get(url)
    .then((response: AxiosResponse<StationStatic[]>) => response.data[0])
    .catch((error: any) => {
      console.error('Error fetching station:', error);
      return undefined;
    });
};
