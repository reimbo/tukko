import { useMap} from "react-leaflet";

export function Geoman() {
    const map = useMap();
    map.pm.addControls({
      drawMarker: false,
      rotateMode: false,
      customControls: false,
      drawText: false,
      drawCircleMarker: false,
      drawPolyline: false,
      cutPolygon: false
    });
    return null;
  }