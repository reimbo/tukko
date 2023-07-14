export interface Station {
  id: number;
  tmsNumber: number;
  dataUpdatedTime: Date;
  name: string;
  names: {
    fi: string;
    sv: string;
    en: string;
  };
  coordinates: {
    longitude: number;
    latitude: number;
  };
  roadNumber: number;
  roadSection: number;
  carriageway: string;
  side: string;
  municipality: string;
  municipalityCode: number;
  province: string;
  provinceCode: number;
  direction1Municipality: string;
  direction1MunicipalityCode: number;
  direction2Municipality: string;
  direction2MunicipalityCode: number;
  freeFlowSpeed1: number;
  freeFlowSpeed2: number;
  sensors?: Sensor[];
  roadworks?: Roadwork[];
}

export interface Sensor {
  id: number;
  stationId: number;
  name: string;
  shortName: string;
  timeWindowStart?: Date;
  timeWindowEnd?: Date;
  measuredTime: Date;
  unit: string;
  value: number;
}

export interface Roadwork {
  id: number;
  primaryPointRoadNumber: number;
  primaryPointRoadSection: number;
  secondaryPointRoadNumber: number;
  secondaryPointRoadSection: number;
  direction: string;
  startTime: Date;
  endTime: Date;
  severity: string;
  workingHours: {
    weekday: string;
    startTime: string;
    endTime: string;
  }[];
  workTypes: {
    type: string;
    description: string;
  }[];
  restrictions: {
    type: string;
    name: string;
    quantity?: string;
    unit?: string;
  }[];
}
