import * as React from 'react';

export interface Context {
  station: string;
  updateStation: (id: string) => void;
}

type Props = {
  children: React.ReactNode
}

export const StationContext = React.createContext<Context | null>(null)

const Provider: React.FC<Props> = ({ children }: {children: React.ReactNode}): JSX.Element => {
  const [station, setStation] = React.useState<string>('0')

  const updateStation = (id: string) => setStation(id)

  return (
    <StationContext.Provider value={{station, updateStation}}>
      {children}
    </StationContext.Provider>
  )
}

export default Provider
