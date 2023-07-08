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
        loadStations();
    }, []);

    return (
        <div>
            {data?.map((station) => (<MarkerContent key={station.id} station={station} />))}
        </div>
    );
}