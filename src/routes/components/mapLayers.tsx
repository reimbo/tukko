import { LayersControl, Marker, LayerGroup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Station } from "../../interfaces/sensorInterfaces";
import React, { useState, Suspense } from 'react';

// Components
const StationTooltip = React.lazy(() => import("./Tooltip"));
import { createMarker } from "./Icons";
import { Marker as M } from "leaflet";


export function MapLayers({ data }: { data: Station[] | null }): JSX.Element | null {
  const [showTooltip, setShowTooltip] = useState(false)
  const [selectedStation, setSelectedStation] = useState<null | number | undefined>(null)
  const [marker, setMarker] = useState<null | M>(null)

  const MarkerList = data?.map(
    (station) => {
      if (station.sensorValues.length > 0) return (
        <Marker
          eventHandlers = {
            (() => ({
              click: (e) => {
                const m = (e.target as M)
                setSelectedStation(station.id)
                setMarker(m)
                setShowTooltip(true)
                m.openTooltip()
              },
              tooltipclose: (e) => {
                const m = (e.target as M)
                if (!m.isPopupOpen()) {
                  setSelectedStation(null)
                  setMarker(null)
                  setShowTooltip(false)
                }
              },
              popupopen: (e) => {
                const m = (e.target as M)
                m.closeTooltip()
              },
              popupclose: (e) => {
                const m = (e.target as M)
                if (!m.isTooltipOpen()) {
                  setSelectedStation(null)
                  setMarker(null)
                  setShowTooltip(false)
                }
              }
            }))()
          }
          pmIgnore
          key={station.id}
          alt={station.name.replaceAll("_", " ")}
          position={[
            station.coordinates[0],
            station.coordinates[1]
          ]}
          icon={createMarker('red')}
          >
          {showTooltip && station.id === selectedStation && marker && (
            <Suspense>
              <StationTooltip station={station} marker={marker}/>
            </Suspense>
          )}
          </Marker>
      )
    }
  )

  if (data && data.length > 0) {
    return (
      <LayersControl position="topright" collapsed={false}>
        <LayersControl.Overlay name="Show station data" checked>
          <MarkerClusterGroup pmIgnore>
            <LayerGroup>
              {MarkerList}
            </LayerGroup>
          </MarkerClusterGroup>
        </LayersControl.Overlay>
      </LayersControl>
    );
  }
  else return null
}
