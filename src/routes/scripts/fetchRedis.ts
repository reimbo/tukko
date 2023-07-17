import axios, { AxiosResponse } from "axios";
import { Roadwork, Sensor, Station } from "../../interfaces/Interfaces";

async function fetchStationLastUpdated(): Promise<Date | null> {
  try {
    const url = window.API_URL + "/stations";
    const response: AxiosResponse = await axios.get(url, {
      decompress: true,
      params: { lastUpdated: "true" },
    });
    const data: Date = new Date(response.data)
    return data;
  } catch (error) {
    console.error("Error fetching station update timestamp:", (error as Error).message);
    return null;
  }
}

async function fetchStations(): Promise<Station[] | []> {
  try {
    const url = window.API_URL + "/stations";
    const response: AxiosResponse = await axios.get(url, {
      decompress: true
    });
    const data: Station[] = response.data
    return data;
  } catch (error) {
    console.error("Error fetching stations:", (error as Error).message);
    return [];
  }
}

async function fetchStationById(stationId: number): Promise<Station | []> {
  try {
    const url = window.API_URL + "/stations/" + stationId;
    const response: AxiosResponse = await axios.get(url, {
      decompress: true
    });
    const data: Station = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching a station:", (error as Error).message);
    return [];
  }
}

async function fetchSensorLastUpdated(): Promise<Date | null> {
  try {
    const url = window.API_URL + "/sensors";
    const response: AxiosResponse = await axios.get(url, {
      decompress: true,
      params: { lastUpdated: "true" },
    });
    const data: Date = new Date(response.data)
    return data;
  } catch (error) {
    console.error("Error fetching sensor update timestamp:", (error as Error).message);
    return null;
  }
}

async function fetchSensorsByIds(sensorIds: number[]) {
  try {
    const url = window.API_URL + "/sensors";
    const response: AxiosResponse = await axios.get(url, {
      decompress: true,
      params: { id: sensorIds },
    });
    const data: Sensor[] = response.data
    return data;
  } catch (error) {
    console.error("Error fetching sensors:", (error as Error).message);
    return [];
  }
}

async function fetchSensorsByStationId(stationId: number) {
  try {
    const url = window.API_URL + "/sensors";
    const response: AxiosResponse = await axios.get(url, {
      decompress: true,
      params: { stationId: stationId },
    });
    const data: Sensor[] = response.data
    return data;
  } catch (error) {
    console.error("Error fetching sensors:", (error as Error).message);
    return [];
  }
}

async function fetchRoadworks() {
  try {
    const url = window.API_URL + "/roadworks";
    const response: AxiosResponse = await axios.get(url, {
      decompress: true
    });
    const data: Roadwork[] = response.data
    return data;
  } catch (error) {
    console.error("Error fetching roadworks:", (error as Error).message);
    return [];
  }
}

export default {
  fetchStationLastUpdated,
  fetchStations,
  fetchStationById,
  fetchSensorLastUpdated,
  fetchSensorsByIds,
  fetchSensorsByStationId,
  fetchRoadworks,
};
