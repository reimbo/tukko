import { Station } from "../../interfaces/sensorInterfaces";
import carIcon from "../../assets/tooltipIcons/car-side-solid.svg";
import compassIcon from "../../assets/tooltipIcons/compass-solid.svg"; // placeholder icon
import styles from "./css/tooltip.module.css"
import DirectionPopup from "./Popup";
import { useState } from "react";
import { Marker, Tooltip as T } from "leaflet";
import { Tooltip } from "react-leaflet"

export default function StationTooltip({station, marker}: {station: Station, marker: Marker}): JSX.Element {
  const [direction, setDirection] = useState(1)
  return (
    <Tooltip className={styles.tooltip} permanent interactive
      eventHandlers = {
        (() => ({
          mouseout: () => {
            marker.closeTooltip()
          }
      }))()
      }
    >
      <h1 className={styles["place-name"]}>{station.name}</h1>
      <div onClick={() => setDirection(1)} className={styles['grid-container']}>
        <div className={`${styles["grid-item"]} ${styles["grid-top-left"]}`}>
          <img src={carIcon} alt="Car icon" className={`${styles["tooltip-icon-left"]} ${styles["tooltip-icon-reverse"]}`}/>
          <div className={`${styles["tooltip-div"]} ${styles["tooltip-div-car"]}`}>XXXX <br/> cars/h</div>
        </div>
        <div className={`${styles["grid-item"]} ${styles["grid-top-right"]}`}>
          <img src={compassIcon} alt="Car icon" className={`${styles["tooltip-icon-right"]} ${styles["tooltip-icon-reverse"]}`}/>
          <div className={styles['tooltip-div']}>Towards <br/> direction1</div>
        </div>
      </div>
      <div onClick={() => setDirection(2)} className={styles['grid-container']}>
        <div className={`${styles["grid-item"]} ${styles["grid-bottom-left"]}`}>
          <img src={carIcon} alt="Car icon" className={styles["tooltip-icon-left"]} />
          <div className={`${styles["tooltip-div"]} ${styles["tooltip-div-car"]}`}>XXX <br/> cars/h</div>
        </div>
        <div className={`${styles["grid-item"]} ${styles["grid-bottom-right"]}`}>
          <img src={compassIcon} alt="Car icon" className={styles["tooltip-icon-right"]} />
          <div className={styles['tooltip-div']}>Towards <br/> direction2</div>
        </div>
      </div>
      <DirectionPopup station={station} direction={direction}/>
    </Tooltip>
  )
}
