import { Tooltip } from "react-leaflet";
import { Station } from "../../interfaces/sensorInterfaces";
import carIcon from "../../assets/tooltipIcons/car-side-solid.svg";
import compassIcon from "../../assets/tooltipIcons/compass-solid.svg"; // placeholder icon
import "./css/Tooltip.css";

export default function StationTooltip({station}: {station: Station}): JSX.Element {
  return (
    <Tooltip>
      <h1 className="place-name">{station.name}</h1>
            <a>Open dir1</a>
            <div className="grid-container">
                <div className="grid-item grid-top-left">
                    <img src={carIcon} alt="Car icon" className="tooltip-icon-left tooltip-icon-reverse" />
                    <div className="tooltip-div tooltip-div-car">XXXX <br/> cars/h</div>
                </div>
                <div className="grid-item grid-top-right">
                    <img src={compassIcon} alt="Car icon" className="tooltip-icon-right tooltip-icon-reverse" />
                    <div className="tooltip-div">Towards <br/> direction1</div>
                </div>
                <div className="grid-item grid-bottom-left">
                    <img src={carIcon} alt="Car icon" className="tooltip-icon-left" />
                    <div className="tooltip-div tooltip-div-car">XXX <br/> cars/h</div>
                </div>
                <div className="grid-item grid-bottom-right">
                    <img src={compassIcon} alt="Car icon" className="tooltip-icon-right" />
                    <div className="tooltip-div">Towards <br/> direction2</div>
                </div>
            </div>
            <a>Open dir2</a>
    </Tooltip>
  )}
