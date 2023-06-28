import { LayersControl, Marker, LayerGroup, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createMarker } from "./Icons";
import { Station } from "../../interfaces/sensorInterfaces";
import styles from "./css/mapLayers.module.css"
import { useTranslation } from "react-i18next";


export function MapLayers({ data }: { data: Station[] | null }): JSX.Element {
  const { t } = useTranslation('sensors')
  const MarkerList = data?.map(
    (station) => {
      if (station.sensorValues.length > 0) return (
        <Marker
          pmIgnore
          key={station.id}
          position={[
            station.coordinates[0],
            station.coordinates[1]
          ]}
          icon={createMarker('red')}
          >
          <Popup offset={[0,0]} maxWidth={550} autoPanPadding={[100,100]} closeButton={false} className={styles.wrapper}>
            <h3>{station.name}</h3>
            <small>{station.id}</small>
            <ul className={styles.list}>
            {station.sensorValues.map((sensor) => {
              // Digitraffic lists all its relative units as '***', I assume for compatibility?
              const unit = sensor.unit === "***" ? "%" : sensor.unit
              return <li key={sensor.name}>{t(sensor.name)}: {sensor.value} {unit}</li>
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
        <MarkerClusterGroup pmIgnore>
          <LayerGroup>
            {MarkerList}
          </LayerGroup>
        </MarkerClusterGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
}
