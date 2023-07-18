import { Marker } from "leaflet";
import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Close({marker, parent}:{marker: Marker, parent: "tooltip" | "popup"}): JSX.Element {
  const [hover, setHover] = useState<boolean>(false)
  
  const style = {
    close: {
      position: 'absolute',
      display: 'flex',
      color: 'white',
      backgroundColor: hover ? 'rgb(200, 0, 0)' : 'black',
      top: '-1px',
      right: '-1px',
      padding: '3px',
      cursor: 'pointer',
      width: '16px',
      height: '16px',
      aspectRatio: '1 / 1',
      borderRadius: '0 3px 0 0',
      hover: {
        backgroundColor: 'rgb(200, 0, 0)'
      },
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
    onClick={() => parent === "tooltip" ? marker.closeTooltip() : marker.closePopup()}>
    <FontAwesomeIcon style={style.close.svg} icon={faX} />
  </span>
}
