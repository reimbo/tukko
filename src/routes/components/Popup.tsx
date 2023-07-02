import { Popup } from "react-leaflet"
import { Station } from "../../interfaces/sensorInterfaces"
import { useTranslation } from "react-i18next";
import styles from "./css/mapLayers.module.css";
import ModalData from "./ModalData";

const sensors1 = new Set([
  "OHITUKSET_60MIN_KIINTEA_SUUNTA1",
  "KESKINOPEUS_60MIN_KIINTEA_SUUNTA1",
  "KESKINOPEUS_5MIN_KIINTEA_SUUNTA1_VVAPAAS1",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA1",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1_VVAPAAS1",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA1_MS1",
])

const sensors2 = new Set([
  "OHITUKSET_60MIN_KIINTEA_SUUNTA2",
  "KESKINOPEUS_60MIN_KIINTEA_SUUNTA2",
  "KESKINOPEUS_5MIN_KIINTEA_SUUNTA2_VVAPAAS2",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA2",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2",
  "KESKINOPEUS_5MIN_LIUKUVA_SUUNTA2_VVAPAAS2",
  "OHITUKSET_5MIN_LIUKUVA_SUUNTA2_MS2"
])

export default function DirectionPopup( {station, direction} :{station: Station, direction: number}): JSX.Element { 
  const { t } = useTranslation(['sensors', 'units'])
  return (
    <Popup offset={[0,0]} maxWidth={550} autoPanPadding={[100,100]} closeButton={false} className={styles.wrapper}>
      <h3>{station.name}</h3>
      <ul className={styles.list}>
      <ModalData />
      {station.sensorValues.map((sensor) => {
        // Digitraffic lists all its relative units as '***', I assume for compatibility?
        const unit = sensor.unit === "***" ? "%" : sensor.unit
        const sensors = direction === 1 ? sensors1 : sensors2
        if ( !(sensors.has(sensor.name)) ) return null
        return <li className={styles.li} key={sensor.name}>{sensor.value} {t(unit, {ns:"units"})} {t(sensor.name, {ns:"sensors"})}</li>
      })}
      </ul>
    </Popup>
)}
