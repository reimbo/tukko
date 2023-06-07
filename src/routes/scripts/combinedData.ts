import stationData from '../data/stationData.json';
import sensorsData from '../data/sensorsData.json';
import { Sensor } from '../../interfaces/sensorInterfaces';

export interface CombinedData {
    stationLocation: { latitude: number; longitude: number }[];
    stationList: string[];
    stationName: string[];
    OHITUKSET_5MIN_LIUKUVA_SUUNTA1: Sensor[];
    KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1: Sensor[];
}

// The combined data is passed to the MapContainer as props
// CAUTION: These are prefetched station and sensor data - not real time data
export function getCombinedData(): CombinedData {
  return {
    stationLocation: stationData.map((station) => station.station_location),
    stationList: stationData.map((station) => station.station_id),
    stationName: stationData.map((station) => station.station_name),
    OHITUKSET_5MIN_LIUKUVA_SUUNTA1: sensorsData.flatMap((data: any) =>
      Array.isArray(data) ? data.filter((sensor: Sensor) =>
        ['OHITUKSET_5MIN_LIUKUVA_SUUNTA1', 'OHITUKSET_5MIN_LIUKUVA_SUUNTA2'].some(
          (name) => sensor.sensor_name === name
        )
      ) : []
    ),
    KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1: sensorsData.flatMap((data: any) =>
      Array.isArray(data) ? data.filter((sensor: Sensor) =>
        ['KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1', 'KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2'].some(
          (name) => sensor.sensor_name === name
        )
      ) : []
    )
  };
}
