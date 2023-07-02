import { LayersControl, Marker, LayerGroup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Station } from "../../interfaces/sensorInterfaces";

// Components
import StationTooltip from "./Tooltip";
import { createMarker } from "./Icons";


export function MapLayers({ data }: { data: Station[] | null }): JSX.Element | null {
  const MarkerList = data?.map(
    (station) => {
      if (station.sensorValues.length > 0) return (
        <Marker
          pmIgnore
          key={station.id}
          alt={station.name.replaceAll("_", " ")}
          position={[
            station.coordinates[0],
            station.coordinates[1]
          ]}
          icon={createMarker('red')}
          >
          <StationTooltip station={station} />
          </Marker>
      )
    }
  )

  if (data && data.length > 0) {
    return (
      <LayersControl position="topright" collapsed={false}>
        <LayersControl.Overlay name="Show station data" checked>
          <MarkerClusterGroup pmIgnore>
            <LayerGroup>
              {MarkerList}
            </LayerGroup>
          </MarkerClusterGroup>
        </LayersControl.Overlay>
      </LayersControl>
    );
  }
  else return null
}
