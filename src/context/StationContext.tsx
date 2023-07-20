import * as React from 'react';
import { Station } from '../interfaces/Interfaces';

export interface Context {
  station: Station | null;
  updateStation: (station: Station | null) => void;
}

type Props = {
  children: React.ReactNode
}

export const StationContext = React.createContext<Context | null>(null)

const Provider: React.FC<Props> = ({ children }: {children: React.ReactNode}): JSX.Element => {
  const [station, setStation] = React.useState<Station|null>(null)

  const updateStation = (station: Station | null) => setStation(station)

  return (
    <StationContext.Provider value={{station, updateStation}}>
      {children}
    </StationContext.Provider>
  )
}

export default Provider
