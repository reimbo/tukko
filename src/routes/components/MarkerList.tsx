import { Station, Sensor, Roadwork } from "../../interfaces/Interfaces";
import { useState, useEffect } from "react";
import redis from "../scripts/fetchRedis";
import { MarkerContent } from "./MarkerContent";

let stationLastUpdatedTimestamp = new Date(0);
let sensorLastUpdatedTimestamp = new Date(0);
const sensorIds = [5158, 5161];

export function MarkerList(): JSX.Element | null {
  const [stations, setStations] = useState<Station[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [roadworks, setRoadworks] = useState<Roadwork[]>([]);

  async function loadStations() {
    try {
      const fetchedUpdateTimestamp = new Date(
        await redis.fetchStationUpdateTimestamp()
      );
      if (fetchedUpdateTimestamp > stationLastUpdatedTimestamp) {
        stationLastUpdatedTimestamp = fetchedUpdateTimestamp;
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
      const fetchedUpdateTimestamp = new Date(
        await redis.fetchSensorUpdateTimestamp()
      );
      if (fetchedUpdateTimestamp > sensorLastUpdatedTimestamp) {
        sensorLastUpdatedTimestamp = fetchedUpdateTimestamp;
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
    return { ...station, sensors: stationSensors };
  });

  return (
    <div>
      {updatedStations?.map((station) => (
        <MarkerContent
          key={station.id}
          station={station}
          roadworks={roadworks}
        />
      ))}
    </div>
  );
}
