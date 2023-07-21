import { useContext } from 'react'
import { StationContext, Context } from '../../context/StationContext';
import { Popup } from "react-leaflet"
import { Station } from "../../interfaces/Interfaces";
import { useTranslation } from "react-i18next";
import styles from "./css/mapLayers.module.css";
import Close from "./Close";
import Back from "./Back"
import { Marker } from "leaflet";

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

export default function DirectionPopup({ station, direction, marker }: { station: Station, direction: number | null, marker: Marker }): JSX.Element {
  const { updateStation, stationError } = useContext(StationContext) as Context
  const { t, i18n } = useTranslation(['sensors', 'units'])
    return (<>
    {direction ? 
    <Popup offset={[0, 0]} maxWidth={276} autoPanPadding={[100, 100]} closeButton={false} className={styles.wrapper}>
      <Back marker={marker} />
      <Close marker={marker} parent="popup" />
      <h3 className={styles.placename}>{station.names[(i18n.language as keyof Station['names'])]}</h3>
      <ul className={styles.list}>
        <button type="button" className={stationError ? styles.warning : undefined} onClick={() => {
          updateStation(station)
        }}>
          {stationError ? (i18n.language === "fi" ? "Ei historia dataa" : "No history data") : (i18n.language === "fi" ? "Avaa Historia Data" : "Open History Data")}
        </button>
        {station.sensors?.map((sensor) => {
          // Digitraffic lists all its relative units as '***', I assume for compatibility?
          const unit = sensor.unit === "***" ? "%" : sensor.unit
          const sensors = direction === 1 ? sensors1 : sensors2
          const sensorName = sensor.name
          if (!(sensors.has(sensorName))) return null
          return <li className={styles.li} key={sensorName}>{sensor.value || "-"} {t(unit, { ns: "units" })} {t(sensorName, { ns: "sensors" })}</li>
        })}
      </ul>
    </Popup> : <p style={{display:"none"}} />}
    </>)
}
