import { Station } from "../../interfaces/Interfaces.ts";
import carIcon from "../../assets/tooltipIcons/car-side-solid.svg";
import compassIcon from "../../assets/tooltipIcons/compass-solid.svg"; // placeholder icon
import styles from "./css/tooltip.module.css";
import DirectionPopup from "./Popup";
import { useEffect, useState } from "react";
import { Marker } from "leaflet";
import { Tooltip } from "react-leaflet";
import { useTranslation } from "react-i18next";
import redis from "../scripts/fetchRedis";
import { format } from "date-fns";

export default function StationTooltip({
  station,
  marker,
}: {
  station: Station;
  marker: Marker;
}): JSX.Element {
  const [direction, setDirection] = useState(1);
  const [newStation, setStation] = useState<Station | undefined>(undefined);
  const { t, i18n } = useTranslation("tooltip");
  let fadeTimeout: ReturnType<typeof setTimeout>;

  const delayFade = () => {
    fadeTimeout = setTimeout(() => {
      marker.closeTooltip();
    }, 1000);
  };

  useEffect(() => {
    const fetchStationData = async () => {
      const newStation = station;
      const sensors = await redis.fetchSensorsByStationId(station.id);
      if (sensors && sensors.length == 0) return;
      newStation.sensors = sensors;
      newStation.roadworks = station.roadworks;
      setStation(newStation);
    };

    fetchStationData();
  }, [station]);

  if (newStation === undefined) return <p>Loading</p>;
  else
    return (
      <Tooltip
        className={styles.tooltip}
        permanent
        interactive
        eventHandlers={(() => ({
          mouseout: () => {
            delayFade();
          },
          mouseover: () => {
            clearTimeout(fadeTimeout);
          },
        }))()}
      >
        <h1 className={styles["place-name"]}>
          {newStation.names[i18n.language as keyof Station["names"]]}
        </h1>
        <div className={styles["grid-container"]}>
          <div className={styles["grid-column"]}>
            <div
              onClick={() => setDirection(1)}
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
                {newStation.direction1Municipality}
              </div>
            </div>
            <div
              onClick={() => setDirection(1)}
              className={`${styles["grid-item"]} ${styles["grid-bottom-left"]}`}
            >
              <img
                src={carIcon}
                alt="Car icon"
                className={styles["tooltip-icon-car"]}
              />
              <div
                className={`${styles["tooltip-div"]} ${styles["tooltip-div-car"]}`}
              >
                {newStation.sensors?.find((e) => e.id == 5116)?.value}
                <br />
                {t("unit")}
              </div>
            </div>
          </div>
          <div className={styles["grid-column"]}>
            <div
              onClick={() => setDirection(2)}
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
                {newStation.direction2Municipality}
              </div>
            </div>
            <div
              onClick={() => setDirection(2)}
              className={`${styles["grid-item"]} ${styles["grid-bottom-right"]}`}
            >
              <img
                src={carIcon}
                alt="Car icon"
                className={styles["tooltip-icon-car"]}
              />
              <div
                className={`${styles["tooltip-div"]} ${styles["tooltip-div-car"]}`}
              >
                {newStation.sensors?.find((e) => e.id == 5119)?.value}
                <br />
                {t("unit")}
              </div>
            </div>
          </div>
        </div>
        <DirectionPopup station={newStation} direction={direction} />
        {newStation.roadworks && newStation.roadworks.length !== 0 && (
          <div>
            <h3>Road Works</h3>
            {station.roadworks?.map((roadwork) => (
              <ul key={roadwork.id}>
                <h4>ID: {roadwork.id}</h4>
                Start Date: {format(new Date(roadwork.startTime), "yyyy-MM-dd")}
                {"; "}
                End Date: {format(new Date(roadwork.endTime), "yyyy-MM-dd")}
                <h4>Work Types:</h4>
                {roadwork.workTypes.map((workType) => (
                  <li>
                    {workType.type}: {workType.description}
                  </li>
                ))}
                <h4>Restrictions:</h4>
                {roadwork.restrictions.map((restriction) => (
                  <li>
                    {restriction.type}: {restriction.name}
                    {" ("}
                    {restriction.quantity} {restriction.unit}
                    {")"}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </Tooltip>
    );
}
