import { Marker } from "leaflet";
import { useState, useContext } from "react";
import { StationContext, Context } from "../../context/StationContext";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Close({marker, parent}:{marker?: Marker, parent: "tooltip" | "popup" | "dashboard"}): JSX.Element {
  const [hover, setHover] = useState<boolean>(false)
  const { updateStation, stationError, updateError } = useContext(StationContext) as Context
  
  const style = {
    close: {
      display: 'flex',
      position: parent === 'tooltip' ? 'sticky' : 'absolute',
      margin: parent === 'tooltip' ? '-6px 0 0 -6px' : '',
      top: parent === 'tooltip' ? '-6px' : '0',
      right: parent === 'tooltip' ? '' : '0',
      zIndex: '1',
      color: 'white',
      backgroundColor: hover ? 'rgb(200, 0, 0)' : 'black',
      padding: '3px',
      cursor: 'pointer',
      width: '16px',
      height: '16px',
      border: '1px solid black',
      borderRadius: parent === 'tooltip' ? '3px 0 0 0' : '0 3px 0 0',
      svg: {
        display: 'flex',
        width: '100%',
        aspectRatio: '1/1'
      }
    }
  } as const


  return <span style={style.close} 
    onMouseEnter={() => setHover(true)} 
    onMouseLeave={() => setHover(false)} 
    onClick={() => {
      (parent === "tooltip" && marker ? marker.closeTooltip() :
      parent === "popup" && marker ? marker.closePopup() :
      updateStation(null));
      if (stationError) updateError(false)
    }}
  >
    <FontAwesomeIcon style={style.close.svg} icon={faX} />
  </span>
}
