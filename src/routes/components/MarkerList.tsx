import { Station, Sensor, Roadwork } from "../../interfaces/Interfaces";
import { useState, useEffect } from "react";
import redis from "../scripts/fetchRedis";
import { MarkerContent } from "./MarkerContent";
import { getStationRoadworks } from "../scripts/getStationRoadworks";

let stationLastUpdated: Date = new Date(0);
let sensorLastUpdated: Date = new Date(0);
const sensorIds: number[] = [5158, 5161];

export function MarkerList(): JSX.Element | null {
  const [stations, setStations] = useState<Station[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [roadworks, setRoadworks] = useState<Roadwork[]>([]);

  async function loadStations() {
    try {
      const lastUpdated = await redis.fetchStationLastUpdated();

      if (lastUpdated && lastUpdated > stationLastUpdated) {
        stationLastUpdated = lastUpdated;
        const stations: Station[] = await redis.fetchStations();
        if (stations) {
          setStations(stations);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function loadSensors() {
    try {
      const lastUpdated = await redis.fetchSensorLastUpdated();
      if (lastUpdated && lastUpdated > sensorLastUpdated) {
        sensorLastUpdated = lastUpdated;
        const sensors: Sensor[] = await redis.fetchSensorsByIds(sensorIds);
        if (sensors) {
          setSensors(sensors);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function loadRoadworks() {
    try {
      const roadworks: Roadwork[] = await redis.fetchRoadworks();
      if (roadworks) {
        setRoadworks(roadworks);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // Call fetch initially
    loadStations();
    loadSensors();
    loadRoadworks();

    // Call fetch every 60 seconds
    const intervalId = setInterval(() => {
      loadStations();
      loadSensors();
      loadRoadworks();
    }, 60 * 1000); // 60 seconds in milliseconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const updatedStations = stations?.map((station) => {
    const stationSensors = sensors?.filter((s) => s.stationId === station.id);

    const stationRoadworks = getStationRoadworks(station, roadworks);
    return { ...station, sensors: stationSensors, roadworks: stationRoadworks };
  });

  return (
    <div>
      {updatedStations?.map((station) => (
        <MarkerContent key={station.id} station={station} />
      ))}
    </div>
  );
}
