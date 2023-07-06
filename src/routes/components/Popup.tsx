import { Popup } from "react-leaflet"
import StationTooltip from "../../interfaces/Station";
import { useTranslation } from "react-i18next";
import styles from "./css/mapLayers.module.css";

const sensors1 = new Set([
  "OHITUKSET_60MIN_KIINTEA_SUUNTA1",
  "KESKINOPEUS_60MIN_KIINTEA_SUUNTA1",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA1",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA1_MS1",
])

const sensors2 = new Set([
  "OHITUKSET_60MIN_KIINTEA_SUUNTA2",
  "KESKINOPEUS_60MIN_KIINTEA_SUUNTA2",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA2",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2_VVAPAAS2",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA2_MS2"
])

export default function DirectionPopup( {station, direction} :{station: StationTooltip, direction: number}): JSX.Element { 
  const { t, i18n } = useTranslation(['sensors', 'units'])
  return (
    <Popup offset={[0,0]} maxWidth={550} autoPanPadding={[100,100]} closeButton={false} className={styles.wrapper}>
      <h3>{station.names[(i18n.language as keyof StationTooltip['names'])]}</h3>
      <ul className={styles.list}>
      {station.sensors.map((sensor) => {
        // Digitraffic lists all its relative units as '***', I assume for compatibility?
        const unit = sensor.unit === "***" ? "%" : sensor.unit
        const sensors = direction === 1 ? sensors1 : sensors2
        if ( !(sensors.has(sensor.name)) ) return null
        return <li className={styles.li} key={sensor.name}>{sensor.value} {t(unit, {ns:"units"})} {t(sensor.name, {ns:"sensors"})}</li>
      })}
      </ul>
    </Popup>
)}
