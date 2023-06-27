import { useMap } from "react-leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { LayerGroup, Polygon, Marker, MarkerCluster } from 'leaflet'

const selectedLayer = new LayerGroup()

function Geoman() {
  const map = useMap();
  map.pm.addControls({
    drawMarker: false,
    rotateMode: false,
    customControls: false,
    drawText: false,
    drawCircleMarker: false,
    drawPolyline: false,
    cutPolygon: false,
  });

  map.on("pm:create", e => {
    const shape = (e.layer as Polygon).getBounds();
  
    const markers: Marker[] = [];
    selectedLayer.eachLayer(l => {
      if (l instanceof Marker) markers.push(l);
      else if ('getAllChildMarkers' in l) markers.push(...(l as MarkerCluster).getAllChildMarkers());
    });
  
    markers.forEach(marker => {
      if (!shape.contains(marker.getLatLng())) selectedLayer.removeLayer(marker);
    });
  
    const newMarkers: Marker[] = [];
    map.eachLayer(l => {
      if (l instanceof Marker && l.getElement()?.tagName === "IMG") newMarkers.push(l);
      else if ('getAllChildMarkers' in l) newMarkers.push(...(l as MarkerCluster).getAllChildMarkers());
    });
  
    newMarkers.forEach(marker => {
      if (shape.contains(marker.getLatLng())) marker.addTo(selectedLayer);
    });
  
    document.querySelectorAll<HTMLInputElement>('.leaflet-control-layers-selector:checked').forEach(el => {
      el.click();
      el.checked = false;
      el.dataset.lastActive = 'true';
      el.disabled = true;
    });
  
    if (!map.hasLayer(selectedLayer)) map.addLayer(selectedLayer);
    map.fitBounds(shape);
  });
  

  map.on("pm:remove", () => {
    document.querySelectorAll<HTMLInputElement>('.leaflet-control-layers-selector[data-last-active="true"]').forEach(el => {
      el.disabled = false
      el.click()
      el.dataset.lastActive = 'false'
      console.log(el);
    })
    selectedLayer.getLayers().forEach(l => selectedLayer.removeLayer(l))
  })
  
  return null;
}


export default Geoman;
