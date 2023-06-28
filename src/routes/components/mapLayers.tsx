import { LayersControl, Marker, LayerGroup, Popup, Tooltip} from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import styles from "./css/mapLayers.module.css"
import "./css/Tooltip.css"
import carIcon from "../../assets/tooltipIcons/car-side-solid.svg";
import compassIcon from "../../assets/tooltipIcons/compass-solid.svg"; // placeholder icon

// Components
import { createMarker } from "./Icons";
import { Station } from "../../interfaces/sensorInterfaces";


export function MapLayers({ data }: { data: Station[] | null }): JSX.Element {
  const MarkerList = data?.map(
    (station) => {
      console.log(station)
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
          <Popup offset={[0,0]} maxWidth={500} autoPanPadding={[100,100]} closeButton={false} className={styles.wrapper}>
            <ul className={"marker-popup"}>
            <li>Station name: {station.name}</li>
            <li>Station id: {station.id}</li>
            {station.sensorValues.map((sensor) => {
              const unit = sensor.unit === "***" ? "%" : sensor.unit
              return <li key={sensor.name}>{sensor.name}: {sensor.value} {unit}</li>
            })}
            </ul>
          </Popup>
          <Tooltip>
            <h1 className="place-name">{station.name}</h1>
                  <div className="grid-container">
                      <div className="grid-item grid-top-left">
                          <img src={carIcon} alt="Car icon" className="tooltip-icon-left tooltip-icon-reverse" />
                          <div className="tooltop-div tooltip-div-car">XXXX <br/> cars/h</div>
                      </div>
                      <div className="grid-item grid-top-right">
                          <img src={compassIcon} alt="Car icon" className="tooltip-icon-right tooltip-icon-reverse" />
                          <div className="tooltop-div">Towards <br/> direction1</div>
                      </div>
                      <div className="grid-item grid-bottom-left">
                          <img src={carIcon} alt="Car icon" className="tooltip-icon-left" />
                          <div className="tooltop-div tooltip-div-car">XXX <br/> cars/h</div>
                      </div>
                      <div className="grid-item grid-bottom-right">
                          <img src={compassIcon} alt="Car icon" className="tooltip-icon-right" />
                          <div className="tooltop-div">Towards <br/> direction2</div>
                      </div>
                  </div>
          </Tooltip>
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
