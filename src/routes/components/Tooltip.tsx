import { Station } from "../../interfaces/Interfaces.ts";
import carIcon from "../../assets/tooltipIcons/car-side-solid.svg";
import compassIcon from "../../assets/tooltipIcons/compass-solid.svg"; // placeholder icon
import styles from "./css/tooltip.module.css";
import DirectionPopup from "./Popup";
import { useEffect, useState } from "react";
import { Marker } from "leaflet";
import { Tooltip, useMap } from "react-leaflet";
import { useTranslation } from "react-i18next";
import redis from "../scripts/fetchRedis";
import Close from "./Close.tsx";

declare global {
  interface String {
    toProperCase(this: string): string;
  }
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

export default function StationTooltip({
  station,
  marker,
  empty
}: {
  station: Station;
  marker: Marker;
  empty: boolean;
}): JSX.Element {
  const [direction, setDirection] = useState<number | null>(null);
  const [newStation, setStation] = useState<Station | undefined>(undefined);
  const { t, i18n } = useTranslation(["tooltip", "roadworks"]);
  const map = useMap();
  let fadeTimeout: ReturnType<typeof setTimeout>;

  const delayFade = () => {
    fadeTimeout = setTimeout(() => {
      marker.closeTooltip();
    }, 1000);
  };

  useEffect(() => {
    const fetchStationData = async () => {
      const newStation = station;
      if (!empty) {
        const sensors = await redis.fetchSensorsByStationId(station.id);
        if (sensors && sensors.length == 0) return;
        newStation.sensors = sensors;
        newStation.roadworks = station.roadworks;
      }
      setStation(newStation);
    };

    fetchStationData();
  }, [station, empty]);

  if (newStation === undefined) return <p>Loading</p>;
  else
    return (<>
      <Tooltip
        className={styles.tooltip}
        permanent
        interactive
        eventHandlers={(() => ({
          mouseout: () => {
            delayFade();
            map.scrollWheelZoom.enable()
          },
          mouseover: () => {
            clearTimeout(fadeTimeout);
            map.scrollWheelZoom.disable()
          },
        }))()}
      >
        <Close marker={marker} parent="tooltip"/>
        <h1 className={styles["place-name"]}>
          {newStation.names[i18n.language as keyof Station["names"]]}
        </h1>
        <div className={styles["grid-container"]}>
          <div className={styles["grid-column"]} onClick={() => setDirection(1)}>
            <div
              className={`${styles["grid-item"]} ${styles["grid-top-left"]}`}
            >
              <img
                src={compassIcon}
                alt="Car icon"
                className={`${styles["tooltip-icon"]}`}
              />
              <div className={styles["tooltip-div"]}>
                {t("direction")} 
                <br />
                {newStation.direction1Municipality || "-"}
              </div>
            </div>
            <div
              className={`${styles["grid-item"]} ${styles["grid-bottom-left"]}`}
            >
              <img
                src={carIcon}
                alt="Car icon"
                className={styles["tooltip-icon-car"]}
              />
              <div
                className={styles["tooltip-div"]}
              >
                {newStation.sensors?.find((e) => e.id == 5116)?.value || "-"} {t("amount")}
                <br />
                {newStation.sensors?.find((e) => e.id == 5122)?.value || "-"} {t("speed")}
              </div>
            </div>
          </div>
          <div className={styles["grid-column"]} onClick={() => setDirection(2)}>
            <div
              className={`${styles["grid-item"]} ${styles["grid-top-right"]}`}
            >
              <img
                src={compassIcon}
                alt="Car icon"
                className={styles["tooltip-icon"]}
              />
              <div className={styles["tooltip-div"]}>
                {t("direction")}
                <br />
                {newStation.direction2Municipality || "-"}
              </div>
            </div>
            <div
              className={`${styles["grid-item"]} ${styles["grid-bottom-right"]}`}
            >
              <img
                src={carIcon}
                alt="Car icon"
                className={styles["tooltip-icon-car"]}
              />
              <div
                className={styles["tooltip-div"]}
              >
                {newStation.sensors?.find((e) => e.id == 5119)?.value || "-"} {t("amount")}
                <br />
                {newStation.sensors?.find((e) => e.id == 5125)?.value || "-"} {t("speed")}
              </div>
            </div>
          </div>
        </div>

        {newStation.roadworks && newStation.roadworks.length !== 0 && (
          <div className={styles["roadwork-div"]}>
            <h3>{t("title", {ns:"roadworks"})}: </h3>
            {station.roadworks?.map((roadwork) => (
              <ul key={roadwork.id}>
                <p style={{marginTop:0,marginBottom:'1.33em'}}>
                  {new Date(roadwork.startTime).toLocaleDateString('fi-FI')} - {new Date(roadwork.endTime).toLocaleDateString('fi-FI')}
                </p>
                <h4 style={{marginBottom:0}}>{t("worktypes",{ns:"roadworks"})}:</h4>
                {roadwork.workTypes.map((workType, index) => (
                  <li key={index}>
                    {(i18n.language === "fi") ? (workType.description !== "" ? workType.description : "Muu") : workType.type.replaceAll("_"," ").toProperCase()}
                  </li>
                ))}
                <h4 style={{marginBottom:0}}>{t("restrictions",{ns:"roadworks"})}</h4>
                {roadwork.restrictions.map((restriction, index) => (
                  <li key={index}>
                    {(i18n.language === "fi") ? restriction.name : restriction.type.replaceAll("_"," ").toProperCase()}
                    {restriction.quantity && restriction.unit ? " (" + restriction.quantity + " " + restriction.unit+")" : null}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </Tooltip>

      <DirectionPopup station={newStation} direction={direction} marker={marker}/>
      </>
    );
}
