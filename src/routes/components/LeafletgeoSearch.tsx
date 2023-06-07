// CURRENTLY NOT WORKING!!!


{/* import { useMap} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect} from 'react';
import "leaflet-geosearch/dist/geosearch.css";

function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider({
        params: {
          'accept-language': 'EN,FI', 
          countrycodes: 'FI', 
        },
      });
  
      const searchControl = new GeoSearchControl({
        provider,
      });
  
      map.addControl(searchControl);
  
      return () => {map.removeControl(searchControl)};
    }, []);
  
    return null;
}

export default LeafletgeoSearch; */}