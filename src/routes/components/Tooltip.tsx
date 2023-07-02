import { Tooltip } from "react-leaflet";
import { Station } from "../../interfaces/sensorInterfaces";
import carIcon from "../../assets/tooltipIcons/car-side-solid.svg";
import compassIcon from "../../assets/tooltipIcons/compass-solid.svg"; // placeholder icon
import "./css/Tooltip.css";
import DirectionPopup from "./Popup";
import { Tooltip as TT } from 'leaflet';
import React, { useState } from 'react';

export default function StationTooltip({station}: {station: Station}): JSX.Element {
  const [direction, setDirection] = useState(1)
  return (
    <Tooltip>
      <h1 className="place-name">{station.name}</h1>
      <div onClick={() => setDirection(1)} className='grid-container'>
        <div className="grid-item grid-top-left">
          <img src={carIcon} alt="Car icon" className="tooltip-icon-left tooltip-icon-reverse" />
          <div className="tooltip-div tooltip-div-car">XXXX <br/> cars/h</div>
        </div>
        <div className="grid-item grid-top-right">
          <img src={compassIcon} alt="Car icon" className="tooltip-icon-right tooltip-icon-reverse" />
          <div className="tooltip-div">Towards <br/> direction1</div>
        </div>
      </div>
      <div onClick={() => setDirection(2)} className='grid-container'>
        <div className="grid-item grid-bottom-left">
          <img src={carIcon} alt="Car icon" className="tooltip-icon-left" />
          <div className="tooltip-div tooltip-div-car">XXX <br/> cars/h</div>
        </div>
        <div className="grid-item grid-bottom-right">
          <img src={compassIcon} alt="Car icon" className="tooltip-icon-right" />
          <div className="tooltip-div">Towards <br/> direction2</div>
        </div>
      </div>
      <DirectionPopup station={station} direction={direction}/>
    </Tooltip>
  )}
