import { Marker } from "leaflet";
import { useState, useContext } from "react";
import { StationContext, Context } from "../../context/StationContext";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Back({marker}:{marker?: Marker}): JSX.Element {
  const [hover, setHover] = useState<boolean>(false)
  const { stationError, updateError } = useContext(StationContext) as Context
  
  const style = {
    close: {
      display: 'flex',
      position: 'absolute',
      margin: '',
      top: '0',
      left: '0',
      zIndex: '1',
      color: 'white',
      backgroundColor: hover ? 'rgb(100, 100, 100)' : 'black',
      padding: '3px',
      cursor: 'pointer',
      width: '16px',
      height: '16px',
      border: '1px solid black',
      borderRadius: '3px 0 0 0',
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
      setHover(false);
      (marker && marker.openTooltip() && marker.closePopup() && marker.getTooltip()?.setOpacity(0.9));
      if (stationError) updateError(false);
    }}
  >
    <FontAwesomeIcon style={style.close.svg} icon={faChevronLeft} />
  </span>
}
