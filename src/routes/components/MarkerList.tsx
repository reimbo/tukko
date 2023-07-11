import { Station } from "../../interfaces/Interfaces";
import { useState, useEffect } from "react";
import { fetchData } from "../scripts/dataFetch";
import { MarkerContent } from "./MarkerContent";

export function MarkerList(): JSX.Element | null {
  const [data, setData] = useState<Station[] | null>(null);

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

  useEffect(() => {
    // Call loadStations initially
    loadStations();

    // Call loadStations every 60 seconds
    const intervalId = setInterval(() => {
      loadStations();
    }, 60 * 1000); // 60 seconds in milliseconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {data?.map((station) => (
        <MarkerContent key={station.id} station={station} />
      ))}
    </div>
  );
}
