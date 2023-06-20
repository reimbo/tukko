import { LayersControl, Marker, LayerGroup, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createMarker } from "./Icons";

//Defines the layers drawn on the map
export function MapLayers({ combinedData }: { combinedData: any}) {
  return (
    <LayersControl position="topright" collapsed={false}>
      <LayersControl.Overlay name="Show KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1" checked>
        <MarkerClusterGroup>
          <LayerGroup>
            {combinedData.stationList.map((stationId: string, index: number) => (
              <Marker
                pmIgnore
                key={stationId}
                position={[
                  combinedData.stationLocation[index].latitude,
                  combinedData.stationLocation[index].longitude
                ]}
                eventHandlers={{
                  mouseover: (event) => event.target.openPopup()
                }}
                //Gets icons from Icons.ts
                icon={createMarker('red')}
              >
                <Popup>
                  Station name: {combinedData.stationName[index]} <br />
                  Station id: {stationId} <br />
                  Sensor id: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_id} <br />
                  Name: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_name} <br />
                  Value: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_value} <br />
                  Unit: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_unit} <br />
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </MarkerClusterGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Show GREEN" checked>
        <MarkerClusterGroup>
          <LayerGroup>
            {combinedData.stationList.map((stationId: string, index: number) => (
              <Marker
                pmIgnore
                key={stationId}
                position={[
                  combinedData.stationLocation[index].latitude,
                  combinedData.stationLocation[index].longitude
                ]}
                eventHandlers={{
                  mouseover: (event) => event.target.openPopup()
                }}

                //Gets icons from Icons.ts
                icon={createMarker('green')}
              >
                <Popup>
                  Station name: {combinedData.stationName[index]} <br />
                  Station id: {stationId} <br />
                  Sensor id: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_id} <br />
                  Name: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_name} <br />
                  Value: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_value} <br />
                  Unit: {combinedData.KESKINOPEUS_5MIN_LIUKUVA_SUUNTA1[index].sensor_unit} <br />
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </MarkerClusterGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
}
