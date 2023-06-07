// The Sensor data model is defined here - use these to search or filter the data

export interface Sensor {
    sensor_id: string;
    sensor_name: string;
    sensor_unit: string;
    sensor_value: string;
    sensor_stationId: string;
    sensor_traffic_value?: string;
  }

// Sensor data from the API
export interface SensorAPI {
    id: string;
    name: string;
    unit: string;
    value: string;
    stationId: string;
  }