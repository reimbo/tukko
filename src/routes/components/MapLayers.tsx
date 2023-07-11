import {  LayerGroup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MarkerList } from "./MarkerList";

export function MapLayers(): JSX.Element | null {
  return (
        <LayerGroup>
          <MarkerClusterGroup pmIgnore>
            <MarkerList />
          </MarkerClusterGroup>
        </LayerGroup>
  );
}