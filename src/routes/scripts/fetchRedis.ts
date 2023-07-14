import axios, { AxiosResponse } from "axios";

async function fetchStationUpdateTimestamp() {
  try {
    const url = window.API_URL + "/stations";
    const response: AxiosResponse = await axios.get(url, {
      params: { lastUpdated: "true" },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error fetching station update timpestamp:", error.message);
    return [];
  }
}

async function fetchStations() {
  try {
    const url = window.API_URL + "/stations";
    const response: AxiosResponse = await axios.get(url, {
      params: { collectionStatus: "GATHERING" },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error fetching stations:", error.message);
    return [];
  }
}

async function fetchStationById(stationId: number) {
  try {
    const url = window.API_URL + "/stations/" + stationId;
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.log("Error fetching a station:", error.message);
    return [];
  }
}

async function fetchSensorUpdateTimestamp() {
  try {
    const url = window.API_URL + "/sensors";
    const response: AxiosResponse = await axios.get(url, {
      params: { lastUpdated: "true" },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error fetching sensor update timpestamp:", error.message);
    return [];
  }
}

async function fetchSensorsByIds(sensorIds: number[]) {
  try {
    const url = window.API_URL + "/sensors";
    const response: AxiosResponse = await axios.get(url, {
      params: { id: sensorIds },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error fetching sensors:", error.message);
    return [];
  }
}

async function fetchSensorsByStationId(stationId: number) {
  try {
    const url = window.API_URL + "/sensors";
    const response: AxiosResponse = await axios.get(url, {
      params: { stationId: stationId },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error fetching sensors:", error.message);
    return [];
  }
}

async function fetchRoadworks() {
  try {
    const url = window.API_URL + "/roadworks";
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching roadworks:", error.message);
    return [];
  }
}

export default {
  fetchStationUpdateTimestamp,
  fetchStations,
  fetchStationById,
  fetchSensorUpdateTimestamp,
  fetchSensorsByIds,
  fetchSensorsByStationId,
  fetchRoadworks,
};
