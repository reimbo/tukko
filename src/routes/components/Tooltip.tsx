import { Station } from '../../interfaces/Interfaces.ts';
import carIcon from "../../assets/tooltipIcons/car-side-solid.svg";
import compassIcon from "../../assets/tooltipIcons/compass-solid.svg"; // placeholder icon
import styles from "./css/tooltip.module.css"
import DirectionPopup from "./Popup";
import { useState } from "react";
import { Marker } from "leaflet";
import { Tooltip } from "react-leaflet"
import { useTranslation } from 'react-i18next';

export default function StationTooltip({station, marker}: {station: Station, marker: Marker}): JSX.Element {
  const [direction, setDirection] = useState(1)
  const { t, i18n } = useTranslation('tooltip')

  if (station === undefined) return <p>Loading</p>
  else return (
    <Tooltip className={styles.tooltip} permanent interactive
      eventHandlers = {
        (() => ({
          mouseout: () => {
            marker.closeTooltip()
          }
      }))()
      }
    >
      <h1 className={styles["place-name"]}>{station.names[(i18n.language as keyof Station['names'])]}</h1>
      <div  className={styles['grid-container']}>
        <div onClick={() => setDirection(1)} className={`${styles["grid-item"]} ${styles["grid-top-left"]}`}>
          <img src={compassIcon} alt="Car icon" className={`${styles["tooltip-icon"]}`}/>
          <div className={styles['tooltip-div']}>{t('direction')}<br/>{station.direction1Municipality}</div>
        </div>
        <div onClick={() => setDirection(2)} className={`${styles["grid-item"]} ${styles["grid-top-right"]}`}>
          <img src={compassIcon} alt="Car icon" className={styles["tooltip-icon"]} />
          <div className={styles['tooltip-div']}>{t('direction')}<br/>{station.direction2Municipality}</div>
        </div>
      </div>
      <div className={styles['grid-container']}>
        <div onClick={() => setDirection(1)} className={`${styles["grid-item"]} ${styles["grid-bottom-left"]}`}>
          <img src={carIcon} alt="Car icon" className={styles["tooltip-icon-car"]} />
          <div className={`${styles["tooltip-div"]} ${styles["tooltip-div-car"]}`}>{station.sensors.find(e => e.id == 5116)?.value}<br/>{t('unit')}</div>
        </div>
        <div onClick={() => setDirection(2)} className={`${styles["grid-item"]} ${styles["grid-bottom-right"]}`}>
          <img src={carIcon} alt="Car icon" className={styles["tooltip-icon-car"]} />
          <div className={`${styles["tooltip-div"]} ${styles["tooltip-div-car"]}`}>{station.sensors.find(e => e.id == 5119)?.value}<br/>{t('unit')}</div>
        </div>
      </div>
      <DirectionPopup station={station} direction={direction}/>
    </Tooltip>
  )
}
