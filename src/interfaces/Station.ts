export default interface StationStatic {
  id: number;
  dataUpdatedTime: string;
  coordinates: {
    type: string;
    coordinates: number[];
  };
  province: string;
  municipality: string;
  direction1_municipality: string;
  direction2_municipality: string;
  names_fi: string;
  names_sv: string;
  names_en: string;
  roadNumber: number;
  roadSection: number;
  freeFlowSpeed1: number | null;
  freeFlowSpeed2: number | null;
}
