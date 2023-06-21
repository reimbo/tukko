// The Sensor data model is defined here - use these to search or filter the data

export interface Sensor {
  id?: number,
  stationId?: number,
  name: string,
  shortName: string,
  timeWindowStart?: Date | string,
  timeWindowEnd?: Date | string,
  measuredTime: Date | string,
  unit: string,
  sensorValueDescriptionFi?: string,
  sensorValueDescriptionEn?: string,
  value: number
}

export interface Station {
  id?: number,
  tmsNumber: number,
  coordinates: number[],
  name: string,
  dataUpdatedTime?: Date | string,
  sensorValues: Sensor[]
}

export interface StationData {
  dataUpdatedTime: Date | string,
  stations: Station[]
}
