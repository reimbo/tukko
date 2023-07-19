import { useMap } from "react-leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import { LatLngExpression, LayerGroup, Polygon, Circle, Marker, LatLng, MarkerCluster } from 'leaflet';

class Triangle extends Polygon {
  constructor(center: LatLngExpression, sideLength: number) {
    const vertices = getTriangleVertices(center, sideLength);
    super(vertices);
  }
}

function getTriangleVertices(center: LatLngExpression, sideLength: number) {
  const radius = (Math.sqrt(3) / 6) * sideLength;
  const angle30 = (30 * Math.PI) / 180;
  const angle150 = (150 * Math.PI) / 180;

  let centerLatLng: LatLng;
  if (Array.isArray(center)) {
    centerLatLng = new LatLng(center[0], center[1]);
  } else if ('lat' in center && 'lng' in center) {
    centerLatLng = new LatLng(center.lat, center.lng);
  } else {
    throw new Error('Invalid LatLngExpression');
  }

  const vertex1 = centerLatLng;
  const vertex2 = new LatLng(
    centerLatLng.lat + radius * Math.cos(angle30),
    centerLatLng.lng + radius * Math.sin(angle30)
  );
  const vertex3 = new LatLng(
    centerLatLng.lat + radius * Math.cos(angle150),
    centerLatLng.lng + radius * Math.sin(angle150)
  );

  return [vertex1, vertex2, vertex3];
}

const selectedLayer = new LayerGroup();

function isMarkerInsideTriangle(marker: Marker, triangle: Triangle | Polygon): boolean {
  const triangleVertices = triangle.getLatLngs()[0] as LatLng[];
  const markerLatLng = marker.getLatLng();
  let isInside = false;

  for (let i = 0, j = triangleVertices.length - 1; i < triangleVertices.length; j = i++) {
    const vertex1 = triangleVertices[i];
    const vertex2 = triangleVertices[j];

    if (
      (vertex1.lat > markerLatLng.lat) !== (vertex2.lat > markerLatLng.lat) &&
      markerLatLng.lng <
        ((vertex2.lng - vertex1.lng) * (markerLatLng.lat - vertex1.lat)) /
          (vertex2.lat - vertex1.lat) +
          vertex1.lng
    ) {
      isInside = !isInside;
    }
  }

  return isInside;
}

function isMarkerInsideCircle(marker: Marker, circle: Circle): boolean {
  const circleCenter = circle.getLatLng();
  const markerLatLng = marker.getLatLng();
  const radius = circle.getRadius();

  const distance = circleCenter.distanceTo(markerLatLng);
  return distance <= radius;
}

function isMarkerInsidePolygon(marker: Marker, polygon: Polygon): boolean {
  const polygonLatLngs = polygon.getLatLngs()[0] as LatLng[];
  const markerLatLng = marker.getLatLng();

  let isInside = false;
  let j = polygonLatLngs.length - 1;

  for (let i = 0; i < polygonLatLngs.length; i++) {
    const vertex1 = polygonLatLngs[i];
    const vertex2 = polygonLatLngs[j];

    if (
      (vertex1.lng < markerLatLng.lng && vertex2.lng >= markerLatLng.lng ||
      vertex2.lng < markerLatLng.lng && vertex1.lng >= markerLatLng.lng) &&
      (vertex1.lat <= markerLatLng.lat || vertex2.lat <= markerLatLng.lat)
    ) {
      if (
        vertex1.lat + (markerLatLng.lng - vertex1.lng) / (vertex2.lng - vertex1.lng) * (vertex2.lat - vertex1.lat) < markerLatLng.lat
      ) {
        isInside = !isInside;
      }
    }

    j = i;
  }
  return isInside;
}

function isMarkerInsideShape(marker: Marker, shape: Triangle | Circle | Polygon): boolean {
  if (shape instanceof Triangle) {
    return isMarkerInsideTriangle(marker, shape);
  } else if (shape instanceof Circle) {
    return isMarkerInsideCircle(marker, shape);
  } else if (shape instanceof Polygon) {
    return isMarkerInsidePolygon(marker, shape);
  } else {
    // Handle other shape types if needed
    return false;
  }
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
    cutPolygon: false,
    // Until we can find a better way to use edit and drag modes, 
    // disable them
    dragMode: false,
    editMode: false,
  });

  map.on("pm:create", e => {
    let shape: Triangle | Circle | Polygon | null = null;
    if (e.layer instanceof Polygon) {
      shape = e.layer;
    } else if (e.layer instanceof Triangle) {
      shape = e.layer;
    } else if (e.layer instanceof Circle) {
      shape = e.layer;
    }

    if (shape === null) {
      throw new Error("Invalid shape");
    }

    const bounds = shape.getBounds();
    map.fitBounds(bounds);

    const markers: Marker[] = [];
    map.eachLayer(l => {
      if (!(l instanceof Marker)) return
      if (l.getElement()?.classList.contains("customMarker")) {
        markers.push(l);
      } else if ('getAllChildMarkers' in l) {
        markers.push(...(l as MarkerCluster).getAllChildMarkers());
      }
    });

    markers.forEach(marker => {
      const isInside = isMarkerInsideShape(marker, shape as Triangle | Polygon | Circle);

      if (isInside) {
        marker.addTo(selectedLayer)
      }
    });

    document.querySelectorAll<HTMLInputElement>(
      '.leaflet-control-layers-selector:checked'
    ).forEach(el => {
      el.click();
      el.checked = false;
      el.dataset.lastActive = 'true';
      el.disabled = true;
    });

    if (!map.hasLayer(selectedLayer)) {
      selectedLayer.addTo(map);
    }
  });

  map.on("pm:remove", () => {
    selectedLayer.getLayers().forEach(l => selectedLayer.removeLayer(l));
    selectedLayer.removeFrom(map)
    document.querySelectorAll<HTMLInputElement>(
      '.leaflet-control-layers-selector[data-last-active="true"]'
    ).forEach(el => {
      el.disabled = false;
      el.click();
      el.dataset.lastActive = 'false';
    });
  });

  map.on("pm:globaldrawmodetoggled", (e) => {
    if (e.enabled && map.pm.getGeomanDrawLayers().length > 0) map.pm.getGeomanDrawLayers()[0].remove() && 
      map.fire("pm:remove")
  })

  map.on("pm:globalremovalmodetoggled", (e) => {
    if (e.enabled)
      map.pm.disableGlobalRemovalMode()
    if (map.pm.getGeomanDrawLayers().length > 0) 
      map.pm.getGeomanDrawLayers()[0].remove() && map.fire("pm:remove")
  })

  return null;
}

export default Geoman;
