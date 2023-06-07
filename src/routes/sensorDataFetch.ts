import { useEffect, useState } from "react";
import { FetchSensors } from '../api/getSensors';

// Fetch sensors data from the API
export function useSensorDataFetch() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await FetchSensors();
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return isLoading;
}
