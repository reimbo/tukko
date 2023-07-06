export default interface StationTooltip {
  id: number;
  tmsNumber: number;
  name: string;
  dataUpdatedTime: string;
  names: {
    fi: string;
    sv: string;
    en: string;
  }
  coordinates: {
    coordinates: {
      longitude: number;
      latitude: number;
    };
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
  sensors: TooltipSensors[]
  freeFlowSpeed1: number;
  freeFlowSpeed2: number;
}

interface TooltipSensors {
  id: number;
  stationId: number;
  name: string;
  timeWindowStart: string;
  timeWindowEnd: string;
  measuredTime: string;
  unit: string;
  value: number
}
