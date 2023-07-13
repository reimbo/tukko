import { Station, Roadwork } from "../../interfaces/Interfaces";
import { useState, useEffect } from "react";
import { fetchData, fetchRoadworks } from "../scripts/dataFetch";
import { MarkerContent } from "./MarkerContent";

export function MarkerList(): JSX.Element | null {
  const [data, setData] = useState<Station[] | null>(null);
  const [roadworks, setRoadworks] = useState<Roadwork[]>([]);

  async function loadStations() {
    try {
      const stations: Station[] = await fetchData();
      if (stations) {
        setData(stations);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function loadRoadworks() {
    try {
      const roadworks: Roadwork[] = await fetchRoadworks();
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
    setTimeout(() => {
      loadRoadworks();
    }, 1500); // Delay by 1.5s in order to render markers faster on first load

    // Call fetch every 60 seconds
    const intervalId = setInterval(() => {
      loadStations();
      loadRoadworks();
    }, 60 * 1000); // 60 seconds in milliseconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {data?.map((station) => (
        <MarkerContent
          key={station.id}
          station={station}
          roadworks={roadworks}
        />
      ))}
    </div>
  );
}
