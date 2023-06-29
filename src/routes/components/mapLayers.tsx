import { LayersControl, Marker, LayerGroup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';

// Components
import StationTooltip from "./Tooltip";
import { createMarker } from "./Icons";
import { Station } from "../../interfaces/sensorInterfaces";
import { useTranslation } from "react-i18next";
import styles from "./css/mapLayers.module.css";

const sensors = new Set([
  "OHITUKSET_60MIN_KIINTEA_SUUNTA1",
  "OHITUKSET_60MIN_KIINTEA_SUUNTA2",
  "KESKINOPEUS_60MIN_KIINTEA_SUUNTA1",
  "KESKINOPEUS_60MIN_KIINTEA_SUUNTA2",
  "KESKINOPEUS_5MIN_KIINTEA_SUUNTA1_VVAPAAS1",
  "KESKINOPEUS_5MIN_KIINTEA_SUUNTA2_VVAPAAS2",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA1",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA2",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2_VVAPAAS2",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA1_MS1",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA2_MS2"
])

export function MapLayers({ data }: { data: Station[] | null }): JSX.Element {
  const { t } = useTranslation(['sensors', 'units'])
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
            <ul className={styles.list}>
            {station.sensorValues.map((sensor) => {
              // Digitraffic lists all its relative units as '***', I assume for compatibility?
              const unit = sensor.unit === "***" ? "%" : sensor.unit
              if ( !(sensors.has(sensor.name)) ) return null
              return <li className={styles.li} key={sensor.name}>{sensor.value} {t(unit, {ns:"units"})} {t(sensor.name, {ns:"sensors"})}</li>
            })}
            </ul>
          </Popup>
          <StationTooltip station={station} />
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
