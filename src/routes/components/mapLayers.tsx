import { LayersControl, Marker, LayerGroup, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createMarker } from "./Icons";
import { Station } from "../../interfaces/sensorInterfaces";
import styles from "./css/mapLayers.module.css"

export function MapLayers({ data }: { data: Station[] | null }): JSX.Element {
  const MarkerList = data?.map(
    (station) => {
      if (station.sensorValues.length > 0) return (
        <Marker
          key={station.id}
          position={[
            station.coordinates[0],
            station.coordinates[1]
          ]}
          icon={createMarker('red')}
          >
          <Popup offset={[0,0]} maxWidth={500} autoPanPadding={[100,100]} closeButton={false} className={styles.wrapper}>
            <ul className={styles.list}>
            <li>Station name: {station.name}</li>
            <li>Station id: {station.id}</li>
            {station.sensorValues.map((sensor) => {
              const unit = sensor.unit === "***" ? "%" : sensor.unit
              return <li key={sensor.name}>{sensor.name}: {sensor.value} {unit}</li>
            })}
            </ul>
          </Popup>
          </Marker>
      )
    }
  )

  return (
    <LayersControl position="topright" collapsed={false}>
      <LayersControl.Overlay name="Show station data" checked>
        <MarkerClusterGroup>
          <LayerGroup>
            {MarkerList}
          </LayerGroup>
        </MarkerClusterGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
}
