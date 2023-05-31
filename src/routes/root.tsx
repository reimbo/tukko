import { useMap, MapContainer, TileLayer, Pane, Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import './leaflet.css'
import './root.css'
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import { Fragment, useState } from "react";
import coordsData from "./data/coords.json"

function MapPlaceholder(): JSX.Element {
  return (
    <p>
      Traffic Visualizer
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

function Geoman() {
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




export default function root(): JSX.Element {



  return(

    <Fragment>

    <p className="overlay-title">Traffic Visualizer</p>

    {/* <div className="overlay-filtering"> 
      <p className="overlay-filtering-title">Data filtering</p>
      <input type="radio" id="showMarkers" name="markers" checked />
      <label>Show Markers</label><br/>
      <input type="radio" id="hideMarkers" name="markers" />
      <label >Hide Markers</label><br/>   
    </div> */}

    <MapContainer
      center={[62.2414436340332, 25.758846282958984]}
      maxBounds={[[70.182772,18.506675],[59.712756,32.559953]]}
      maxBoundsViscosity={0.9}
      zoomDelta={1}
      zoom={6}
      placeholder={<MapPlaceholder />}>


      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Geoman />


      <LayersControl position="topright" collapsed={false} >
        <LayersControl.Overlay name="Show markers">
          <LayerGroup>
            {coordsData.map(coords => (
              <Marker 
              key = {coords.properties.id}
              position={[coords.geometry.coordinates[1], coords.geometry.coordinates[0]]}>
                <Popup>
                  {coords.properties.tasks}
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>


    </MapContainer>

    </Fragment>

  )
}
