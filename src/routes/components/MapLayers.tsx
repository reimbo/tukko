import { LayersControl, LayerGroup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MarkerList } from "./MarkerList";

export function MapLayers(): JSX.Element | null {
  return (
    <LayersControl>
      <LayersControl.Overlay name="Show station data" checked>
        <LayerGroup>
          <MarkerClusterGroup pmIgnore>
            <MarkerList />
          </MarkerClusterGroup>
        </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
}
