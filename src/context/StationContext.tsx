import * as React from 'react';
import { Station } from '../interfaces/Interfaces';
import { Marker } from 'leaflet';

export interface Context {
  station: Station | null ;
  updateStation: (station: Station | null ) => void;
  marker: Marker | null;
  updateMarker: (marker: Marker | null) => void;
  stationError: boolean | null;
  updateError: (err: boolean | null) => void;
}

type Props = {
  children: React.ReactNode
}

export const StationContext = React.createContext<Context | null>(null)

const Provider: React.FC<Props> = ({ children }: {children: React.ReactNode}): JSX.Element => {
  const [station, setStation] = React.useState<Station|null>(null)
  const [marker, setMarker] = React.useState<Marker|null>(null)
  const [stationError, setError] = React.useState<boolean|null>(null)

  const updateStation = (station: Station | null ) => setStation(station)
  const updateMarker = (marker: Marker | null) => setMarker(marker)
  const updateError = (err: boolean | null) => setError(err)

  return (
    <StationContext.Provider value={{station, updateStation, marker, updateMarker, stationError, updateError}}>
      {children}
    </StationContext.Provider>
  )
}

export default Provider
